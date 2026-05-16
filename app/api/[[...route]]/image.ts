import { Hono } from "hono";
import { getAuthUser } from "@/lib/clerk";

const imageRoute = new Hono()
  .post("/edit", getAuthUser, async (c) => {
    try {
      const { image, prompt } = await c.req.json();
      
      if (!image || !prompt) {
        return c.json({ error: "Missing image or prompt" }, 400);
      }

      // Extract base64 if it has data URL prefix
      const base64Image = image.includes("base64,") 
        ? image.split("base64,")[1] 
        : image;

      let resultImage = null;
      let error = null;

      // 1. Primary: Qwen Image Edit (NVIDIA)
      try {
        const response = await fetch("https://ai.api.nvidia.com/v1/visual/qwen/qwen-image-edit", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${process.env.NVIDIA_IMAGE_KEY}`,
            "Accept": "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            image: base64Image,
            prompt: prompt,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          resultImage = `data:image/png;base64,${data.image}`;
        } else {
          error = await response.text();
          console.warn("Primary NVIDIA Qwen failed, trying fallback...", error);
        }
      } catch (e) {
        console.warn("Primary NVIDIA Qwen error:", e);
      }

      if (!resultImage) {
        return c.json({
          success: false,
          error: "AI image editing is temporarily unavailable. Please try again later.",
          providerError: error,
        }, 503);
      }

      return c.json({ 
        success: true, 
        image: resultImage,
        isFallback: false
      });
    } catch (error) {
      console.error(error);
      return c.json({ error: "Internal server error" }, 500);
    }
  });

export default imageRoute;
