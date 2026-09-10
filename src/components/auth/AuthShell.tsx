import React from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';

interface AuthShellProps {
  eyebrow?: string;
  title: React.ReactNode;
  titleSerif?: React.ReactNode;
  text?: string;
  children: React.ReactNode;
}

/**
 * Framed editorial shell for the standalone auth pages
 * (login / signup / forgot-password / reset-password).
 * Mirrors the homepage CTA section: bordered inner card with corner accents,
 * a brand column on the left and the form on the right.
 */
export default function AuthShell({
  eyebrow = 'Member Access',
  title,
  titleSerif,
  text,
  children,
}: AuthShellProps) {
  return (
    <main style={{ backgroundColor: '#f0ede8' }}>
      <Navbar />

      <div className="auth-page">
        <div className="auth-card">
          <div className="auth-brand-col">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="Bossert Immobilien" className="auth-brand-logo" />

            <div className="auth-eyebrow">
              <span className="dot" />
              {eyebrow}
            </div>

            <h1 className="auth-brand-headline">
              {title}
              {titleSerif && (
                <>
                  <br />
                  <span className="italic-serif">{titleSerif}</span>
                </>
              )}
            </h1>

            {text && <p className="auth-brand-text">{text}</p>}

            <p className="auth-brand-note">
              Opernplatz 14, Suite 200 · 60313 Frankfurt
              <br />
              Discretion and precision in every transaction.
            </p>
          </div>

          <div className="auth-col-divider" aria-hidden="true" />

          <div className="auth-form-col">{children}</div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
