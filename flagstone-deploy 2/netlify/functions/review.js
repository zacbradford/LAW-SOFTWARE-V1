const { SKILLS } = require('./skills_data.js');

const MODEL = 'gemini-flash-lite-latest';

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ ok: false, error: 'Method not allowed' }) };
  }

  let payload;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch (e) {
    return { statusCode: 400, body: JSON.stringify({ ok: false, error: 'Invalid JSON in request.' }) };
  }

  const { accessCode, docType, documentText } = payload;

  const expectedCode = process.env.FLAGSTONE_ACCESS_CODE;
  if (!expectedCode) {
    return { statusCode: 500, body: JSON.stringify({ ok: false, error: 'Server is missing its FLAGSTONE_ACCESS_CODE configuration. Add it in Netlify site settings.' }) };
  }
  if (!accessCode || accessCode !== expectedCode) {
    return { statusCode: 401, body: JSON.stringify({ ok: false, error: 'Incorrect access code.' }) };
  }

  if (!docType || !SKILLS[docType]) {
    return { statusCode: 400, body: JSON.stringify({ ok: false, error: 'Unknown document type.' }) };
  }
  if (!documentText || !documentText.trim()) {
    return { statusCode: 400, body: JSON.stringify({ ok: false, error: 'No document text provided.' }) };
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return { statusCode: 500, body: JSON.stringify({ ok: false, error: 'Server is missing its GEMINI_API_KEY configuration. Add it in Netlify site settings.' }) };
  }

  const skillText = SKILLS[docType];
  const userPrompt = 'Review the following document according to the skill instructions you were given. '
    + 'Produce the SUMMARY and FLAGGED CLAUSES sections exactly as specified, then the disclaimer.\n\n'
    + '=== DOCUMENT START ===\n' + documentText + '\n=== DOCUMENT END ===';

  try {
    const resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: skillText }] },
        contents: [{ parts: [{ text: userPrompt }] }],
        generationConfig: { maxOutputTokens: 8000 }
      })
    });
    const data = await resp.json();
    if (!resp.ok) {
      const msg = (data.error && data.error.message) || `HTTP ${resp.status}`;
      return { statusCode: 502, body: JSON.stringify({ ok: false, error: msg }) };
    }
    const cand = (data.candidates || [])[0] || {};
    const parts = (cand.content && cand.content.parts) || [];
    const outText = parts.map(p => p.text || '').join('');
    return {
      statusCode: 200,
      body: JSON.stringify({
        ok: true,
        output: outText || '(empty response)',
        finishReason: cand.finishReason || 'unknown',
        usage: data.usageMetadata || null
      })
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ ok: false, error: 'Request to the model failed: ' + err.message }) };
  }
};
