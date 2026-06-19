export async function POST(request: Request) {
  const bodyData = await request.json();
  const { code, messages } = bodyData;

  const mappedMessages = messages?.map((msg: any) => ({
    ...msg,
    content: msg.parts ? msg.parts.map((p: any) => p.text).join("") : msg.content
  }));

  const backendPayload = JSON.stringify({
    ...bodyData,
    messages: mappedMessages
  });

  const backendUrl = process.env.BACKEND_URL ?? "http://localhost:3001";
  const upstream = await fetch(`${backendUrl}/properties/${code}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: backendPayload,
  });

  return new Response(upstream.body, {
    status: upstream.status,
    headers: upstream.headers,
  });
}
