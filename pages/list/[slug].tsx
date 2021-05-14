import prisma from 'lib/prisma'
import { InferGetStaticPropsType } from 'next'

import MediaItem from 'components/MediaItem'
import ListViewController from 'components/ListViewController'
import { Metric } from '.prisma/client'

export default function Detail({
  data,
  labels
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (!data)
    return (
      <div className="p-64">
        <h2 className="font-bold text-3xl">No record found</h2>
      </div>
    )

  return (
    <div className="p-24">
      <div className="flex justify-between items-center pb-4 border-b">
        <h2 className="text-xl font-bold">{data.length}件表示中</h2>
        <ListViewController labels={['timestamp', ...labels]} />
      </div>
      <ul className="flex flex-wrap pt-4">
        {data.map((cn) => {
          return <MediaItem key={cn.id} data={cn} />
        })}
      </ul>
    </div>
  )
}

export const getStaticProps = async ({ params }) => {
  const { slug } = params

  const metricLabels = [
    'id',
    'likeCount',
    'saveCount',
    'reachCount',
    'impressionFromHashtag',
    'impressionFromExplore',
    'scrapedAt'
  ]
  const select: { [P in keyof Metric]?: true } = {}
  metricLabels
    .map((x) => ({ [x]: true }))
    .forEach((a) => Object.assign(select, a))

  const data = await prisma.content.findMany({
    where: {
      ownerId: slug
    },
    orderBy: {
      timestamp: 'desc'
    },
    // take: 1,
    include: {
      metrics: {
        take: 1,
        orderBy: {
          scrapedAt: 'desc'
        },
        select
      }
    }
  })

  return {
    props: {
      data,
      labels: metricLabels
    }
  }
}

export const getStaticPaths = async () => {
  const paths = await prisma.owner.findMany()
  return {
    paths: paths.map((x) => ({
      params: {
        slug: x.id
      }
    })),
    fallback: true
  }
}
