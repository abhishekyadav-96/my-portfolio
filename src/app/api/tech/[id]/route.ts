
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Tech from '@/models/Tech';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  const { id } = await params;

  try {
    const body = await request.json();
    const tech = await Tech.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    if (!tech) {
      return NextResponse.json({ success: false, error: 'Tech item not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: tech });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  const { id } = await params;

  try {
    const tech = await Tech.findByIdAndDelete(id);
    if (!tech) {
      return NextResponse.json({ success: false, error: 'Tech item not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: {} });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
