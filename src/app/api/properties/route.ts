/**
 * GET /api/properties
 * Returns all 3 onOffice properties as JSON.
 */

import { NextResponse } from 'next/server';
import { fetchOnOfficeProperties } from '@/lib/onoffice';
import { mockProperties } from '@/data/properties';

export const dynamic = 'force-dynamic'; // never cache during development

export async function GET() {
  try {
    let properties = await fetchOnOfficeProperties();
    if (!properties || properties.length === 0) {
      properties = mockProperties;
    }
    return NextResponse.json(properties);
  } catch (error) {
    console.error('[/api/properties] Error:', error);
    return NextResponse.json(mockProperties);
  }
}
