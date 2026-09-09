// Fast2SMS sender. Corrects two bugs found in the legacy PHP version
// (public_html/draft/send_otp.php on the old site):
//   1. The `authorization` header was commented out, so every request was
//      unauthenticated and Fast2SMS rejected it outright.
//   2. The response body was never checked - only a cURL transport-level
//      error would surface, so a rejected/failed send still reported
//      success ("done") to the browser. Here we parse the JSON body and
//      require `return === true` before treating the send as successful.
async function sendSms(mobile, message) {
  const apiKey = process.env.FAST2SMS_API_KEY;
  if (!apiKey) {
    throw new Error('FAST2SMS_API_KEY is not configured.');
  }

  const res = await fetch('https://www.fast2sms.com/dev/bulkV2', {
    method: 'POST',
    headers: {
      authorization: apiKey,
      'content-type': 'application/json',
      accept: '*/*',
    },
    body: JSON.stringify({
      sender_id: process.env.FAST2SMS_SENDER_ID || 'TXTIND',
      message,
      route: 'v3',
      numbers: mobile,
    }),
  });

  let body;
  try {
    body = await res.json();
  } catch {
    throw new Error(`Fast2SMS returned a non-JSON response (HTTP ${res.status}).`);
  }

  if (!res.ok || body.return !== true) {
    const reason = Array.isArray(body.message) ? body.message.join(', ') : body.message || `HTTP ${res.status}`;
    throw new Error(`Fast2SMS rejected the request: ${reason}`);
  }

  return body;
}

module.exports = { sendSms };
