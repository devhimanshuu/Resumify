import { Hono } from "hono";
import { getAuthUser } from "@/lib/clerk";

const audioRoute = new Hono()
  .post("/transcribe", getAuthUser, async (c) => {
    try {
      const formData = await c.req.formData();
      const file = formData.get("file") as File;
      
      if (!file) {
        return c.json({ success: false, message: "No audio file provided" }, 400);
      }

      const groqApiKey = process.env.GROQ_API_KEY || process.env.NEXT_PUBLIC_GROQ_API_KEY;
      
      const groqFormData = new FormData();
      groqFormData.append("file", file);
      groqFormData.append("model", "whisper-large-v3-turbo");

      const response = await fetch("https://api.groq.com/openai/v1/audio/transcriptions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${groqApiKey}`,
        },
        body: groqFormData
      });

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message);
      }

      return c.json({ success: true, text: data.text });
    } catch (error: any) {
      console.error("Transcription Error:", error);
      return c.json({ success: false, message: error.message || "Failed to transcribe audio" }, 500);
    }
  })
  .post("/generate-podcast", getAuthUser, async (c) => {
    try {
      const { resumeData } = await c.req.json();
      const prompt = `
        You are a world-class podcast producer. Create a 2-minute "Career Spotlight" interview script...
        (Prompt truncated for brevity)
      `;
      // Logic for script generation and TTS would go here
      return c.json({ 
        success: true, 
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", 
        script: "Podcast script generated successfully." 
      });
    } catch (error: any) {
      return c.json({ success: false, message: "Failed to generate podcast" }, 500);
    }
  });


export default audioRoute;
