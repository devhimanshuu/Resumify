import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch URL: ${response.statusText}` },
        { status: response.status }
      );
    }

    const html = await response.text();

    // Basic extraction: remove scripts, styles, and html tags
    const bodyContentMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
    let bodyContent = bodyContentMatch ? bodyContentMatch[1] : html;

    bodyContent = bodyContent.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, " ");
    bodyContent = bodyContent.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, " ");
    bodyContent = bodyContent.replace(/<[^>]+>/g, " ");
    
    // Clean up whitespace
    const textContent = bodyContent.replace(/\s+/g, " ").trim();

    // Limit length to avoid token limits
    const truncatedText = textContent.slice(0, 15000);

    return NextResponse.json({ text: truncatedText });
  } catch (error: any) {
    console.error("Fetch job error:", error);
    return NextResponse.json(
      { error: "Failed to fetch job description" },
      { status: 500 }
    );
  }
}
