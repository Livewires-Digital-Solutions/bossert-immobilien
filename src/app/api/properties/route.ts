/**
 * GET /api/properties
 * Returns the properties the admin has published (from the DB, with only the
 * fields toggled visible). Falls back to the live onOffice feed, then to mock
 * data, so the listing never renders empty during setup.
 */

import { NextResponse } from 'next/server';
import { withBackendGuard } from '@/lib/backend-config';
import { getPublicPropertyCards } from '@/lib/property-view';
import { fetchOnOfficeProperties } from '@/lib/onoffice';
import { mockProperties } from '@/data/properties';

export const dynamic = 'force-dynamic';

export const GET = withBackendGuard(async function GET() {
  try {
    const curated = await getPublicPropertyCards();
    if (curated && curated.length > 0) {
      return NextResponse.json(curated);
    }

    const live = await fetchOnOfficeProperties();
    if (live && live.length > 0) {
      return NextResponse.json(live);
    }

    return NextResponse.json(mockProperties);
  } catch (error) {
    console.error('[/api/properties] Error:', error);
    return NextResponse.json(mockProperties);
  }
});
