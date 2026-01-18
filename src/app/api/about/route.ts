import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import About from '@/models/About';

export async function GET() {
  await dbConnect();
  try {
    const about = await About.findOne({});
    return NextResponse.json({ success: true, data: about });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function POST(request: Request) {
  await dbConnect();
  try {
    const body = await request.json();
    const about = await About.create(body);
    return NextResponse.json({ success: true, data: about }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
