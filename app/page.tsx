import { supabase } from '@/lib/supabase'
import ShrineMap from '@/components/ShrineMap'

export default async function Home() {
  // 神様データ
  const { data: beings } = await supabase.from('sacred_beings').select('*')

  // 場所データ（リレーションも含めて取得）
  const { data: places } = await supabase
    .from('sacred_places')
    .select('*, place_beings(sacred_beings(*))')

  return (
    <main className="min-h-screen p-8 font-serif">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-mincho text-shu-iro tracking-wide">神縁帳</h1>
        <p className="mt-2 text-kin-iro font-mincho text-lg">Sacra Vincula</p>
      </header>

      {/* 神様一覧（省略可） */}
      <section className="mb-12">
        <h2 className="text-2xl font-mincho text-ruri-iro mb-6">神々の一覧</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {beings?.map((being) => (
            <div key={being.id} className="rounded-lg border bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-shu-iro">{being.name_ja}</h3>
              <p className="text-sumi text-sm">{being.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 地図 */}
      <section>
        <h2 className="text-2xl font-mincho text-ruri-iro mb-6">神々の鎮座地</h2>
        <ShrineMap places={places || []} />
      </section>
    </main>
  )
}