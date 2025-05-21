import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

interface Params { params: { id: string } }

export async function GET(_req: Request, { params }: Params) {
  const id = Number(params.id);
  const matter = await prisma.matter.findUnique({ where: { id }, include: { patient: true } });
  if (!matter) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(matter);
}

export async function PUT(req: Request, { params }: Params) {
  const id = Number(params.id);
  const data = await req.json();
  const matter = await prisma.matter.update({ where: { id }, data });
  return NextResponse.json(matter);
}

export async function DELETE(_req: Request, { params }: Params) {
  const id = Number(params.id);
  await prisma.matter.delete({ where: { id } });
  return NextResponse.json({});
}
