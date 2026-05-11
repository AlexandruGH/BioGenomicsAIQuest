import { Clock, MessageSquare, Github, BookOpen, Code, Hammer, Map, Users, CheckCircle, XCircle } from "lucide-react";

const sessionBlocks = [
  { icon: BookOpen, duration: "20–30 min", title: "Concepts", description: "Theoretical grounding, paper references, biomedical context — framed for engineering, not academic abstraction." },
  { icon: Code, duration: "45 min", title: "Live Coding", description: "Instructor codes live with the group. Real bugs, real fixes. No prepared perfect demos." },
  { icon: Hammer, duration: "45–60 min", title: "Hands-on Build", description: "Participants implement their own version. The actual quest deliverable." },
  { icon: Map, duration: "15 min", title: "Quest Planning", description: "Preview next quest, assign takeaways, GitHub commit checkpoint." },
];

const stackCategories = [
  {
    label: "Programming",
    items: [
      { name: "Python", note: "Primary language throughout the program" },
      { name: "Jupyter Notebooks", note: "Interactive development + presentation" },
      { name: "VSCode", note: "IDE with Python + Jupyter extensions" },
    ],
  },
  {
    label: "Data & Automation",
    items: [
      { name: "Pandas", note: "Data manipulation and analysis" },
      { name: "Requests", note: "HTTP client for APIs and scraping" },
      { name: "BeautifulSoup", note: "HTML parsing and extraction" },
      { name: "Playwright", note: "Browser automation and interaction" },
    ],
  },
  {
    label: "NLP / ML",
    items: [
      { name: "scikit-learn", note: "Classical ML: TF-IDF, classifiers, evaluation" },
      { name: "spaCy + SciSpaCy", note: "NLP pipeline, NER, dependency parsing" },
      { name: "sentence-transformers", note: "Bi-encoders for semantic search" },
      { name: "transformers (HuggingFace)", note: "Fine-tuned biomedical models" },
    ],
  },
  {
    label: "Models",
    items: [
      { name: "DeBERTa variants", note: "Cross-encoders for reranking" },
      { name: "BioClinicalModernBERT", note: "Biomedical bi-encoder embeddings" },
      { name: "Biomedical cross-encoders", note: "Reranking pipeline stage 2" },
      { name: "Qwen 0.6B via Ollama", note: "Small local LLM for extraction" },
      { name: "MedGemma 1.5", note: "Medical LLM — structured extraction, copilot" },
    ],
  },
  {
    label: "Engineering",
    items: [
      { name: "Pydantic", note: "Data validation and schema definition" },
      { name: "Instructor", note: "Structured LLM output extraction" },
      { name: "FastAPI", note: "Light intro for serving models/APIs" },
      { name: "SQLite / DuckDB", note: "Local databases for biomedical data" },
    ],
  },
  {
    label: "Biomedical Resources",
    items: [
      { name: "NCBI", note: "National Center for Biotechnology Information" },
      { name: "PubMed", note: "35M+ biomedical citation database with free API" },
      { name: "Cellosaurus", note: "Cancer cell line metadata database" },
      { name: "MONDO Disease Ontology", note: "Unified disease hierarchy and linking" },
    ],
  },
];

const communityItems = [
  { icon: MessageSquare, title: "Discord", description: "Daily async help, quest discussion channels, model sharing." },
  { icon: Github, title: "GitHub Organization", description: "Shared repos, quest starter code, datasets, review PRs." },
  { icon: BookOpen, title: "Shared Datasets", description: "Pre-curated biomedical datasets ready for immediate use." },
  { icon: Users, title: "Collaborative Repos", description: "Build on top of each other's work. Cumulative quests." },
];

const dos = [
  "Classical NLP — understanding retrieval, tokenization, parsing",
  "Biomedical curation — understanding what the data means",
  "Structured thinking — schema-first, contract-first",
  "Practical engineering — pipelines that actually run",
  "Reading papers — not just using them as datasets",
];

const donts = [
  "Shallow AI hype — no buzzword-only sessions",
  "Prompt-only workflows — LLMs are one tool, not the only tool",
  "Passive lectures — every session has deliverables",
  "Tutorial-copying — quests require original thinking",
  "Isolated exercises — everything builds toward the final project",
];

