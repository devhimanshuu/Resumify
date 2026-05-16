const ALLOWED_TAGS = new Set([
  "b",
  "br",
  "em",
  "i",
  "li",
  "ol",
  "p",
  "span",
  "strong",
  "u",
  "ul",
]);

export const sanitizeResumeHtml = (html: string | null | undefined) => {
  if (!html) return "";

  return html
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "")
    .replace(/\son\w+\s*=\s*(['"]).*?\1/gi, "")
    .replace(/\s(href|src)\s*=\s*(['"])\s*javascript:[\s\S]*?\2/gi, "")
    .replace(/<\/?([a-z0-9-]+)(\s[^>]*)?>/gi, (match, tagName) => {
      return ALLOWED_TAGS.has(String(tagName).toLowerCase()) ? match : "";
    });
};
