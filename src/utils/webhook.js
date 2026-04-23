// src/utils/webhook.js

export async function sendToDiscord(webhookKey, formMeta, pages, answers) {
  if (!webhookKey || webhookKey === 'YOUR_DISCORD_WEBHOOK_URL_HERE') {
    console.warn('No webhook key configured.')
    return { ok: true, simulated: true }
  }

  const fields = []
  for (const page of pages) {
    for (const q of page.questions) {
      const answer = answers[q.id]
      if (answer === undefined || answer === '' || (Array.isArray(answer) && answer.length === 0)) continue

      let value
      if (Array.isArray(answer)) {
        value = answer.map(a => `• ${a}`).join('\n')
      } else if (q.type === 'scale') {
        const range = q.max - q.min
        const filled = Math.round(((answer - q.min) / range) * 10)
        const bar = '█'.repeat(filled) + '░'.repeat(10 - filled)
        value = `**${answer}** / ${q.max}  \`${bar}\``
      } else {
        value = String(answer)
      }

      fields.push({
        name: q.label,
        value: value.length > 1024 ? value.slice(0, 1021) + '...' : value,
        inline: q.type === 'scale' || q.type === 'choice',
      })
    }
  }

  const payload = {
    embeds: [{
      title: `📋 New ${formMeta.title || 'Form'} Submission`,
      color: 0x656389,
      fields,
      footer: { text: `Submitted via Issues • ${new Date().toLocaleString()}` },
      timestamp: new Date().toISOString(),
    }],
  }

  const res = await fetch('/api/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ key: webhookKey, payload }),
  })

  return { ok: res.ok, status: res.status }
}