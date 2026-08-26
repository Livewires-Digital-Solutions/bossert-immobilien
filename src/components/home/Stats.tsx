import { useTranslations } from 'next-intl';

export default function Stats() {
  const t = useTranslations('Stats');

  const stats = [
    { value: t('experienceValue'), label: t('experience') },
    { value: t('propertiesValue'), label: t('properties') },
    { value: t('clientsValue'), label: t('clients') },
    { value: t('volumeValue'), label: t('volume') },
  ];

  return (
    <section className="bg-[#FEFCF6] py-16 md:py-24 border-b border-[rgba(4,36,51,0.1)]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <span className="font-display text-4xl md:text-5xl lg:text-6xl text-[#042433] mb-2 md:mb-4 drop-shadow-sm">{stat.value}</span>
              <span className="font-body text-[0.65rem] md:text-xs tracking-[0.2em] font-bold text-[rgba(4,36,51,0.5)] uppercase">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
