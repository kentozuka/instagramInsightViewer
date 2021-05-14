/**
 * TODO
 *
 * features
 * - change order by choosing on the menu
 * - change the items to display by choosing
 * - change the order [acs|desc]
 * - change the amount of data taken
 *
 * small stuff
 * - add documentation for icons | tooltips
 * - create a shared state with api
 *
 */

import { Metric } from '.prisma/client'

import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'

import ChevronDown from 'public/svgs/chevron-down.svg'
import ChevronUp from 'public/svgs/chevron-up.svg'
import Check from 'public/svgs/check.svg'

type NameType = {
  [P in keyof Metric | 'timestamp']?: {
    japanese: string
    value: string
  }
}

const names: NameType = {
  timestamp: {
    japanese: '投稿日',
    value: 'posted'
  },
  id: null,
  likeCount: {
    japanese: 'ライク',
    value: 'heart'
  },
  commentCount: {
    japanese: 'コメント',
    value: 'comment'
  },
  saveCount: {
    japanese: '保存',
    value: 'save'
  },
  profileVisitCount: {
    japanese: 'プロフィールアクセス',
    value: 'visit'
  },
  followerGainCount: {
    japanese: 'フォロワー増加',
    value: 'followers'
  },
  shareCount: {
    japanese: 'シェア',
    value: 'share'
  },
  videoViewCount: {
    japanese: '動画再生',
    value: 'view'
  },
  reachCount: {
    japanese: 'リーチ',
    value: 'reach'
  },
  reachFromNonFollower: {
    japanese: '非フォロワーリーチ',
    value: 'non followers'
  },
  impressionCount: {
    japanese: 'インプレッション',
    value: 'impression'
  },
  impressionFromFeed: {
    japanese: 'フィード・インプレッション',
    value: 'feed'
  },
  impressionFromProfile: {
    japanese: 'プロフィール・インプレッション',
    value: 'profile'
  },
  impressionFromHashtag: {
    japanese: 'ハッシュタグ・インプレッション',
    value: 'hashtag'
  },
  impressionFromOther: {
    japanese: 'その他・インプレッション',
    value: 'other'
  },
  scrapedAt: {
    japanese: '取得日',
    value: 'scraped'
  }
}

export default function ListViewController({ labels }: { labels: string[] }) {
  const items = labels.map((x: keyof Metric) => names[x]).filter(Boolean)
  const [selected, setSelected] = useState('posted')

  return (
    <div className="w-72">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
            <span className="block truncate">
              {items.find((x) => x.value == selected).japanese ||
                '選択してください'}
            </span>
            <span className="absolute flex flex-col inset-y-0 right-0 items-center justify-center pr-2 pointer-events-none">
              <ChevronUp width={14} height={14} />
              <ChevronDown width={14} height={14} />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {items.map((item, ix) => (
                <Listbox.Option
                  key={ix}
                  className={({ active }) =>
                    `${active ? 'bg-gray-100' : 'text-gray-900'}
                          cursor-pointer select-none relative py-2 pl-10 pr-4`
                  }
                  value={item.value}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`${
                          selected ? 'font-medium' : 'font-normal'
                        } block truncate`}
                      >
                        {item.japanese}
                      </span>
                      {selected ? (
                        <span
                          className={`${
                            active ? 'text-amber-600' : 'text-amber-600'
                          }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                        >
                          <Check width={14} height={14} />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}
