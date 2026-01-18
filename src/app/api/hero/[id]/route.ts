import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Hero from '@/models/Hero';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  try {
    const body = await request.json();
    const hero = await Hero.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });
    if (!hero) {
      return NextResponse.json({ success: false, error: 'Hero not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: hero });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  try {
    const deletedHero = await Hero.deleteOne({ _id: params.id });
    if (!deletedHero) {
      return NextResponse.json({ success: false, error: 'Hero not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: {} });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
