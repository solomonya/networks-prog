import { PrismaClient } from '@prisma/client'
import fs from 'node:fs';
import path from 'node:path';

const globalForPrisma = global as unknown as { prisma: PrismaClient }

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: [
      {
        emit: 'event',
        level: 'query',
      },
    ],
  })

  prisma.$on('query', async (e) => {
    const log = getLogString(e.query, e.duration); 
    console.log('LOG -->', log);
    await fs.promises.appendFile('../logs.txt', log);
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

function getLogString(query: string, duration: number) {
  const now = new Date(Date.now());
  const today = now.toLocaleDateString();
  const time = now.toLocaleTimeString();
  const dateStr = `${today} ${time}`

  const log = `Query: ${query}, Duration: ${duration}ms, Date: ${dateStr} \n`;
  return log;
};



export { prisma };
