import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { reports } from '@/lib/db/schema'
import { sql } from 'drizzle-orm'

// Simple admin token validation (in production, use proper auth)
function validateAdminToken(req: NextRequest): boolean {
  const adminToken = process.env.ADMIN_TOKEN
  const token = req.headers.get('x-admin-token') || ''
  return Boolean(adminToken) && token === adminToken
}

export async function GET(req: NextRequest) {
  if (!validateAdminToken(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status')
    const category = searchParams.get('category')
    const severity = searchParams.get('severity')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')

    let query = db.select().from(reports)

    // Apply filters
    const filters = []
    if (status) filters.push(sql`status = ${status}`)
    if (category) filters.push(sql`category = ${category}`)
    if (severity) filters.push(sql`severity = ${severity}`)

    if (filters.length > 0) {
      const whereClause = sql.join(filters, sql` AND `)
      query = query.where(whereClause)
    }

    const allReports = await query
      .orderBy(sql`createdat DESC`)
      .limit(limit)
      .offset(offset)

    // Get total count for pagination
    const countResult = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(reports)

    return NextResponse.json({
      reports: allReports,
      total: countResult[0]?.count || 0,
      limit,
      offset,
    })
  } catch (error) {
    console.error('[v0] Error fetching reports:', error)
    return NextResponse.json(
      { error: 'Failed to fetch reports' },
      { status: 500 }
    )
  }
}

export async function PATCH(req: NextRequest) {
  if (!validateAdminToken(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { reportId, status, adminNotes } = await req.json()

    if (!reportId) {
      return NextResponse.json(
        { error: 'Report ID is required' },
        { status: 400 }
      )
    }

    const updateData: any = { updatedat: new Date() }
    if (status) updateData.status = status
    if (adminNotes !== undefined) updateData.adminnotes = adminNotes

    await db
      .update(reports)
      .set(updateData)
      .where(sql`id = ${reportId}`)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[v0] Error updating report:', error)
    return NextResponse.json(
      { error: 'Failed to update report' },
      { status: 500 }
    )
  }
}
