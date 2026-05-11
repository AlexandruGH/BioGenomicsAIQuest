import { useState } from "react";
import { ChevronDown, ChevronUp, Terminal, Globe, Database, Layers, Search, GitMerge, Bot, Dna, Network, FlaskConical, Cpu, Trophy } from "lucide-react";

interface Quest {
  number: number;
  theme: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  focus: string[];
  models?: string[];
  resources?: string[];
  build: string;
  buildDetails: string;
  bonus?: string;
}

const quests: Quest[] = [
  {
    number: 1,
    theme: "Python as a research tool",
    title: "Python Foundations for AI & Bioinformatics",
    icon: Terminal,
    focus: ["Variables & loops", "Functions & lists/dicts", "File handling", "APIs basics", "Debugging in notebooks"],
    build: "Mini CLI Biomedical Helper",
    buildDetails: "Load text files, parse biological sequences, detect simple mutations via string matching. First working command-line tool.",
  },
  {
    number: 2,
    theme: "The web as a biomedical dataset",
    title: "Web Scraping & Browser Automation",
    icon: Globe,
    focus: ["requests library", "BeautifulSoup HTML parsing", "CSS selectors & XPath", "Playwright basics", "Handling pagination"],
    build: "Mini Biomedical Scraping Bot",
    buildDetails: "Search biomedical articles, extract titles, metadata, and links. Store results in structured JSON/CSV.",
    bonus: "Playwright: automated browsing, screenshots, interaction automation (clicking forms, logging in).",
  },
  {
    number: 3,
    theme: "Research papers as structured data",
    title: "Biomedical Research Data Pipelines",
    icon: Database,
    resources: ["PubMed E-utilities API"],
    focus: ["PubMed API (E-utilities)", "XML/JSON parsing", "Local dataset management", "Metadata pipelines", "TF-IDF basics", "BM25 ranking"],
    build: "Paper Ingestion Pipeline",
    buildDetails: "query → retrieve → clean → store. Full pipeline: query PubMed API, parse XML, clean abstracts, store with metadata in SQLite.",
  },
  {
    number: 4,
    theme: "Before LLMs",
    title: "Biomedical NLP Foundations",
    icon: Layers,
    models: ["spaCy", "SciSpaCy (en_core_sci_sm, en_ner_bc5cdr_md)"],
    focus: ["Tokenization & stemming", "Lemmatization", "Named Entity Recognition (NER)", "Dependency parsing", "Biomedical pipelines"],
    build: "Biomedical Entity Detector",
    buildDetails: "Detect diseases, genes, treatments, and mutations in raw biomedical text using SciSpaCy models. Annotate spans with entity types.",
  },
  {
    number: 5,
    theme: "Semantic meaning in biomedical text",
    title: "Embeddings & Semantic Search",
    icon: Search,
    models: ["BioClinicalModernBERT", "Biomedical bi-encoders"],
    focus: ["Dense embeddings", "Vector similarity (cosine, dot product)", "Semantic retrieval", "Text chunking strategies", "FAISS / numpy indexing"],
    build: "Semantic Search Engine",
    buildDetails: "Search a corpus of PubMed papers by meaning, not keywords. Embed abstracts, query with natural language, return ranked results.",
  },
  {
    number: 6,
    theme: "Improving biomedical search quality",
    title: "Cross-Encoders & Retrieval Pipelines",
    icon: GitMerge,
    models: ["DeBERTa variants", "Biomedical cross-encoders"],
    focus: ["Two-stage retrieval", "Reranking with cross-encoders", "Relevance scoring", "Retrieval evaluation (nDCG, MRR)", "Recall vs precision tradeoffs"],
    build: "Two-Stage Retrieval System",
    buildDetails: "Stage 1: fast bi-encoder retrieval of top-K candidates. Stage 2: cross-encoder reranking for precision. Evaluate with standard IR metrics.",
  },
  {
    number: 7,
    theme: "LLMs as extraction systems",
    title: "Structured Extraction with Local LLMs",
    icon: Bot,
    models: ["Qwen 0.6B via Ollama", "MedGemma 1.5 via Ollama"],
    focus: ["Pydantic schema definition", "Instructor library", "Structured JSON extraction", "Hallucination control", "Output validation"],
    build: "Paper Structured Extractor",
    buildDetails: "Take a raw biomedical abstract and extract: disease name, mutation, treatment, evidence level — all as a validated Pydantic schema. Handle failed extractions gracefully.",
  },
  {
    number: 8,
    theme: "Understanding genomic variants",
    title: "HGVS & Mutation Intelligence",
    icon: Dna,
    focus: ["HGVS notation (c., p., g., r.)", "Mutation normalization", "Transcript notation", "Genomic coordinates", "Hybrid extraction (regex + NLP + ML)"],
    build: "Mutation Extraction Engine",
    buildDetails: "Detect HGVS variants in text using regex patterns, normalize them, link to gene symbols. Hybrid rule-based + ML-assisted approach.",
  },
  {
    number: 9,
    theme: "How biomedical systems organize knowledge",
    title: "Ontologies & Biomedical Knowledge Graphs",
    icon: Network,
    resources: ["MONDO Disease Ontology (OBO format)"],
    focus: ["OBO/OWL ontology parsing", "Entity linking", "Disease hierarchies", "Graph structures (NetworkX)", "Disease ↔ gene ↔ mutation ↔ treatment"],
    build: "Mini Biomedical Knowledge Graph",
    buildDetails: "Parse MONDO ontology, link extracted entities from previous quests, build a queryable graph: disease ↔ gene ↔ mutation ↔ treatment associations.",
  },
  {
    number: 10,
    theme: "Experimental biology datasets",
    title: "Cell Lines & Experimental Metadata",
    icon: FlaskConical,
    resources: ["Cellosaurus database"],
    focus: ["Cellosaurus data model", "Structured biological metadata", "Cancer cell line analysis", "Tissue origin mapping", "Mutation association queries"],
    build: "Cell Line Search & Analysis Explorer",
    buildDetails: "Filter cell lines by tissue origin, disease, or mutation. Analyze metadata distributions. Generate mutation summaries per cell line category.",
  },
  {
    number: 11,
    theme: "AI systems assisting researchers",
    title: "Biomedical Research Agents",
    icon: Cpu,
    models: ["Ollama", "Qwen", "MedGemma"],
    focus: ["Agent orchestration", "Tool-calling patterns", "Retrieval augmented generation (RAG)", "Evidence aggregation", "Citation-aware outputs"],
    build: "Mini Biomedical Research Copilot",
    buildDetails: "Search PubMed papers, summarize findings, extract structured evidence. Local AI pipeline: retrieve → read → extract → answer. No cloud APIs required.",
  },
  {
    number: 12,
    theme: "Ship it",
    title: "Final Project Sprint & Demo Day",
    icon: Trophy,
    focus: ["Project polish", "Code review", "Documentation", "Demo preparation", "Peer review session"],
    build: "Biomedical Intelligence System",
    buildDetails: "Choose one of five directions and complete it to demo-ready state. Full system: working pipeline, documented code, structured outputs, live demo.",
  },
];

