import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const BUCKET = "promise-audio";

const ALLOWED_ORIGINS = new Set([
  "https://wordsoflife.lovable.app",
  "https://wordsoflife.dev",
  "https://www.wordsoflife.dev",
  "https://id-preview--941ac652-3c86-4167-92ae-5d2f617846da.lovable.app",
  "http://localhost:5173",
  "http://localhost:8080",
]);

function buildCorsHeaders(req: Request): Record<string, string> {
  const origin = req.headers.get("origin") ?? "";
  const allowOrigin = ALLOWED_ORIGINS.has(origin) ? origin : "https://wordsoflife.dev";
  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin",
  };
}

async function slug(text: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .slice(0, 40);
}

Deno.serve(async (req) => {
  const corsHeaders = buildCorsHeaders(req);
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405, headers: corsHeaders });
  }

  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  try {
    const body = await req.json().catch(() => null);
    const text = typeof body?.text === "string" ? body.text.trim() : "";
    const reference = typeof body?.reference === "string" ? body.reference.trim() : "";

    if (!text || text.length > 600 || reference.length > 120) {
      return json({ error: "Invalid promise text" }, 400);
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const lovableApiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!supabaseUrl || !serviceKey) return json({ error: "Storage not configured" }, 500);
    if (!lovableApiKey) return json({ error: "LOVABLE_API_KEY is not configured" }, 500);

    const supabase = createClient(supabaseUrl, serviceKey);
    const name = `${await slug(`${text}|${reference}`)}.wav`;
    const path = name;

    const signUrl = async () => {
      const { data, error } = await supabase.storage
        .from(BUCKET)
        .createSignedUrl(path, 60 * 60 * 12);
      if (error || !data?.signedUrl) throw new Error(error?.message ?? "Could not sign the audio URL");
      return data.signedUrl;
    };

    // Already generated? Serve the cached recording.
    const { data: existing } = await supabase.storage.from(BUCKET).list("", { search: name });
    if (existing?.some((f) => f.name === name)) {
      return json({ url: await signUrl(), cached: true });
    }

    const spoken = reference
      ? `Say gently, warmly and slowly: ${text} ... ${reference}`
      : `Say gently, warmly and slowly: ${text}`;

    const ttsRes = await fetch("https://ai.gateway.lovable.dev/v1/audio/speech", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${lovableApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3.1-flash-tts-preview",
        contents: [{ role: "user", parts: [{ text: spoken }] }],
        generationConfig: {
          responseModalities: ["AUDIO"],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: "Kore" } },
          },
        },
      }),
    });

    if (!ttsRes.ok) {
      const detail = await ttsRes.text().catch(() => "");
      console.error("TTS failed:", ttsRes.status, detail);
      if (ttsRes.status === 429) {
        return json({ error: "The voice is busy right now — please try again in a moment." }, 429);
      }
      if (ttsRes.status === 402 || ttsRes.status === 403) {
        return json({ error: "Audio is temporarily unavailable." }, ttsRes.status);
      }
      return json({ error: "Could not create the audio." }, 502);
    }

    const audio = new Uint8Array(await ttsRes.arrayBuffer());
    if (audio.byteLength === 0) return json({ error: "Could not create the audio." }, 502);

    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(path, audio, { contentType: "audio/wav", upsert: true });

    if (uploadError) {
      console.error("upload error:", uploadError);
      return json({ error: "Could not save the audio." }, 500);
    }

    return json({ url: publicUrl, cached: false });
  } catch (e) {
    console.error("speak-promise error:", e);
    return json({ error: e instanceof Error ? e.message : "Unknown error" }, 500);
  }
});
