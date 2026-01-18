import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Experience from '@/models/Experience';

export async function GET() {
  await dbConnect();
  try {
    const experiences = await Experience.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: experiences });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function POST(request: Request) {
  await dbConnect();
  try {
    const body = await request.json();
    const experience = await Experience.create(body);
    return NextResponse.json({ success: true, data: experience }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
