'use client'

import dynamic from 'next/dynamic'

const ShrineMap = dynamic(() => import('./ShrineMap'), { ssr: false })

export default function ShrineMapWrapper({ places }: { places: any[] }) {
  return <ShrineMap places={places} />
}