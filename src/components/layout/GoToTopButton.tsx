"use client";

export default function GoToTopButton() {
  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e8ecf0] text-[#394854] transition-all hover:bg-[#d0d8e0] hover:scale-110 active:scale-95"
    >
      <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
        <path d="M1 5l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
