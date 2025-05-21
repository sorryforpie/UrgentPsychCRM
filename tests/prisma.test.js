import test from 'node:test'
import assert from 'node:assert'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

test('connects to database', async () => {
  await prisma.$connect()
  const result = await prisma.$queryRaw`SELECT 1;`
  assert.ok(result)
  await prisma.$disconnect()
})
