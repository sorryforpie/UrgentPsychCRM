import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = Number(req.query.id)

  if (req.method === 'GET') {
    const patient = await prisma.patient.findUnique({ where: { id }, include: { events: true, matters: true } })
    if (!patient) return res.status(404).json({ error: 'Not found' })
    res.status(200).json(patient)
  } else if (req.method === 'PUT') {
    try {
      const patient = await prisma.patient.update({ where: { id }, data: req.body })
      res.status(200).json(patient)
    } catch (err) {
      res.status(400).json({ error: 'Unable to update patient' })
    }
  } else if (req.method === 'DELETE') {
    try {
      await prisma.patient.delete({ where: { id } })
      res.status(204).end()
    } catch (err) {
      res.status(400).json({ error: 'Unable to delete patient' })
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
