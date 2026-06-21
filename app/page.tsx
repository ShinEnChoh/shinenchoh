import { supabase } from '@/lib/supabase'

// サーバーコンポーネントとして、データベースから直接データを取得する
export default async function Home() {
  const { data: beings, error } = await supabase
    .from('sacred_beings')
    .select('*')

  if (error) {
    return <main>神様データの取得に失敗しました: {error.message}</main>
  }

  return (
    <main style={{ padding: '2rem', fontFamily: 'serif' }}>
      <h1>神縁帳 Sacra Vincula</h1>
      <h2>神々の一覧</h2>
      {beings.length === 0 ? (
        <p>まだ神様が登録されていません。</p>
      ) : (
        <ul>
          {beings.map((being) => (
            <li key={being.id}>{being.name_ja} - {being.description}</li>
          ))}
        </ul>
      )}
    </main>
  )
}
