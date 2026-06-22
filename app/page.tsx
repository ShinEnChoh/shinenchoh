'use client'  // フィルターの状態管理のため

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import ShrineMapWrapper from '@/components/ShrineMapWrapper'

export default function Home() {
  const [beings, setBeings] = useState<any[]>([])
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    const fetchBeings = async () => {
      let query = supabase.from('sacred_beings').select('*')
      if (filter === 'amatsu') query = query.filter('attributes->>amatsu_kunitsu', 'eq', 'amatsu')
      if (filter === 'kunitsu') query = query.filter('attributes->>amatsu_kunitsu', 'eq', 'kunitsu')
      if (filter === 'human') query = query.filter('attributes->>is_human', 'eq', 'true')
      const { data } = await query
      setBeings(data || [])
    }
    fetchBeings()
  }, [filter])

  return (
    <main className="min-h-screen p-8 font-serif">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-mincho text-shu-iro">神縁帳</h1>
        <p className="mt-2 text-kin-iro font-mincho text-lg">Sacra Vincula</p>
      </header>

      <div className="flex gap-4 mb-8 justify-center">
        {['all', 'amatsu', 'kunitsu', 'human'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded ${filter === f ? 'bg-shu-iro text-white' : 'bg-gray-200'}`}
          >
            {f === 'all' ? 'すべて' : f === 'amatsu' ? '天津神' : f === 'kunitsu' ? '国津神' : '人神'}
          </button>
        ))}
      </div>

      <section className="grid gap-6 md:grid-cols-3">
        {beings.map(being => (
          <div key={being.id} className="rounded-lg border bg-white p-6 shadow-sm">
            <h3 className="text-xl font-bold text-shu-iro">{being.name_ja}</h3>
            <p className="text-sumi text-sm mt-2">{being.description}</p>
            <div className="mt-3 flex gap-2 flex-wrap">
              {being.attributes?.dominion?.map((d: string) => (
                <span key={d} className="text-xs bg-ruri-iro text-white px-2 py-1 rounded">{d}</span>
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  )
}