export default function Program() {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="px-4 md:px-8 pt-16 pb-12 border-b border-border">
        <div className="container mx-auto max-w-5xl">
          <p className="font-mono text-xs text-primary tracking-widest uppercase mb-2">Program Overview</p>
          <h1 className="text-3xl md:text-4xl font-bold font-mono mb-4">
            How the program works
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            12 weeks, one online session per week, 2–2.5 hours each. All work happens collaboratively via Discord and GitHub between sessions. Quests are cumulative — each one builds on the last.
          </p>
        </div>
      </section>

      {/* Format */}
      <section className="px-4 md:px-8 py-16">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {[
              { value: "12", label: "Weeks" },
              { value: "1", label: "Session / Week" },
              { value: "2–2.5h", label: "Per Session" },
              { value: "Online", label: "Format" },
            ].map((s) => (
              <div key={s.label} data-testid={`stat-format-${s.label.toLowerCase().replace(/\s|\//g, "-")}`}
                className="border border-border rounded-lg p-5 bg-card text-center">
                <div className="text-2xl font-mono font-bold text-primary mb-1">{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Session Structure */}
          <p className="font-mono text-xs text-primary tracking-widest uppercase mb-2">Session Structure</p>
          <h2 className="text-2xl font-bold font-mono mb-8">Every session follows this format</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
            {sessionBlocks.map((block, i) => (
              <div key={block.title} data-testid={`card-session-${block.title.toLowerCase().replace(/\s/g, "-")}`}
                className="border border-border rounded-lg p-6 bg-card hover:border-primary/30 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded border border-primary/30 bg-primary/10 flex items-center justify-center">
                    <span className="text-xs font-mono text-primary font-bold">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-mono font-semibold text-sm text-foreground">{block.title}</h3>
                      <span className="text-xs text-muted-foreground font-mono">{block.duration}</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{block.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Core Stack */}
          <p className="font-mono text-xs text-primary tracking-widest uppercase mb-2">Core Stack</p>
          <h2 className="text-2xl font-bold font-mono mb-8">Tools and technologies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {stackCategories.map((cat) => (
              <div key={cat.label} data-testid={`card-stack-${cat.label.toLowerCase().replace(/\s/g, "-")}`}
                className="border border-border rounded-lg p-5 bg-card">
                <p className="text-xs font-mono text-primary uppercase tracking-widest mb-4">{cat.label}</p>
                <div className="flex flex-col gap-2">
                  {cat.items.map((item) => (
                    <div key={item.name} className="flex items-start gap-3">
                      <span className="font-mono text-sm text-foreground min-w-0 shrink-0">{item.name}</span>
                      <span className="text-xs text-muted-foreground leading-relaxed">— {item.note}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Community */}
          <p className="font-mono text-xs text-primary tracking-widest uppercase mb-2">Community</p>
          <h2 className="text-2xl font-bold font-mono mb-8">Infrastructure between sessions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
            {communityItems.map((item) => (
              <div key={item.title} data-testid={`card-community-${item.title.toLowerCase()}`}
                className="border border-border rounded-lg p-5 bg-card flex items-start gap-4">
                <item.icon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-mono font-semibold text-sm text-foreground mb-1">{item.title}</h3>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Do / Don't */}
          <p className="font-mono text-xs text-primary tracking-widest uppercase mb-2">Educational Direction</p>
          <h2 className="text-2xl font-bold font-mono mb-8">What we value</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-primary/20 rounded-lg p-6 bg-primary/5">
              <p className="text-xs font-mono text-primary uppercase tracking-widest mb-4">Strong emphasis on</p>
              <ul className="flex flex-col gap-3">
                {dos.map((d) => (
                  <li key={d} className="flex items-start gap-2 text-sm text-foreground">
                    <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border border-destructive/20 rounded-lg p-6 bg-destructive/5">
              <p className="text-xs font-mono text-destructive uppercase tracking-widest mb-4">NOT this</p>
              <ul className="flex flex-col gap-3">
                {donts.map((d) => (
                  <li key={d} className="flex items-start gap-2 text-sm text-foreground">
                    <XCircle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
