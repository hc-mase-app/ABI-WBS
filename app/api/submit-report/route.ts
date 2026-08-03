import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { reports } from '@/lib/db/schema'
import { nanoid } from 'nanoid'

function generateTrackingCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let code = ''
  for (let i = 0; i < 12; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { title, description, category, severity, department, reporterEmail, reporterPhone } = body

    if (!title?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Judul laporan tidak boleh kosong' },
        { status: 400 }
      )
    }

    if (!description?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Deskripsi laporan tidak boleh kosong' },
        { status: 400 }
      )
    }

    if (!category) {
      return NextResponse.json(
        { success: false, error: 'Silakan pilih kategori laporan' },
        { status: 400 }
      )
    }

    const trackingCode = generateTrackingCode()
    const reportId = nanoid()

    console.log('[v0] API: Submitting report:', { title, category, trackingCode })

    await db.insert(reports).values({
      id: reportId,
      trackingCode,
      title,
      description,
      category,
      severity: severity || 'medium',
      department: department || undefined,
      reporterEmail: reporterEmail || undefined,
      reporterPhone: reporterPhone || undefined,
      status: 'open',
    })

    console.log('[v0] API: Report created successfully:', reportId)

    return NextResponse.json(
      {
        success: true,
        trackingCode,
        reportId,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('[v0] API Error:', error)
    return NextResponse.json(
      { success: false, error: 'Gagal mengirimkan laporan. Silakan coba lagi.' },
      { status: 500 }
    )
  }
}
