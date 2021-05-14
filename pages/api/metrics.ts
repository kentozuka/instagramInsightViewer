import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'
import { Content, Metric } from '.prisma/client'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { body, method } = req

  switch (method) {
    case 'POST': {
      if (!body) return res.status(400).json({ error: 'No payload found' })
      const response = await prisma.metric.createMany({
        data: body as Metric[]
      })
      return res.status(200).json({ message: `Added ${response.count}` })
    }

    case 'GET': {
      return res.status(200).json({ message: 'ok' })
    }
  }
}
