import { NextRequest, NextResponse } from 'next/server'
import { get } from '@vercel/blob'
import { db } from '@/lib/db'
import { reportAttachments, reports } from '@/lib/db/schema'
import { and, eq } from 'drizzle-orm'

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const trackingCode = request.headers.get('x-tracking-code')?.trim().toUpperCase()
  if (!trackingCode) {
    return NextResponse.json({ error: 'Tracking code is required' }, { status: 401 })
  }
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({ error: 'Evidence storage is not configured' }, { status: 503 })
  }

  const { id } = await context.params
  const attachment = await db
    .select({
      fileName: reportAttachments.fileName,
      fileUrl: reportAttachments.fileUrl,
      fileType: reportAttachments.fileType,
    })
    .from(reportAttachments)
    .innerJoin(reports, eq(reportAttachments.reportId, reports.id))
    .where(and(eq(reportAttachments.id, id), eq(reports.trackingCode, trackingCode)))
    .limit(1)

  if (attachment.length === 0) {
    return NextResponse.json({ error: 'Attachment not found' }, { status: 404 })
  }

  const result = await get(attachment[0].fileUrl, { access: 'private' })
  if (!result || result.statusCode !== 200) {
    return NextResponse.json({ error: 'File not found' }, { status: 404 })
  }

  const disposition = request.nextUrl.searchParams.get('download') === '1' ? 'attachment' : 'inline'

  return new NextResponse(result.stream, {
    headers: {
      'Content-Type': attachment[0].fileType || result.blob.contentType || 'application/octet-stream',
      'Content-Disposition': `${disposition}; filename*=UTF-8''${encodeURIComponent(attachment[0].fileName)}`,
      'Cache-Control': 'private, no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  })
}
