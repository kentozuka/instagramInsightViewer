import Link from 'next/link'
import prisma from 'lib/prisma'
import { InferGetStaticPropsType } from 'next'

export default function Home({
  data
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <ul className="p-12">
      {data &&
        data.map((us) => (
          <li key={us.id} className="pb-4">
            <Link href={`/list/${us.id}`}>
              <a>
                {us.id} ({us.fullName})
              </a>
            </Link>
          </li>
        ))}
    </ul>
  )
}

export const getStaticProps = async () => {
  return {
    props: {
      data: await prisma.owner.findMany()
    }
  }
}

/**
 * TODO
 *
 * create the page where it lists the every users
 * create slug where the user's detail is displayed
 * add graph support
 *
 */
