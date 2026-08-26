import Image from "next/image";
import Link from "next/link";
import { TeamMember } from "@/config";

export default function TeamCard({ member, index = 0 }: { member: TeamMember; index?: number }) {
  return (
    <Link
      href={`/about/team/${member.slug}`}
      className={`reveal stagger-${Math.min(index + 1, 6)} flex flex-col items-center text-center group cursor-pointer`}
    >
      <div className="relative w-48 h-48 rounded-full overflow-hidden mb-6 border-4 border-transparent group-hover:border-[var(--bronze)] transition-colors duration-300">
        <Image src={member.image} alt={member.name} fill className="object-cover" sizes="192px" />
      </div>
      <h3 className="font-display text-2xl text-[var(--navy)] mb-1 group-hover:text-[var(--bronze)] transition-colors">
        {member.name}
      </h3>
      <p className="font-body text-[var(--bronze)] text-sm tracking-[0.1em] uppercase">{member.role}</p>
    </Link>
  );
}
