import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'
import { Content } from '.prisma/client'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { body, method } = req

  switch (method) {
    case 'POST': {
      if (!body) return res.status(400).json({ error: 'No payload found' })

      const { id, ownerId } = body as Content
      const exist = await prisma.content.findUnique({
        where: { id }
      })
      if (exist) return res.status(400).json({ error: `${id} already exist` })

      const owner = await prisma.owner.findUnique({
        where: { id: ownerId }
      })
      if (!owner) {
        await prisma.owner.create({
          data: {
            id: ownerId,
            fullName: body.ownerFullName
          }
        })
      }

      const response = await prisma.content.create({
        data: body
      })
      return res.status(200).json({ message: `Added ${response.id}` })
    }

    case 'GET': {
      const { query } = req
      const response = await prisma.content.findMany({
        ...(query.ownerId && {
          where: {
            ownerId: query.ownerId as string
          }
        }),
        select: {
          id: true
        }
      })
      const mapped = response.map((x) => x.id)
      return res.status(200).json(mapped)
    }
  }
}
