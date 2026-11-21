const allowed = new Set(['work_with_me_view', 'work_with_me_click']);

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const event = request.body && request.body.event;
  if (!allowed.has(event)) {
    response.status(400).json({ error: 'Invalid event' });
    return;
  }

  console.log(JSON.stringify({ kind: 'cta-event', event }));
  response.status(204).end();
}
