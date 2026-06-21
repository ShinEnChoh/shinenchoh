import { supabase } from '@/lib/supabase'

export default async function Home() {
  const { data: beings, error } = await supabase
    .from('sacred_beings')
    .select('*')

  if (error) {
    return <main className="p-8 font-serif">神様データの取得に失敗しました: {error.message}</main>
  }

  return (
    <main className="min-h-screen p-8 font-serif">
      {/* タイトル */}
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-mincho text-shu-iro tracking-wide">
          神縁帳
        </h1>
        <p className="mt-2 text-kin-iro font-mincho text-lg">
          Sacra Vincula
        </p>
      </header>

      {/* 神様一覧 */}
      <section>
        <h2 className="text-2xl font-mincho text-ruri-iro mb-6 border-b border-ruri-iro pb-2">
          神々の一覧
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {beings.map((being) => (
            <div
              key={being.id}
              className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-bold text-shu-iro mb-2">
                {being.name_ja}
              </h3>
              <p className="text-sumi text-sm leading-relaxed">
                {being.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}