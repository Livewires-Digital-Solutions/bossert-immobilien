import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function NotFoundPage() {
  const t = useTranslations('NotFound');

  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[70vh] bg-[var(--navy)] text-center px-6 relative overflow-hidden">
      
      {/* Architectural Background Elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] bg-[var(--bronze)]/10 rounded-full blur-[150px] mix-blend-screen"></div>
        <div className="absolute bottom-0 -left-1/4 w-[600px] h-[600px] bg-[var(--bronze)]/5 rounded-full blur-[120px] mix-blend-screen"></div>
      </div>

      <div className="max-w-md mx-auto flex flex-col items-center relative z-10">
        
        <h1 className="font-display text-[var(--cream)] text-7xl md:text-8xl mb-2">
          {t('title')}
        </h1>
        
        <div className="w-8 h-px bg-[var(--bronze)] opacity-50 mb-6" />
        
        <h2 className="font-display text-[var(--bronze)] text-xl md:text-2xl mb-4">
          {t('subtitle')}
        </h2>
        
        <p className="font-body text-[rgba(254,252,246,0.5)] text-sm md:text-base mb-10 leading-relaxed">
          {t('description')}
        </p>
        
        <Link 
          href="/" 
          className="text-[0.65rem] tracking-[0.2em] text-[var(--cream)] uppercase font-body hover:text-[var(--bronze)] transition-colors relative after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:w-full after:h-px after:bg-[var(--bronze)] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left"
        >
          {t('returnHome')}
        </Link>
      </div>
    </div>
  );
}
