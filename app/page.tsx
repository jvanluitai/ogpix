"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

const TEMPLATES = ["blog", "product", "social", "minimal", "gradient", "changelog", "docs", "tweet", "profile", "event", "podcast", "pricing", "newsletter", "comparison", "announcement"] as const;
type Template = (typeof TEMPLATES)[number];

function getCodeExamples(template: Template, title: string, description: string, theme: 'light' | 'dark', brand_color: string) {
  return {
    curl: `curl -X POST https://ogpix-mu.vercel.app/api/generate \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "template": "${template}",
    "title": "${title}",
    "description": "${description}",
    "theme": "${theme}",
    "brand_color": "${brand_color}"
  }' --output image.png`,

    javascript: `const response = await fetch('https://ogpix-mu.vercel.app/api/generate', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    template: '${template}',
    title: '${title}',
    description: '${description}',
    theme: '${theme}',
    brand_color: '${brand_color}',
  }),
});

const blob = await response.blob();
const url = URL.createObjectURL(blob);`,

    python: `import requests

response = requests.post(
    'https://ogpix-mu.vercel.app/api/generate',
    headers={'Authorization': 'Bearer YOUR_API_KEY'},
    json={
        'template': '${template}',
        'title': '${title}',
        'description': '${description}',
        'theme': '${theme}',
        'brand_color': '${brand_color}',
    }
)

with open('image.png', 'wb') as f:
    f.write(response.content)`,
  };
}

