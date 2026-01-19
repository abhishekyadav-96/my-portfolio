import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import About from '@/models/About';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  try {
    const { id } = await params;
    const body = await request.json();
    const about = await About.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    if (!about) {
      return NextResponse.json({ success: false, error: 'About not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: about });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  try {
    const { id } = await params;
    const deletedAbout = await About.deleteOne({ _id: id });
    if (!deletedAbout) {
      return NextResponse.json({ success: false, error: 'About not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: {} });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
