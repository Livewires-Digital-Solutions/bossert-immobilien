/**
 * GET /api/properties
 * Returns all 3 onOffice properties as JSON.
 */

import { NextResponse } from 'next/server';
import { fetchOnOfficeProperties } from '@/lib/onoffice';

export const dynamic = 'force-dynamic'; // never cache during development

export async function GET() {
  try {
    console.log('[/api/properties] TOKEN present:', !!process.env.ONOFFICE_TOKEN, 'SECRET present:', !!process.env.ONOFFICE_SECRET);
    const properties = await fetchOnOfficeProperties();
    console.log('[/api/properties] Returned', properties.length, 'properties');
    return NextResponse.json(properties);
  } catch (error) {
    console.error('[/api/properties] Error:', error);
    return NextResponse.json(
      { error: String(error) },
      { status: 500 },
    );
  }
}
