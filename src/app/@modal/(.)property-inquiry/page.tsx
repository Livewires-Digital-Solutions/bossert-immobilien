import { Suspense } from 'react';
import LeadModalShell from '@/components/forms/LeadModalShell';
import PropertyInquiryForm from '@/components/forms/PropertyInquiryForm';

export default function PropertyInquiryModal() {
  return (
    <LeadModalShell>
      <Suspense fallback={null}>
        <PropertyInquiryForm />
      </Suspense>
    </LeadModalShell>
  );
}
