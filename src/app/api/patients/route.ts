import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  const patients = await prisma.patient.findMany({ include: { timeline: true } });
  return NextResponse.json(patients);
}

export async function POST(req: Request) {
  const data = await req.json();
  const patient = await prisma.patient.create({ data });
  return NextResponse.json(patient, { status: 201 });
}
