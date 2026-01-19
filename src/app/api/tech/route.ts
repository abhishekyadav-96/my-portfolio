
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Tech from '@/models/Tech';

export async function GET() {
  try {
    await dbConnect();
    const tech = await Tech.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: tech });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function POST(request: Request) {
  await dbConnect();

  try {
    const body = await request.json();
    const tech = await Tech.create(body);
    return NextResponse.json({ success: true, data: tech }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
