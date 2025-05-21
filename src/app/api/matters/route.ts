import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  const matters = await prisma.matter.findMany({ include: { patient: true } });
  return NextResponse.json(matters);
}

export async function POST(req: Request) {
  const data = await req.json();
  const matter = await prisma.matter.create({ data });
  return NextResponse.json(matter, { status: 201 });
}
