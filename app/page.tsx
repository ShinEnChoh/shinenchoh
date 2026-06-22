'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import ShrineMapWrapper from '@/components/ShrineMapWrapper'

export default function Home() {
  // モード切り替え用の状態
  const [viewMode, setViewMode] = useState<'catalog' | 'map'>('catalog')

  // 図鑑用データ
  const [beings, setBeings] = useState<any[]>([])
  const [filter, setFilter] = useState('all')

  // 地図用データ
  const [places, setPlaces] = useState<any[]>([])

  // 図鑑データの取得（フィルターが変わるたび）
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

  // 地図データの取得（地図モードに切り替えたときだけ）
  useEffect(() => {
    if (viewMode === 'map') {
      const fetchPlaces = async () => {
        const { data } = await supabase
          .from('sacred_places')
          .select('*, place_beings(sacred_beings(*))')
        setPlaces(data || [])
      }
      fetchPlaces()
    }
  }, [viewMode])

  return (
    <main className="min-h-screen p-8 font-serif">
      {/* ヘッダー */}
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-mincho text-shu-iro tracking-wide">神縁帳</h1>
        <p className="mt-2 text-kin-iro font-mincho text-lg">Sacra Vincula</p>
      </header>

      {/* モード切り替えタブ */}
      <div className="flex justify-center gap-8 mb-8">
        <button
          onClick={() => setViewMode('catalog')}
          className={`text-xl font-mincho pb-2 border-b-2 transition-colors ${
            viewMode === 'catalog'
              ? 'text-shu-iro border-shu-iro'
              : 'text-sumi/50 border-transparent hover:text-sumi'
          }`}
        >
          神名帳
        </button>
        <button
          onClick={() => setViewMode('map')}
          className={`text-xl font-mincho pb-2 border-b-2 transition-colors ${
            viewMode === 'map'
              ? 'text-shu-iro border-shu-iro'
              : 'text-sumi/50 border-transparent hover:text-sumi'
          }`}
        >
          神跡帳
        </button>
      </div>

      {/* 図鑑モード */}
      {viewMode === 'catalog' && (
        <>
          {/* フィルターボタン */}
          <div className="flex gap-4 mb-8 justify-center">
            {[
              { key: 'all', label: 'すべて' },
              { key: 'amatsu', label: '天津神' },
              { key: 'kunitsu', label: '国津神' },
              { key: 'human', label: '人神' },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  filter === key
                    ? 'bg-shu-iro text-white'
                    : 'bg-gray-200 text-sumi hover:bg-gray-300'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* 神様カード一覧 */}
          <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {beings.map((being) => (
              <div
                key={being.id}
                className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-bold text-shu-iro">{being.name_ja}</h3>
                <p className="text-sumi text-sm mt-2 leading-relaxed">{being.description}</p>
                {being.attributes?.dominion && (
                  <div className="mt-3 flex gap-2 flex-wrap">
                    {being.attributes.dominion.map((d: string) => (
                      <span
                        key={d}
                        className="text-xs bg-ruri-iro text-white px-2 py-1 rounded-full"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </section>
        </>
      )}

      {/* 地図モード */}
      {viewMode === 'map' && (
        <section>
          <ShrineMapWrapper places={places} />
        </section>
      )}
    </main>
  )
}