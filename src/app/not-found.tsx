import Link from "next/link";
import { Instrument_Serif, Inter } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

// This is the root not-found for URLs that don't match any locale
export default function NotFound() {
  return (
    <html lang="en" className={`${instrumentSerif.className} ${inter.className}`} suppressHydrationWarning>
      <body className={`min-h-screen flex flex-col items-center justify-center bg-[#042433] text-center px-6 m-0 relative overflow-hidden ${inter.className}`} suppressHydrationWarning>
        
        {/* Architectural Background Elements */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
          <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] bg-[#AF8C53] rounded-full blur-[150px] mix-blend-screen opacity-10"></div>
          <div className="absolute bottom-0 -left-1/4 w-[600px] h-[600px] bg-[#AF8C53] rounded-full blur-[120px] mix-blend-screen opacity-5"></div>
        </div>

        <div className="max-w-md mx-auto flex flex-col items-center relative z-10">
          
          <h1 className={`text-[#FEFCF6] text-7xl md:text-8xl mb-2 ${instrumentSerif.className}`}>
            404
          </h1>
          
          <div className="w-8 h-px bg-[#AF8C53] opacity-50 mb-6" />
          
          <h2 className={`text-[#AF8C53] text-xl md:text-2xl mb-4 ${instrumentSerif.className}`}>
            Page Not Found
          </h2>
          
          <p className="text-[rgba(254,252,246,0.5)] text-sm md:text-base mb-10 leading-relaxed">
            The page you are looking for does not exist or has been moved.
          </p>
          
          <Link 
            href="/" 
            className="text-[0.65rem] tracking-[0.2em] text-[#FEFCF6] uppercase hover:text-[#AF8C53] transition-colors relative after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:w-full after:h-px after:bg-[#AF8C53] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left"
          >
            Return to Home
          </Link>
        </div>
      </body>
    </html>
  );
}
