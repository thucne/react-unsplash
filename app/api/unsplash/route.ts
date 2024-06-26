const UNSPLASH_URL = process.env.UNSPLASH_URL;
const UNSPLASH_KEY = process.env.UNSPLASH_KEY;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const res = await fetch(`${UNSPLASH_URL}?${searchParams.toString()}`, {
    headers: {
      Authorization: `Client-ID ${UNSPLASH_KEY}`,
    },
    cache: "force-cache",
  });
  
  const data = await res.json();

  return Response.json(data);
}