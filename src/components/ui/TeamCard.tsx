import Image from "next/image";
import { Link } from "@/i18n/routing";
import { TeamMember } from "@/config";
import { useTranslations } from "next-intl";

export default function TeamCard({ member, index = 0 }: { member: TeamMember; index?: number }) {
  const t = useTranslations("CTA");
  return (
    <Link
      href={`/about/team/${member.slug}`}
      className={`reveal stagger-${Math.min(index + 1, 6)} flex flex-col items-center text-center group cursor-pointer transform transition-all duration-700 ease-out-expo hover:-translate-y-1`}
    >
      <div className="relative w-48 h-48 rounded-full overflow-hidden mb-6 shadow-sm group-hover:shadow-[0_12px_24px_rgba(4,36,51,0.12)] border-4 border-transparent group-hover:border-[var(--bronze)] transition-all duration-500 ease-out">
        <Image src={member.image} alt={member.name} fill className="object-cover" sizes="192px" />
      </div>
      <h3 className="font-display text-2xl text-[var(--navy)] mb-1 group-hover:text-[var(--bronze)] transition-colors">
        {member.name}
      </h3>
      <p className="font-body text-[var(--bronze)] text-sm tracking-[0.1em] uppercase mb-4">{member.role}</p>
      <span className="cta-btn cta-btn-ghost text-[0.65rem] !px-4 !py-2">
        {t('viewProfile')}
        <span className="cta-btn-icon !w-6 !h-6" aria-hidden="true">
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <line x1="2" y1="6" x2="10" y2="6" /><polyline points="6.5,2.5 10,6 6.5,9.5" />
          </svg>
        </span>
      </span>
    </Link>
  );
}
