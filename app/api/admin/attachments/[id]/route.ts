import { NextRequest, NextResponse } from 'next/server'
import { get } from '@vercel/blob'
import { db } from '@/lib/db'
import { reportAttachments } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

function validateAdminToken(req: NextRequest) {
  const adminToken = process.env.ADMIN_TOKEN
  return Boolean(adminToken) && req.headers.get('x-admin-token') === adminToken
}

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  if (!validateAdminToken(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({ error: 'Evidence storage is not configured' }, { status: 503 })
  }

  const { id } = await context.params
  const attachment = await db
    .select()
    .from(reportAttachments)
    .where(eq(reportAttachments.id, id))
    .limit(1)

  if (attachment.length === 0) {
    return NextResponse.json({ error: 'Attachment not found' }, { status: 404 })
  }

  const result = await get(attachment[0].fileUrl, { access: 'private' })
  if (!result || result.statusCode !== 200) {
    return NextResponse.json({ error: 'File not found' }, { status: 404 })
  }

  return new NextResponse(result.stream, {
    headers: {
      'Content-Type': attachment[0].fileType || result.blob.contentType || 'application/octet-stream',
      'Content-Disposition': `attachment; filename*=UTF-8''${encodeURIComponent(attachment[0].fileName)}`,
      'Cache-Control': 'private, no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  })
}
