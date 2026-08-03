import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const adminPassword = process.env.ADMIN_TOKEN
    const token = request.headers.get('x-admin-token')

    // Validate admin token
    if (!adminPassword || !token || token !== adminPassword) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { currentPassword, newPassword, confirmPassword } = body

    // Validate passwords match
    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { error: 'New passwords do not match' },
        { status: 400 }
      )
    }

    // Validate current password
    if (currentPassword !== adminPassword) {
      return NextResponse.json(
        { error: 'Current password is incorrect' },
        { status: 400 }
      )
    }

    return NextResponse.json({
      error: 'Update ADMIN_TOKEN in your deployment environment to change the password',
    }, { status: 501 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to change password' },
      { status: 500 }
    )
  }
}
