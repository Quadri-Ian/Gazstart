"use client";

type ScrollToSectionButtonProps = {
  targetId: string;
  className?: string;
  ariaLabel?: string;
  children: React.ReactNode;
};

export default function ScrollToSectionButton({
  targetId,
  className,
  ariaLabel,
  children,
}: ScrollToSectionButtonProps) {
  const handleClick = () => {
    const target = document.getElementById(targetId);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <button type="button" className={className} aria-label={ariaLabel} onClick={handleClick}>
      {children}
    </button>
  );
}
