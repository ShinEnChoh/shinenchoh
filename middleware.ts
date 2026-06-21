console.log('=== MIDDLEWARE DEBUG ===')
console.log('password:', process.env.PROTECTION_PASSWORD)

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // 環境変数からパスワードを取得
  const password = process.env.PROTECTION_PASSWORD

  // パスワードが設定されていない（空文字列）なら、保護しない
  if (!password) {
    return NextResponse.next()
  }

  // すでに認証済みか Cookie を確認
  const authCookie = request.cookies.get('auth_token')

  if (authCookie?.value === password) {
    // 認証OK → そのまま通す
    return NextResponse.next()
  }

  // 未認証なら、ログイン画面を返す
  const loginHtml = `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>神縁帳 Sacra Vincula</title>
  <style>
    body {
      font-family: 'Noto Serif JP', serif;
      background: #faf7f2;
      color: #3b3b3b;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      margin: 0;
    }
    .container {
      text-align: center;
      padding: 2rem;
    }
    h1 {
      color: #C04040;
      font-size: 2rem;
      margin-bottom: 0.5rem;
    }
    .subtitle {
      color: #B8860B;
      margin-bottom: 2rem;
    }
    form {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.75rem;
    }
    input {
      padding: 0.5rem 1rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 1rem;
      width: 200px;
      text-align: center;
    }
    button {
      padding: 0.5rem 1.5rem;
      background: #C04040;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
    }
    .error {
      color: #C04040;
      margin-top: 0.5rem;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>神縁帳</h1>
    <p class="subtitle">Sacra Vincula</p>
    <form method="post">
      <input type="password" name="password" placeholder="合言葉" required />
      <button type="submit">入る</button>
    </form>
  </div>
</body>
</html>`

  // POST ならパスワードをチェック
  if (request.method === 'POST') {
    // フォームデータを取得
    const formData = await request.formData()
    const inputPassword = formData.get('password')?.toString() ?? ''

    if (inputPassword === password) {
      // 認証成功 → Cookie を発行してリダイレクト
      const response = NextResponse.redirect(new URL('/', request.url))
      response.cookies.set('auth_token', password, {
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24 * 30, // 30日間
        sameSite: 'lax',
      })
      return response
    } else {
      // パスワード不一致 → エラーメッセージ付きで再表示
      const errorHtml = loginHtml.replace('</form>', '<p class="error">合言葉が違います</p></form>')
      return new NextResponse(errorHtml, {
        status: 401,
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      })
    }
  }

  // GET ならログイン画面を表示
  return new NextResponse(loginHtml, {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  })
}

// すべてのパスに適用
export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico).*)',
}