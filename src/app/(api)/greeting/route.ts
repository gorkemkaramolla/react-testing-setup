import { NextResponse } from 'next/server';
export async function GET(res: NextResponse, req: Request) {
  console.log('server is working');
  return new NextResponse(JSON.stringify({ message: 'greetings' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
