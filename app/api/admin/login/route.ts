import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const adminToken = process.env.ADMIN_TOKEN
    const { password } = await request.json()

    if (!adminToken) {
      return NextResponse.json(
        { error: 'Admin access is not configured' },
        { status: 503 }
      )
    }

    if (typeof password !== 'string' || password !== adminToken) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
