// functions/api/submit.js
// Cloudflare Pages Function — runs server-side, env vars never reach the client

export async function onRequestPost(context) {
  const { request, env } = context

  let body
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { key, payload } = body

  if (!key) {
    return Response.json({ error: 'Missing webhook key' }, { status: 400 })
  }

  const safe = key.toUpperCase().replace(/[^A-Z0-9_]/g, '')
  const url = env[`WEBHOOK_${safe}_URL`]

  if (!url) {
    return Response.json({ error: `No webhook configured for: ${key}` }, { status: 400 })
  }

  try {
    const r = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    return Response.json({ ok: r.ok, status: r.status }, { status: r.ok ? 200 : 502 })
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 })
  }
}