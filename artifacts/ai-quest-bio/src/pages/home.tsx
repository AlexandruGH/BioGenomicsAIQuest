import { Link } from "wouter";
import { ArrowRight, Dna, Brain, Search, GitBranch, Database, Terminal, BookOpen, Users, Clock, Globe } from "lucide-react";

const stackItems = [
  { category: "Programming", items: ["Python", "Jupyter", "VSCode"] },
  { category: "Data & Automation", items: ["Pandas", "Requests", "BeautifulSoup", "Playwright"] },
  { category: "NLP / ML", items: ["scikit-learn", "spaCy", "SciSpaCy", "sentence-transformers", "transformers"] },
  { category: "Models", items: ["DeBERTa", "BioClinicalModernBERT", "Qwen 0.6B", "MedGemma 1.5", "Ollama"] },
  { category: "Engineering", items: ["Pydantic", "Instructor", "FastAPI", "SQLite", "DuckDB"] },
  { category: "Biomedical", items: ["NCBI", "PubMed", "Cellosaurus", "MONDO Ontology"] },
];

const stats = [
  { icon: BookOpen, label: "Quests", value: "12" },
  { icon: Clock, label: "Per Session", value: "2–2.5h" },
  { icon: Globe, label: "Format", value: "Online" },
  { icon: Users, label: "Community", value: "Discord + GitHub" },
];

const pillars = [
  { icon: Terminal, title: "Python Applied", description: "Real scripting, debugging, data structures, file handling — no toy examples." },
  { icon: Search, title: "Biomedical NLP", description: "spaCy, SciSpaCy, transformers, embeddings, semantic retrieval — classical and modern." },
  { icon: Dna, title: "Genomics AI", description: "HGVS notation, mutation extraction, normalization, MONDO, Cellosaurus." },
  { icon: Brain, title: "LLM Orchestration", description: "Qwen, MedGemma via Ollama, Instructor, Pydantic — structured extraction at scale." },
  { icon: GitBranch, title: "Retrieval Systems", description: "TF-IDF, BM25, bi-encoders, cross-encoders, two-stage reranking pipelines." },
  { icon: Database, title: "Real Pipelines", description: "PubMed APIs, ingestion pipelines, knowledge graphs, biomedical copilots." },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden px-4 md:px-8 pt-20 pb-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(180_100%_40%_/_0.07)_0%,_transparent_60%)]" />
        <div className="container mx-auto max-w-5xl relative">
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-mono font-semibold tracking-widest uppercase">
              Summer Research Edition
            </span>
            <span className="text-muted-foreground text-xs font-mono">12 Weeks</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-mono leading-tight tracking-tight mb-6">
            <span className="text-foreground">AI Quest</span>
            <br />
            <span className="text-primary" style={{ textShadow: "0 0 40px hsl(180 100% 40% / 0.4)" }}>
              Bioinformatics
            </span>
            <br />
            <span className="text-foreground text-3xl md:text-4xl lg:text-5xl font-normal text-muted-foreground">
              & Biomedical NLP
            </span>
          </h1>

          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mb-10 leading-relaxed">
            Learn Python, scraping, browser automation, biomedical NLP and genomic AI by building real systems.
            Work with PubMed, biomedical transformers, semantic search, HGVS, MONDO, Cellosaurus, Ollama, MedGemma,
            DeBERTa, Playwright, and structured extraction pipelines.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/quests"
              data-testid="link-view-quests"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-mono font-semibold text-sm rounded hover:opacity-90 transition-opacity"
              style={{ boxShadow: "0 0 30px hsl(180 100% 40% / 0.3)" }}
            >
              View All 12 Quests
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/resources"
              data-testid="link-view-resources"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground font-mono font-semibold text-sm rounded hover:border-primary hover:text-primary transition-colors"
            >
              Setup Resources
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-card/40 px-4 md:px-8 py-8">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center md:items-start gap-1" data-testid={`stat-${stat.label.toLowerCase().replace(/\s/g, "-")}`}>
                <stat.icon className="h-4 w-4 text-primary mb-1" />
                <span className="text-2xl font-mono font-bold text-foreground">{stat.value}</span>
                <span className="text-xs text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recruitment message */}
      <section className="px-4 md:px-8 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="border border-primary/20 rounded-lg p-8 bg-primary/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <p className="font-mono text-sm text-primary mb-3 tracking-widest uppercase">Program Mission</p>
            <blockquote className="text-lg md:text-xl text-foreground leading-relaxed max-w-3xl">
              "Build mutation extraction engines, biomedical search systems, and AI research copilots.
              Online, 12 weeks, for students serious about AI, biotech, and research engineering."
            </blockquote>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="px-4 md:px-8 py-12 bg-muted/20">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-10">
            <p className="font-mono text-xs text-primary tracking-widest uppercase mb-2">Philosophy</p>
            <h2 className="text-2xl md:text-3xl font-bold font-mono">From scripting to research copilots</h2>
            <p className="text-muted-foreground mt-3 max-w-2xl">
              Participants start from Python practicality, automation, scraping, and browser control —
              then evolve gradually toward biomedical NLP, embeddings, retrieval systems, genomic AI,
              LLM orchestration, and research copilots.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pillars.map((p) => (
              <div key={p.title} data-testid={`card-pillar-${p.title.toLowerCase().replace(/\s/g, "-")}`}
                className="border border-border rounded-lg p-5 bg-card hover:border-primary/40 transition-colors">
                <p.icon className="h-5 w-5 text-primary mb-3" />
                <h3 className="font-mono font-semibold text-sm text-foreground mb-1">{p.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{p.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 border border-destructive/20 rounded bg-destructive/5">
            <p className="text-sm font-mono text-muted-foreground">
              <span className="text-destructive font-semibold">NOT:</span>{" "}
              shallow AI hype&nbsp;&nbsp;·&nbsp;&nbsp;prompt-only workflows&nbsp;&nbsp;·&nbsp;&nbsp;passive lectures
            </p>
          </div>
        </div>
      </section>

      {/* Stack */}
      <section className="px-4 md:px-8 py-20">
        <div className="container mx-auto max-w-5xl">
          <p className="font-mono text-xs text-primary tracking-widest uppercase mb-2">Core Stack</p>
          <h2 className="text-2xl md:text-3xl font-bold font-mono mb-10">Everything you'll work with</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stackItems.map((group) => (
              <div key={group.category} data-testid={`card-stack-${group.category.toLowerCase().replace(/\s|\//g, "-")}`}
                className="border border-border rounded-lg p-5 bg-card">
                <p className="text-xs font-mono text-primary uppercase tracking-widest mb-3">{group.category}</p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="px-2 py-0.5 text-xs font-mono rounded border border-border text-muted-foreground bg-muted/30">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 md:px-8 py-16 border-t border-border">
        <div className="container mx-auto max-w-5xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold font-mono mb-4">Ready to start the quest?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Explore the full 12-quest curriculum, set up your environment, and find your final project direction.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/quests" data-testid="link-quests-cta"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-mono font-semibold text-sm rounded hover:opacity-90 transition-opacity"
              style={{ boxShadow: "0 0 20px hsl(180 100% 40% / 0.25)" }}>
              Browse Quests <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/final-projects" data-testid="link-final-projects-cta"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground font-mono font-semibold text-sm rounded hover:border-primary hover:text-primary transition-colors">
              Final Projects
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