function HomeContent() {
  const [demoTitle, setDemoTitle] = useState("My Amazing Article");
  const [demoDesc, setDemoDesc] = useState("The future of social sharing starts here");
  const [demoTemplate, setDemoTemplate] = useState<Template>("blog");
  const [demoTheme, setDemoTheme] = useState<'light' | 'dark'>('dark');
  const [demoBrandColor, setDemoBrandColor] = useState('#6366f1');
  const [codeTab, setCodeTab] = useState<"curl" | "javascript" | "python">("curl");
  const [email, setEmail] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [keyLoading, setKeyLoading] = useState(false);
  const [keyError, setKeyError] = useState("");

  const searchParams = useSearchParams();

  useEffect(() => {
    const templateParam = searchParams.get('template');
    if (templateParam && TEMPLATES.includes(templateParam as Template)) {
      setDemoTemplate(templateParam as Template);
      setTimeout(() => {
        document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [searchParams]);

  const previewUrl =
    `/api/generate?template=${demoTemplate}` +
    `&title=${encodeURIComponent(demoTitle)}` +
    `&description=${encodeURIComponent(demoDesc)}` +
    `&theme=${demoTheme}&brand_color=${encodeURIComponent(demoBrandColor)}&demo=1`;

  const codeExamples = getCodeExamples(demoTemplate, demoTitle, demoDesc, demoTheme, demoBrandColor);

  async function handleGetKey(e: React.FormEvent) {
    e.preventDefault();
    setKeyLoading(true);
    setKeyError("");
    try {
      const res = await fetch("/api/keys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create key");
      setApiKey(data.api_key);
    } catch (err: unknown) {
      setKeyError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setKeyLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="1" y="1" width="6" height="4" rx="1" fill="white" />
                <rect x="9" y="1" width="6" height="4" rx="1" fill="white" opacity="0.6" />
                <rect x="1" y="7" width="14" height="2" rx="1" fill="white" opacity="0.4" />
                <rect x="1" y="11" width="10" height="2" rx="1" fill="white" opacity="0.3" />
              </svg>
            </div>
            <span className="text-lg font-semibold tracking-tight">OGPix</span>
          </div>
          <div className="hidden items-center gap-8 text-sm text-white/60 sm:flex">
            <a href="#demo" className="transition-colors hover:text-white">Demo</a>
            <a href="#pricing" className="transition-colors hover:text-white">Pricing</a>
            <a href="/templates" className="transition-colors hover:text-white">Templates</a>
          </div>
          <a
            href="#get-key"
            className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium transition-colors hover:bg-indigo-400"
          >
            Get API Key
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-20">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-[600px] w-[600px] rounded-full bg-indigo-500/10 blur-[120px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-sm text-indigo-300">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
            15 templates · REST API · PNG output
          </div>

          <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
            Dynamic OG images
            <br />
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              via API. One request.
            </span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg text-white/50 sm:text-xl">
            Generate beautiful social share images on-the-fly. Pass your title, description, and
            template — get back a production-ready PNG. No design tools required.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="#get-key"
              className="w-full rounded-xl bg-indigo-500 px-8 py-3.5 text-base font-semibold transition-colors hover:bg-indigo-400 sm:w-auto"
            >
              Get free API key
            </a>
            <a
              href="#demo"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-8 py-3.5 text-base font-semibold transition-colors hover:bg-white/10 sm:w-auto"
            >
              Try live demo
            </a>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 border-t border-white/5 pt-12">
            {[
              { label: "Templates", value: "15" },
              { label: "Free images/mo", value: "50" },
              { label: "Avg response", value: "<200ms" },
            ].map(({ label, value }) => (
              <div key={label} className="text-center">
                <div className="text-2xl font-bold text-indigo-400 sm:text-3xl">{value}</div>
                <div className="mt-1 text-sm text-white/40">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Demo */}
      <section id="demo" className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Try it live</h2>
          <p className="text-white/50">Edit the fields below and see your OG image update in real time.</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Controls */}
          <div className="space-y-6 rounded-2xl border border-white/5 bg-white/[0.03] p-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-white/60">Template</label>
              <div className="flex flex-wrap gap-2">
                {TEMPLATES.map((t) => (
                  <button
                    key={t}
                    onClick={() => setDemoTemplate(t)}
                    className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors capitalize ${
                      demoTemplate === t
                        ? "bg-indigo-500 text-white"
                        : "border border-white/10 bg-white/5 text-white/60 hover:bg-white/10"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white/60">Theme</label>
              <div className="flex gap-2">
                {(["light", "dark"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setDemoTheme(t)}
                    className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors capitalize ${
                      demoTheme === t
                        ? "bg-indigo-500 text-white"
                        : "border border-white/10 bg-white/5 text-white/60 hover:bg-white/10"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white/60">Brand Color</label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={demoBrandColor}
                  onChange={(e) => setDemoBrandColor(e.target.value)}
                  className="h-10 w-10 cursor-pointer rounded-lg border border-white/10 bg-transparent"
                />
                <span className="font-mono text-sm text-white/60">{demoBrandColor}</span>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white/60">Title</label>
              <input
                type="text"
                value={demoTitle}
                onChange={(e) => setDemoTitle(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-indigo-500/50"
                placeholder="Enter a title..."
                maxLength={80}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white/60">Description</label>
              <textarea
                value={demoDesc}
                onChange={(e) => setDemoDesc(e.target.value)}
                rows={3}
                className="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-indigo-500/50"
                placeholder="Optional description..."
                maxLength={160}
              />
            </div>

            <div className="rounded-lg border border-white/5 bg-black/30 p-3 font-mono text-xs text-white/40 break-all">
              GET /api/generate?template={demoTemplate}&title={encodeURIComponent(demoTitle)}&description={encodeURIComponent(demoDesc)}&theme={demoTheme}&brand_color={encodeURIComponent(demoBrandColor)}&demo=1
            </div>
          </div>

          {/* Preview */}
          <div className="flex flex-col gap-4">
            <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.03]">
              {/* 1200x630 aspect ratio container */}
              <div className="relative w-full" style={{ paddingBottom: "52.5%" }}>
                <img
                  key={previewUrl}
                  src={previewUrl}
                  alt="OG image preview"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </div>
            <p className="text-center text-xs text-white/30">1200 × 630px · PNG · Ready for &lt;meta og:image&gt;</p>
          </div>
        </div>
      </section>

      {/* Code Examples */}
      <section id="docs" className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Simple integration</h2>
          <p className="text-white/50">Works with any language or framework. One HTTP request is all you need.</p>
        </div>

        <div className="rounded-2xl border border-white/5 bg-white/[0.03] overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-white/5">
            {(["curl", "javascript", "python"] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setCodeTab(lang)}
                className={`px-6 py-3 text-sm font-medium transition-colors capitalize ${
                  codeTab === lang
                    ? "border-b-2 border-indigo-500 text-white"
                    : "text-white/40 hover:text-white/70"
                }`}
              >
                {lang === "javascript" ? "JavaScript" : lang === "curl" ? "cURL" : "Python"}
              </button>
            ))}
          </div>

          {/* Code */}
          <div className="relative p-6">
            <button
              onClick={() => navigator.clipboard.writeText(codeExamples[codeTab])}
              className="absolute right-4 top-4 rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/50 transition-colors hover:text-white"
            >
              Copy
            </button>
            <pre className="overflow-x-auto font-mono text-sm leading-relaxed text-white/80">
              <code>{codeExamples[codeTab]}</code>
            </pre>
          </div>
        </div>

        {/* Meta tag usage */}
        <div className="mt-8 rounded-2xl border border-white/5 bg-white/[0.03] p-6">
          <h3 className="mb-3 text-sm font-medium text-white/60">Use directly in your HTML</h3>
          <pre className="overflow-x-auto font-mono text-sm text-white/80">
            <code>{`<meta property="og:image" content="https://ogpix-mu.vercel.app/api/generate?template=${demoTemplate}&title=${encodeURIComponent(demoTitle)}&theme=${demoTheme}&brand_color=${encodeURIComponent(demoBrandColor)}&api_key=YOUR_KEY" />`}</code>
          </pre>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Simple pricing</h2>
          <p className="text-white/50">Start free. Scale as you grow. No hidden fees.</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {[
            {
              name: "Free",
              price: "$0",
              period: "forever",
              description: "Perfect for side projects and experimentation.",
              features: ["50 images / month", "All 15 templates", "PNG output", "REST API access"],
              cta: "Get started",
              href: "#get-key",
              highlight: false,
            },
            {
              name: "Starter",
              price: "$12",
              period: "per month",
              description: "For growing projects that need more volume.",
              features: ["2,000 images / month", "All 15 templates", "PNG output", "Priority support"],
              cta: "Start for $12/mo",
              href: "#get-key",
              highlight: true,
            },
            {
              name: "Pro",
              price: "$29",
              period: "per month",
              description: "For teams and high-traffic applications.",
              features: ["10,000 images / month", "All 15 templates", "PNG output", "SLA + priority support"],
              cta: "Go Pro",
              href: "#get-key",
              highlight: false,
            },
          ].map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl border p-8 ${
                plan.highlight
                  ? "border-indigo-500/50 bg-indigo-500/5"
                  : "border-white/5 bg-white/[0.03]"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-indigo-500 px-3 py-0.5 text-xs font-semibold">
                  Most popular
                </div>
              )}
              <div className="mb-6">
                <div className="mb-1 text-sm font-medium text-white/50">{plan.name}</div>
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="mb-1 text-sm text-white/40">/{plan.period}</span>
                </div>
                <p className="mt-3 text-sm text-white/40">{plan.description}</p>
              </div>

              <ul className="mb-8 flex-1 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-white/70">
                    <svg className="h-4 w-4 shrink-0 text-indigo-400" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8l3.5 3.5L13 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href={plan.href}
                className={`block rounded-xl py-3 text-center text-sm font-semibold transition-colors ${
                  plan.highlight
                    ? "bg-indigo-500 hover:bg-indigo-400"
                    : "border border-white/10 bg-white/5 hover:bg-white/10"
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Get API Key */}
      <section id="get-key" className="mx-auto max-w-6xl px-6 py-24">
        <div className="mx-auto max-w-md">
          <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-8">
            <h2 className="mb-2 text-2xl font-bold">Get your free API key</h2>
            <p className="mb-6 text-sm text-white/50">
              Enter your email and we'll instantly generate your key. No credit card required.
            </p>

            {!apiKey ? (
              <form onSubmit={handleGetKey} className="space-y-4">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-indigo-500/50"
                />
                {keyError && <p className="text-sm text-red-400">{keyError}</p>}
                <button
                  type="submit"
                  disabled={keyLoading}
                  className="w-full rounded-xl bg-indigo-500 py-3 text-sm font-semibold transition-colors hover:bg-indigo-400 disabled:opacity-50"
                >
                  {keyLoading ? "Generating..." : "Generate API key"}
                </button>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="rounded-lg border border-green-500/20 bg-green-500/5 p-4">
                  <p className="mb-2 text-sm text-green-400 font-medium">Your API key is ready!</p>
                  <p className="font-mono text-xs text-white/70 break-all">{apiKey}</p>
                </div>
                <button
                  onClick={() => navigator.clipboard.writeText(apiKey)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-medium transition-colors hover:bg-white/10"
                >
                  Copy to clipboard
                </button>
                <p className="text-center text-xs text-white/30">
                  Save this key — you won't see it again.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 px-6 py-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-indigo-500">
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                <rect x="1" y="1" width="6" height="4" rx="1" fill="white" />
                <rect x="9" y="1" width="6" height="4" rx="1" fill="white" opacity="0.6" />
                <rect x="1" y="7" width="14" height="2" rx="1" fill="white" opacity="0.4" />
                <rect x="1" y="11" width="10" height="2" rx="1" fill="white" opacity="0.3" />
              </svg>
            </div>
            <span className="text-sm font-semibold">OGPix</span>
          </div>
          <p className="text-sm text-white/30">
            Dynamic OG image generation API. Built with Next.js + @vercel/og.
          </p>
          <p className="text-sm text-white/30">© 2026 OGPix</p>
        </div>
      </footer>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense>
      <HomeContent />
    </Suspense>
  );
}
