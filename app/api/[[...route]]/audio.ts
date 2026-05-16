import { Hono } from "hono";
import { getAuthUser } from "@/lib/clerk";
import { AIChatSession } from "@/lib/groq-model";

const audioRoute = new Hono()
  .post("/transcribe", getAuthUser, async (c) => {
    try {
      const formData = await c.req.formData();
      const file = formData.get("file") as File;
      
      if (!file) {
        return c.json({ success: false, message: "No audio file provided" }, 400);
      }

      const groqApiKey = process.env.GROQ_API_KEY;
      if (!groqApiKey) {
        return c.json({ success: false, message: "Missing Groq API key" }, 500);
      }
      
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
        You are a world-class podcast producer. Create a concise 2-minute "Career Spotlight" interview script.
        Make it specific to the candidate's resume. Use two speakers: HOST and CANDIDATE.
        Avoid generic hype and mention concrete roles, skills, education, and achievements where available.

        RESUME DATA:
        ${JSON.stringify(resumeData)}

        Return only the script text.
      `;
      const result = await AIChatSession.sendMessage(prompt);
      const script = result.response.text();
      return c.json({ 
        success: true, 
        audioUrl: null, 
        script 
      });
    } catch (error: any) {
      return c.json({ success: false, message: "Failed to generate podcast" }, 500);
    }
  });


export default audioRoute;
