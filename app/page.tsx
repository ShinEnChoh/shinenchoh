import { supabase } from '@/lib/supabase'
import ShrineMapWrapper from '@/components/ShrineMapWrapper'

export default async function Home() {
  const { data: beings } = await supabase.from('sacred_beings').select('*')
  const { data: places } = await supabase.from('sacred_places').select('*, place_beings(sacred_beings(*))')

  return (
    <main className="min-h-screen p-8 font-serif">
      {/* ヘッダー・神様一覧は省略 */}
      <section>
        <h2 className="text-2xl font-mincho text-ruri-iro mb-6">神々の鎮座地</h2>
        <ShrineMapWrapper places={places || []} />
      </section>
    </main>
  )
}