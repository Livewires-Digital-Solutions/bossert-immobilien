/**
 * GET /api/properties/[id]
 * Returns a single published property by its external or internal ID (admin-
 * curated fields only). Falls back to the live onOffice feed, then mock data.
 */

import { NextRequest, NextResponse } from 'next/server';
import { withBackendGuard } from '@/lib/backend-config';
import { getPublicPropertyView } from '@/lib/property-view';
import { fetchOnOfficePropertyById } from '@/lib/onoffice';
import { mockProperties } from '@/data/properties';

export const dynamic = 'force-dynamic';

export const GET = withBackendGuard(async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    const curated = await getPublicPropertyView(id);
    if (curated) {
      return NextResponse.json(curated.property);
    }

    const live = await fetchOnOfficePropertyById(id);
    if (live) {
      return NextResponse.json(live);
    }

    const fallback = mockProperties.find((p) => p.id === id);
    if (fallback) {
      return NextResponse.json(fallback);
    }
    return NextResponse.json({ error: 'Property not found' }, { status: 404 });
  } catch (error) {
    console.error(`[/api/properties/${id}] Error:`, error);
    const fallback = mockProperties.find((p) => p.id === id);
    return fallback
      ? NextResponse.json(fallback)
      : NextResponse.json({ error: 'Failed to fetch property' }, { status: 500 });
  }
});
