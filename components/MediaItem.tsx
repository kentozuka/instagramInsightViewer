import { Content, Metric } from '.prisma/client'
import { dateFromNumber } from 'lib/time'
import Image from 'next/image'

import Heart from 'public/svgs/heart.svg'
import Bookmark from 'public/svgs/bookmark.svg'
import Reach from 'public/svgs/reach.svg'
import Hash from 'public/svgs/hash.svg'
import Search from 'public/svgs/search.svg'
import { numberWithCommas } from 'lib/number'

export default function MediaItem({
  data: cn
}: {
  data: Content & {
    metrics: Partial<Metric>[]
  }
}) {
  return (
    <li className="relative p-1">
      <Image src={cn.thumbnail} width={200} height={200} />
      <div className="absolute w-full h-full top-0 left-0 flex flex-col">
        <p className="w-20 p-1 text-xs bg-black bg-opacity-30 text-white">
          {dateFromNumber(cn.timestamp)}
        </p>

        {cn.metrics &&
          cn.metrics.map((dd) => (
            <div
              key={dd.id}
              className="mt-8 bg-black bg-opacity-30 text-white text-sm w-20 p-1"
            >
              <div className="flex pb-1">
                <Heart width={20} height={20} />
                <p className="pl-2">{numberWithCommas(dd.likeCount)}</p>
              </div>
              <div className="flex pb-1">
                <Bookmark width={20} height={20} />
                <p className="pl-2">{numberWithCommas(dd.saveCount)}</p>
              </div>
              <div className="flex pb-1">
                <Reach width={20} height={20} />
                <p className="pl-2">{numberWithCommas(dd.reachCount)}</p>
              </div>
              <div className="flex pb-1">
                <Hash width={20} height={20} />
                <p className="pl-2">
                  {numberWithCommas(dd.impressionFromHashtag)}
                </p>
              </div>
              <div className="flex pb-1">
                <Search width={20} height={20} />
                <p className="pl-2">
                  {numberWithCommas(dd.impressionFromExplore)}
                </p>
              </div>
            </div>
          ))}
      </div>
    </li>
  )
}
