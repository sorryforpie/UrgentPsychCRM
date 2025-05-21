import prisma from '../src/lib/prisma';

test('prisma connects', async () => {
  const patients = await prisma.patient.findMany();
  expect(Array.isArray(patients)).toBe(true);
});
