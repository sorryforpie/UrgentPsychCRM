import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const patients = await prisma.patient.findMany({ include: { events: true } })
    res.status(200).json(patients)
  } else if (req.method === 'POST') {
    const data = req.body
    try {
      const patient = await prisma.patient.create({ data })
      res.status(201).json(patient)
    } catch (err) {
      res.status(400).json({ error: 'Unable to create patient' })
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
