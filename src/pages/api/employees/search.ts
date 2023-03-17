import { prisma } from '@/prisma';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const searchStr = req.query.emp;

  const employees = await prisma.epmloyee.findMany({
    where: {
      lastName: {
        contains: searchStr as string
      }
    }
  });
  
  res.status(200).json({ results: employees });
}
