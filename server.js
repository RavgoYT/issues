import express from 'express'
import { createServer as createViteServer } from 'vite'
import 'dotenv/config'

const app = express()
app.use(express.json())

app.post('/api/submit', async (req, res) => {
  const { key, payload } = req.body

  const safe = key?.toUpperCase().replace(/[^A-Z0-9_]/g, '')
  const url = process.env[`WEBHOOK_${safe}_URL`]

  if (!url) {
    return res.status(400).json({ error: `No webhook configured for key: ${key}` })
  }

  try {
    const r = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    res.status(r.ok ? 200 : 502).json({ ok: r.ok, status: r.status })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

// In dev, let Vite handle everything else
if (process.env.NODE_ENV !== 'production') {
  const vite = await createViteServer({ server: { middlewareMode: true } })
  app.use(vite.middlewares)
} else {
  app.use(express.static('dist'))
}

app.listen(5173, () => console.log('Server running on http://localhost:5173'))