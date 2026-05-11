import { Dna, Search, Network, Bot, FlaskConical, ChevronRight } from "lucide-react";
import { useState } from "react";

interface ProjectOption {
  letter: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  pipeline: string[];
  techStack: string[];
  keyFeatures: string[];
  difficulty: "Intermediate" | "Advanced" | "Expert";
  suggestedWeeks: string;
  requiredQuests: string[];
}

const projects: ProjectOption[] = [
  {
    letter: "A",
    title: "Mutation Intelligence Pipeline",
    subtitle: "End-to-end genomic variant extraction and normalization",
    icon: Dna,
    description: "Build a complete pipeline that takes raw biomedical literature as input and produces a structured, queryable database of genomic variants. The system must detect mutations in text, normalize them to HGVS format, link them to gene symbols, and associate them with diseases.",
    pipeline: [
      "Paper ingestion from PubMed API",
      "Abstract preprocessing and chunking",
      "HGVS variant detection (regex + ML)",
      "Variant normalization to standard notation",
      "Gene symbol resolution and linking",
      "Disease entity extraction and linking",
      "Structured database storage (SQLite/DuckDB)",
      "Query interface for variant search",
    ],
    techStack: ["PubMed E-utilities", "SciSpaCy", "HGVS regex patterns", "Pydantic", "SQLite/DuckDB", "MedGemma via Ollama", "Instructor"],
    keyFeatures: ["Multi-format HGVS parsing (c., p., g., r.)", "Ambiguity resolution", "Evidence confidence scoring", "Export to structured JSON"],
    difficulty: "Advanced",
    suggestedWeeks: "Weeks 11–12 (2 weeks)",
    requiredQuests: ["Quest 3", "Quest 4", "Quest 7", "Quest 8"],
  },
  {
    letter: "B",
    title: "Biomedical Semantic Search Engine",
    subtitle: "Dense retrieval with two-stage reranking and evaluation",
    icon: Search,
    description: "Build a production-quality biomedical search engine that goes beyond keyword matching. Use bi-encoders for fast candidate retrieval, cross-encoders for precise reranking, and evaluate your system with standard IR metrics on biomedical benchmarks.",
    pipeline: [
      "Corpus construction from PubMed abstracts",
      "Text chunking and preprocessing",
      "Bi-encoder embedding (BioClinicalModernBERT)",
      "FAISS index construction",
      "Fast ANN retrieval (top-K candidates)",
      "Cross-encoder reranking (DeBERTa)",
      "Evaluation: nDCG@10, MRR, Recall@K",
      "Query interface with relevance scores",
    ],
    techStack: ["sentence-transformers", "BioClinicalModernBERT", "DeBERTa cross-encoder", "FAISS", "PubMed API", "scikit-learn"],
    keyFeatures: ["Sub-second retrieval on 100K+ documents", "nDCG evaluation suite", "Query expansion support", "Hybrid BM25 + dense fusion"],
    difficulty: "Advanced",
    suggestedWeeks: "Weeks 11–12 (2 weeks)",
    requiredQuests: ["Quest 3", "Quest 5", "Quest 6"],
  },
  {
    letter: "C",
    title: "Biomedical Knowledge Graph",
    subtitle: "Multi-source knowledge graph with disease-gene-mutation-treatment links",
    icon: Network,
    description: "Construct a queryable biomedical knowledge graph by integrating MONDO disease ontology, PubMed literature mining, mutation extraction, and treatment association. Build a graph database with meaningful relationships and a query interface.",
    pipeline: [
      "MONDO ontology parsing (OBO format)",
      "Disease hierarchy construction",
      "PubMed literature mining for associations",
      "Gene entity extraction and normalization",
      "Mutation extraction (from Quest 8)",
      "Treatment/drug entity extraction",
      "Relationship weighting by evidence",
      "NetworkX graph + query interface",
    ],
    techStack: ["pronto (OBO parsing)", "NetworkX", "SciSpaCy", "PubMed API", "MedGemma", "DuckDB"],
    keyFeatures: ["Disease hierarchy traversal", "Multi-hop relationship queries", "Evidence-weighted edges", "Graph export (JSON-LD, RDF)"],
    difficulty: "Expert",
    suggestedWeeks: "Weeks 11–12 (2 weeks)",
    requiredQuests: ["Quest 3", "Quest 4", "Quest 8", "Quest 9"],
  },
  {
    letter: "D",
    title: "Biomedical Research Copilot",
    subtitle: "Local AI assistant for literature search, summarization, and structured extraction",
    icon: Bot,
    description: "Build a local AI-powered research assistant that helps biomedical researchers find relevant papers, summarize evidence, extract structured information, and answer questions with citations — all running locally via Ollama, no cloud APIs required.",
    pipeline: [
      "PubMed query and paper ingestion",
      "Semantic chunking and embedding",
      "RAG retrieval pipeline",
      "MedGemma summarization",
      "Structured evidence extraction",
      "Citation-aware answer generation",
      "Conversation memory and context",
      "FastAPI interface (optional)",
    ],
    techStack: ["MedGemma 1.5 via Ollama", "Instructor + Pydantic", "sentence-transformers", "FAISS", "PubMed API", "FastAPI (optional)"],
    keyFeatures: ["Fully local — no API costs", "Citation-grounded answers", "Structured evidence schemas", "Hallucination mitigation via retrieval"],
    difficulty: "Expert",
    suggestedWeeks: "Weeks 11–12 (2 weeks)",
    requiredQuests: ["Quest 5", "Quest 6", "Quest 7", "Quest 11"],
  },
  {
    letter: "E",
    title: "Cell Line Intelligence Explorer",
    subtitle: "Interactive analysis platform for Cellosaurus metadata",
    icon: FlaskConical,
    description: "Build a comprehensive analysis and exploration platform for the Cellosaurus cell line database. Enable researchers to filter by tissue origin, disease associations, and mutations — with summaries, statistical analysis, and mutation profiles.",
    pipeline: [
      "Cellosaurus data download and parsing",
      "Metadata normalization and cleaning",
      "Disease association extraction",
      "Mutation profile construction",
      "Tissue origin taxonomy building",
      "Statistical analysis per category",
      "Filter and search interface",
      "Mutation summary generation (MedGemma)",
    ],
    techStack: ["Cellosaurus API", "Pandas", "DuckDB", "SciSpaCy", "MedGemma (optional)", "Pydantic", "FastAPI (optional)"],
    keyFeatures: ["Filter by tissue, disease, mutation", "Cross-reference with PubMed", "Cancer cell line clustering", "Exportable metadata reports"],
    difficulty: "Intermediate",
    suggestedWeeks: "Weeks 11–12 (2 weeks)",
    requiredQuests: ["Quest 3", "Quest 4", "Quest 10"],
  },
];

