import { prisma } from '@/prisma';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const requestBody = JSON.parse(req.body);
    const listener = await prisma.listener.findUnique({
      where: {
        email: requestBody.email
      },
      include: {
        reports: true
      }
    });

    if(!listener) {
      const createdListener = await prisma.listener.create({
        data: {
          email: requestBody.email,
          fullName: requestBody.fullName,
          reports: {
            connect: {
              id: parseFloat(requestBody.reportId)
            }
          }
        }
      })
      res.status(200).json(createdListener);
    }

    const listenerReportsIds = listener?.reports.map(report => report.id);
    if(listenerReportsIds?.includes(parseFloat(requestBody.reportId)))
      res.status(400).json({ message: "Вы уже зарегистрированы на этот доклад" });


    const updatedReport = await prisma.report.update({
      where: {
        id: parseFloat(requestBody.reportId) 
      },
      data: {
        listeners: { connect: { id: parseFloat(listener?.id) } }
      }
    });

    res.status(200).json(updatedReport);

  } catch(e) {
    console.error(e)
  }
  res.status(200).json(req.body)
}
