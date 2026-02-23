import Link from "next/link";

interface PageScaffoldProps {
  title: string;
  description: string;
  apiMappings: string[];
  nextLinks?: Array<{ href: string; label: string }>;
}

export default function PageScaffold({
  title,
  description,
  apiMappings,
  nextLinks = [],
}: PageScaffoldProps) {
  return (
    <div className="w-full p-6">
      <div className="mx-auto w-full max-w-5xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
        <p className="mt-2 text-sm text-slate-600">{description}</p>

        <div className="mt-6 rounded-lg bg-slate-50 p-4">
          <p className="mb-2 text-sm font-semibold text-slate-800">Backend Mapping (expected)</p>
          <ul className="space-y-1 text-sm text-slate-700">
            {apiMappings.map((line) => (
              <li key={line}>- {line}</li>
            ))}
          </ul>
        </div>

        {nextLinks.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {nextLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