function QuestCard({ quest, isOpen, onToggle }: { quest: Quest; isOpen: boolean; onToggle: () => void }) {
  return (
    <div
      data-testid={`card-quest-${quest.number}`}
      className={`border rounded-lg overflow-hidden transition-colors ${isOpen ? "border-primary/40 bg-card" : "border-border bg-card/50 hover:border-border/80"}`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-start gap-4 p-5 text-left"
        data-testid={`button-quest-toggle-${quest.number}`}
      >
        <div className="flex-shrink-0 w-10 h-10 rounded border border-primary/30 bg-primary/10 flex items-center justify-center">
          <span className="text-xs font-mono text-primary font-bold">{String(quest.number).padStart(2, "0")}</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-mono text-muted-foreground mb-0.5">"{quest.theme}"</p>
          <h3 className="font-mono font-semibold text-sm text-foreground">{quest.title}</h3>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <quest.icon className="h-4 w-4 text-primary" />
          {isOpen ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
        </div>
      </button>

      {isOpen && (
        <div className="px-5 pb-6 border-t border-border/50 pt-5 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-xs font-mono text-primary uppercase tracking-widest mb-2">Focus Areas</p>
            <ul className="flex flex-col gap-1">
              {quest.focus.map((f) => (
                <li key={f} className="text-xs text-muted-foreground flex items-start gap-1.5">
                  <span className="text-primary mt-0.5">·</span> {f}
                </li>
              ))}
            </ul>
          </div>

          <div>
            {quest.models && (
              <div className="mb-4">
                <p className="text-xs font-mono text-primary uppercase tracking-widest mb-2">Models</p>
                <ul className="flex flex-col gap-1">
                  {quest.models.map((m) => (
                    <li key={m} className="text-xs font-mono text-muted-foreground bg-muted/30 rounded px-2 py-0.5 border border-border w-fit">{m}</li>
                  ))}
                </ul>
              </div>
            )}
            {quest.resources && (
              <div>
                <p className="text-xs font-mono text-primary uppercase tracking-widest mb-2">Resources</p>
                <ul className="flex flex-col gap-1">
                  {quest.resources.map((r) => (
                    <li key={r} className="text-xs text-muted-foreground">{r}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div>
            <p className="text-xs font-mono text-primary uppercase tracking-widest mb-2">Build Project</p>
            <p className="text-sm font-mono font-semibold text-foreground mb-2">{quest.build}</p>
            <p className="text-xs text-muted-foreground leading-relaxed">{quest.buildDetails}</p>
            {quest.bonus && (
              <div className="mt-3 p-2 rounded border border-primary/20 bg-primary/5">
                <p className="text-xs font-mono text-primary">Bonus: {quest.bonus}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Quests() {
  const [openQuest, setOpenQuest] = useState<number | null>(1);

  return (
    <div className="flex flex-col">
      <section className="px-4 md:px-8 pt-16 pb-12 border-b border-border">
        <div className="container mx-auto max-w-5xl">
          <p className="font-mono text-xs text-primary tracking-widest uppercase mb-2">12-Week Curriculum</p>
          <h1 className="text-3xl md:text-4xl font-bold font-mono mb-4">All 12 Quests</h1>
          <p className="text-muted-foreground max-w-2xl">
            Each quest builds on the previous. Click to expand details — focus areas, models used, and the build project deliverable.
          </p>
        </div>
      </section>

      <section className="px-4 md:px-8 py-12">
        <div className="container mx-auto max-w-5xl">
          {/* Progress bar */}
          <div className="flex gap-1 mb-10">
            {quests.map((q) => (
              <div
                key={q.number}
                onClick={() => setOpenQuest(openQuest === q.number ? null : q.number)}
                data-testid={`progress-dot-${q.number}`}
                title={`Quest ${q.number}`}
                className={`h-1.5 flex-1 rounded-full cursor-pointer transition-colors ${
                  openQuest === q.number ? "bg-primary" : "bg-border hover:bg-muted-foreground"
                }`}
              />
            ))}
          </div>

          <div className="flex flex-col gap-3">
            {quests.map((quest) => (
              <QuestCard
                key={quest.number}
                quest={quest}
                isOpen={openQuest === quest.number}
                onToggle={() => setOpenQuest(openQuest === quest.number ? null : quest.number)}
              />
            ))}
          </div>

          <div className="mt-10 p-5 border border-border rounded-lg bg-card/40">
            <p className="text-xs font-mono text-muted-foreground">
              <span className="text-primary">Note:</span> Quests are cumulative. Quest 12 builds the final project using skills from all previous quests. Choose your final project direction at the start of Quest 10.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
