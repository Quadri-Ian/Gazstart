import Link from "next/link";

export default function NotFound() {
	return (
		<main className="min-h-screen bg-[#0a1620] px-6 py-32 text-white">
			<div className="mx-auto flex max-w-3xl flex-col gap-6">
				<p className="text-sm uppercase tracking-[0.3em] text-[#8fb7d8]">404</p>
				<h1 className="text-4xl font-semibold sm:text-5xl">Page not found</h1>
				<p className="max-w-2xl text-base leading-7 text-[#c4d7e6] sm:text-lg">
					The requested page is unavailable or has moved to a different route during the
					migration.
				</p>
				<div>
					<Link
						href="/"
						className="inline-flex items-center rounded-full border border-white/20 px-5 py-3 text-sm font-medium transition hover:border-white/40 hover:bg-white/10"
					>
						Return home
					</Link>
				</div>
			</div>
		</main>
	);
}