const difficultyColors: Record<string, string> = {
  Intermediate: "text-green-400 border-green-400/30 bg-green-400/10",
  Advanced: "text-yellow-400 border-yellow-400/30 bg-yellow-400/10",
  Expert: "text-primary border-primary/30 bg-primary/10",
};

export default function FinalProjects() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="flex flex-col">
      <section className="px-4 md:px-8 pt-16 pb-12 border-b border-border">
        <div className="container mx-auto max-w-5xl">
          <p className="font-mono text-xs text-primary tracking-widest uppercase mb-2">Quest 12</p>
          <h1 className="text-3xl md:text-4xl font-bold font-mono mb-4">Final Project Directions</h1>
          <p className="text-muted-foreground max-w-2xl">
            In the final sprint, participants build a complete Biomedical Intelligence System. Choose one direction — each is a substantial, demo-ready project.
          </p>
        </div>
      </section>

      <section className="px-4 md:px-8 py-12">
        <div className="container mx-auto max-w-5xl">
          {/* Option selector */}
          <div className="flex flex-wrap gap-3 mb-10">
            {projects.map((p) => (
              <button
                key={p.letter}
                onClick={() => setSelected(selected === p.letter ? null : p.letter)}
                data-testid={`button-project-option-${p.letter}`}
                className={`flex items-center gap-2 px-4 py-2 border rounded font-mono text-sm transition-colors ${
                  selected === p.letter
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"
                }`}
              >
                <span className="font-bold">Option {p.letter}</span>
                <ChevronRight className="h-3 w-3" />
                <span className="text-xs hidden sm:inline">{p.subtitle.split(" ").slice(0, 3).join(" ")}…</span>
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-6">
            {projects.map((project) => (
              <div
                key={project.letter}
                data-testid={`card-project-${project.letter}`}
                className={`border rounded-lg overflow-hidden transition-colors ${
                  selected === project.letter ? "border-primary/40" : "border-border"
                } bg-card`}
              >
                {/* Header */}
                <button
                  onClick={() => setSelected(selected === project.letter ? null : project.letter)}
                  className="w-full flex items-start gap-5 p-6 text-left hover:bg-muted/10 transition-colors"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg border border-primary/30 bg-primary/10 flex items-center justify-center">
                    <span className="font-mono font-bold text-primary text-lg">{project.letter}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h2 className="font-mono font-bold text-base text-foreground mb-1">{project.title}</h2>
                        <p className="text-sm text-muted-foreground">{project.subtitle}</p>
                      </div>
                      <span className={`shrink-0 text-xs font-mono px-2 py-0.5 rounded border ${difficultyColors[project.difficulty]}`}>
                        {project.difficulty}
                      </span>
                    </div>
                  </div>
                  <project.icon className="h-5 w-5 text-primary shrink-0 mt-1" />
                </button>

                {/* Expanded content */}
                {selected === project.letter && (
                  <div className="border-t border-border">
                    {/* Description */}
                    <div className="px-6 pt-5 pb-0">
                      <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-border">
                      {/* Pipeline */}
                      <div className="p-6">
                        <p className="font-mono text-xs text-primary uppercase tracking-widest mb-3">Pipeline</p>
                        <ol className="flex flex-col gap-2">
                          {project.pipeline.map((step, i) => (
                            <li key={step} className="flex items-start gap-2 text-xs text-muted-foreground">
                              <span className="text-primary font-mono font-bold shrink-0 w-4">{i + 1}.</span>
                              {step}
                            </li>
                          ))}
                        </ol>
                      </div>

                      {/* Tech Stack */}
                      <div className="p-6">
                        <p className="font-mono text-xs text-primary uppercase tracking-widest mb-3">Tech Stack</p>
                        <div className="flex flex-wrap gap-1.5 mb-6">
                          {project.techStack.map((t) => (
                            <span key={t} className="px-2 py-0.5 text-xs font-mono border border-border rounded text-muted-foreground bg-muted/20">{t}</span>
                          ))}
                        </div>

                        <p className="font-mono text-xs text-primary uppercase tracking-widest mb-3">Required Quests</p>
                        <div className="flex flex-wrap gap-1.5">
                          {project.requiredQuests.map((q) => (
                            <span key={q} className="px-2 py-0.5 text-xs font-mono border border-primary/30 rounded text-primary bg-primary/5">{q}</span>
                          ))}
                        </div>
                      </div>

                      {/* Key Features */}
                      <div className="p-6">
                        <p className="font-mono text-xs text-primary uppercase tracking-widest mb-3">Key Features</p>
                        <ul className="flex flex-col gap-2 mb-6">
                          {project.keyFeatures.map((f) => (
                            <li key={f} className="flex items-start gap-2 text-xs text-muted-foreground">
                              <span className="text-primary mt-0.5">·</span> {f}
                            </li>
                          ))}
                        </ul>

                        <div className="mt-auto">
                          <p className="font-mono text-xs text-primary uppercase tracking-widest mb-2">Timeline</p>
                          <p className="text-xs font-mono text-muted-foreground">{project.suggestedWeeks}</p>
                          <p className="text-xs text-muted-foreground mt-1">Start planning in Quest 10</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-10 p-5 border border-border rounded-lg bg-card/40">
            <p className="font-mono text-xs text-primary uppercase tracking-widest mb-2">Demo Day</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Quest 12 ends with a live demo session. Each participant presents their working system:
              a brief overview of the problem, a live walkthrough of the pipeline, a demo with real biomedical input,
              and a reflection on what they would improve. Projects are committed to the shared GitHub organization repository.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
