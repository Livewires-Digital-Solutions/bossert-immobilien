/**
 * GET /api/properties/[id]
 * Returns a single property by its external ID (e.g. "26-BO-619").
 */

import { NextRequest, NextResponse } from 'next/server';
import { fetchOnOfficePropertyById } from '@/lib/onoffice';
import { mockProperties } from '@/data/properties';

export const revalidate = 300; // 5-minute ISR cache

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  try {
    let property = await fetchOnOfficePropertyById(id);
    if (!property) {
      property = mockProperties.find((p) => p.id === id) || null;
    }
    if (!property) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }
    return NextResponse.json(property);
  } catch (error) {
    console.error(`[/api/properties/${id}] Failed to fetch from onOffice:`, error);
    const fallback = mockProperties.find((p) => p.id === id);
    if (fallback) {
      return NextResponse.json(fallback);
    }
    return NextResponse.json(
      { error: 'Failed to fetch property' },
      { status: 500 },
    );
  }
}
