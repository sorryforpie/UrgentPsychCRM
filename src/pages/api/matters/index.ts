import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const matters = await prisma.matter.findMany({ include: { patient: true } })
    res.status(200).json(matters)
  } else if (req.method === 'POST') {
    try {
      const matter = await prisma.matter.create({ data: req.body })
      res.status(201).json(matter)
    } catch (err) {
      res.status(400).json({ error: 'Unable to create matter' })
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
