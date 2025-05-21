import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = Number(req.query.id)

  if (req.method === 'GET') {
    const matter = await prisma.matter.findUnique({ where: { id }, include: { patient: true } })
    if (!matter) return res.status(404).json({ error: 'Not found' })
    res.status(200).json(matter)
  } else if (req.method === 'PUT') {
    try {
      const matter = await prisma.matter.update({ where: { id }, data: req.body })
      res.status(200).json(matter)
    } catch (err) {
      res.status(400).json({ error: 'Unable to update matter' })
    }
  } else if (req.method === 'DELETE') {
    try {
      await prisma.matter.delete({ where: { id } })
      res.status(204).end()
    } catch (err) {
      res.status(400).json({ error: 'Unable to delete matter' })
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
