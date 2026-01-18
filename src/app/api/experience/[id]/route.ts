import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Experience from '@/models/Experience';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  try {
    const body = await request.json();
    const experience = await Experience.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });
    if (!experience) {
      return NextResponse.json({ success: false, error: 'Experience not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: experience });
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
    const deletedExperience = await Experience.deleteOne({ _id: params.id });
    if (!deletedExperience) {
      return NextResponse.json({ success: false, error: 'Experience not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: {} });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
