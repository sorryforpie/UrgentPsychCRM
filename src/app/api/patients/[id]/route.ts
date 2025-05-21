import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

interface Params { params: { id: string } }

export async function GET(_req: Request, { params }: Params) {
  const id = Number(params.id);
  const patient = await prisma.patient.findUnique({ where: { id }, include: { timeline: true } });
  if (!patient) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(patient);
}

export async function PUT(req: Request, { params }: Params) {
  const id = Number(params.id);
  const data = await req.json();
  const patient = await prisma.patient.update({ where: { id }, data });
  return NextResponse.json(patient);
}

export async function DELETE(_req: Request, { params }: Params) {
  const id = Number(params.id);
  await prisma.patient.delete({ where: { id } });
  return NextResponse.json({});
}
