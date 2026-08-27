export function TextField({
  label,
  type = "text",
  placeholder,
  name,
  rows,
}: {
  label: string;
  type?: string;
  placeholder?: string;
  name?: string;
  rows?: number;
}) {
  if (rows) {
    return (
      <div className="flex flex-col relative group">
        <label className="text-[0.65rem] tracking-[0.1em] uppercase text-gray-500 mb-2 group-focus-within:text-[var(--navy)] transition-colors duration-500 ease-out-circ">{label}</label>
        <div className="relative">
          <textarea
            name={name}
            rows={rows}
            className="border-b border-gray-300 py-2 bg-transparent outline-none w-full text-sm resize-none"
            placeholder={placeholder}
          />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-[var(--bronze)] group-focus-within:w-full transition-all duration-700 ease-out-expo" />
        </div>
      </div>
    );
  }
    return (
      <div className="flex flex-col relative group">
        <label className="text-[0.65rem] tracking-[0.1em] uppercase text-gray-500 mb-2 group-focus-within:text-[var(--navy)] transition-colors duration-500 ease-out-circ">{label}</label>
        <div className="relative">
          <input
            type={type}
            name={name}
            className="border-b border-gray-300 py-2 bg-transparent outline-none w-full text-sm"
            placeholder={placeholder}
          />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-[var(--bronze)] group-focus-within:w-full transition-all duration-700 ease-out-expo" />
        </div>
      </div>
    );
}

export function SelectField({
  label,
  name,
  options,
}: {
  label: string;
  name?: string;
  options: string[];
}) {
  return (
    <div className="flex flex-col relative group">
      <label className="text-[0.65rem] tracking-[0.1em] uppercase text-gray-500 mb-2 group-focus-within:text-[var(--navy)] transition-colors duration-500 ease-out-circ">{label}</label>
      <div className="relative">
        <select
          name={name}
          className="border-b border-gray-300 py-2 bg-transparent outline-none w-full text-sm text-gray-600 appearance-none"
        >
          {options.map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-[var(--bronze)] group-focus-within:w-full transition-all duration-700 ease-out-expo" />
      </div>
    </div>
  );
}

export function FormSubmitButton({ label, dark = true }: { label: string; dark?: boolean }) {
  return (
    <button
      type="button"
      className={`cta-btn w-full justify-center ${dark ? "!bg-[var(--navy)] !text-[var(--cream)]" : ""}`}
    >
      {label}
      <span className="cta-btn-icon !bg-[var(--cream)] !text-[var(--navy)] ml-2" aria-hidden="true">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <line x1="2" y1="6" x2="10" y2="6" />
          <polyline points="6.5,2.5 10,6 6.5,9.5" />
        </svg>
      </span>
    </button>
  );
}
