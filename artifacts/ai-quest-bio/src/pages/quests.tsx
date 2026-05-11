import { useState } from "react";
import { ChevronDown, ChevronUp, Terminal, Globe, Database, Layers, Search, GitMerge, Bot, Dna, Network, FlaskConical, Cpu, Trophy, Target, CheckSquare, BarChart2 } from "lucide-react";

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
  task: string;
  kpis: string[];
  acceptance: string[];
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
    task: "Build a CLI tool that accepts a FASTA file, parses sequences, detects single-nucleotide substitutions (SNPs) by comparing against a reference, and outputs a mutation report as a structured JSON file.",
    kpis: [
      "Parses 100+ sequences from a FASTA file in under 2 seconds",
      "Detects all manually seeded SNPs in the test dataset (0 false negatives)",
      "Outputs valid JSON with fields: sequence_id, position, ref_base, alt_base",
      "CLI runs without errors from command line with help text",
    ],
    acceptance: [
      "Working CLI with --input, --reference, --output flags",
      "Correctly parses multi-record FASTA files",
      "JSON output validated with a provided schema",
      "At least 3 test cases passing (clean sequence, 1-mutation, multi-mutation)",
    ],
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
    task: "Build a scraper that queries PubMed search results for 3 given disease terms, extracts article title, PMID, publication date, and abstract URL for each result, paginates through at least 2 pages per query, and stores results as CSV. Bonus: Playwright screenshot of results page.",
    kpis: [
      "Extracts 50+ unique records across 3 disease terms",
      "Completes full scrape in under 90 seconds",
      "Field coverage: PMID, title, date, URL present in 95%+ of records",
      "No duplicate PMIDs in output",
    ],
    acceptance: [
      "CSV output with all 4 required fields for each record",
      "Pagination handled (at least page 1 and 2 per query)",
      "Script handles HTTP errors gracefully (retry or skip)",
      "Bonus: at least 1 Playwright screenshot saved to disk",
    ],
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
    task: "Build an end-to-end pipeline: query PubMed API for 5 predefined disease terms (at least 50 results each), parse XML responses, clean and normalize abstracts (remove special chars, whitespace), store in SQLite, then implement BM25 retrieval that returns the top 5 most relevant papers for a free-text query.",
    kpis: [
      "Ingests at least 200 unique papers into SQLite",
      "BM25 retrieval returns results in under 1 second",
      "Top-5 results for 3 test queries judged relevant by participants (manual evaluation)",
      "Pipeline runs end-to-end without manual intervention in under 5 minutes",
    ],
    acceptance: [
      "SQLite database with papers table: pmid, title, abstract, date, query_term",
      "BM25 index built over stored abstracts",
      "Retrieval function accepts a query string, returns list of (pmid, title, score)",
      "Duplicate PMIDs handled (upsert or dedup step documented)",
    ],
  },
  {
    number: 4,
    theme: "Before LLMs",
    title: "Biomedical NLP Foundations",
    icon: Layers,
    models: ["spaCy (en_core_web_sm)", "SciSpaCy (en_core_sci_sm, en_ner_bc5cdr_md)"],
    focus: ["Tokenization & stemming", "Lemmatization", "Named Entity Recognition (NER)", "Dependency parsing", "Biomedical pipelines"],
    build: "Biomedical Entity Detector",
    buildDetails: "Detect diseases, genes, treatments, and mutations in raw biomedical text using SciSpaCy models. Annotate spans with entity types.",
    task: "Process 100 PubMed abstracts (from Quest 3 database) through both standard spaCy and SciSpaCy en_ner_bc5cdr_md. Extract all DISEASE and CHEMICAL entities, store annotated spans, and produce a comparison report showing which model finds more entities and of better quality on 10 manually spot-checked abstracts.",
    kpis: [
      "Processes 100 abstracts in under 30 seconds",
      "SciSpaCy detects at least 2x more biomedical entities than standard spaCy on the same abstracts",
      "Entity span annotations include: text, start_char, end_char, label, abstract_pmid",
      "Manual spot-check: 7/10 SciSpaCy entities judged correct by participant",
    ],
    acceptance: [
      "Both spaCy and SciSpaCy pipelines implemented and compared",
      "Output JSON/CSV with annotated entities per abstract",
      "Summary table: entity_type → count for each model",
      "At least 10 example entity detections documented with correct/incorrect judgement",
    ],
  },
  {
    number: 5,
    theme: "Semantic meaning in biomedical text",
    title: "Embeddings & Semantic Search",
    icon: Search,
    models: ["BioClinicalModernBERT (bi-encoder)", "Biomedical bi-encoders (sentence-transformers)"],
    focus: ["Dense embeddings with BioClinicalModernBERT", "Vector similarity (cosine, dot product)", "Semantic retrieval vs BM25", "Text chunking strategies", "FAISS / numpy indexing"],
    build: "Semantic Search Engine",
    buildDetails: "Embed 500+ PubMed abstracts with BioClinicalModernBERT. Search by meaning, not keywords. Compare against BM25 from Quest 3.",
    task: "Using BioClinicalModernBERT as the bi-encoder, embed at least 500 PubMed abstracts from the Quest 3 database. Build a FAISS index. Implement a semantic search function. Compare results against BM25 on 10 test queries: for each query, rank the top-5 results from both methods and document where semantic search outperforms keyword retrieval.",
    kpis: [
      "BioClinicalModernBERT embeddings generated for 500+ abstracts",
      "FAISS index built, query response under 500ms",
      "Semantic search returns different (and better) results than BM25 for at least 6/10 test queries (manual judgment)",
      "Embedding generation completes in under 3 minutes on CPU",
    ],
    acceptance: [
      "BioClinicalModernBERT used as the embedding model (not generic sentence-BERT)",
      "FAISS index persisted to disk and reloadable",
      "Search function returns: pmid, title, similarity_score for top-K results",
      "Side-by-side comparison table: BM25 vs BioClinicalModernBERT results for 5+ queries",
      "At least 2 example queries where semantic search finds thematically relevant papers that BM25 misses",
    ],
  },
  {
    number: 6,
    theme: "Improving biomedical search quality",
    title: "Cross-Encoders & Retrieval Pipelines",
    icon: GitMerge,
    models: ["DeBERTa variants (cross-encoder)", "Biomedical cross-encoders"],
    focus: ["Two-stage retrieval", "Reranking with cross-encoders", "Relevance scoring", "Retrieval evaluation (nDCG, MRR)", "Recall vs precision tradeoffs"],
    build: "Two-Stage Retrieval System",
    buildDetails: "Stage 1: fast bi-encoder retrieval of top-K candidates. Stage 2: cross-encoder reranking for precision. Evaluate with standard IR metrics.",
    task: "Build a two-stage retrieval system on the same 500-paper corpus: Stage 1 uses BioClinicalModernBERT bi-encoder to retrieve top-50 candidates. Stage 2 uses a DeBERTa-based cross-encoder to rerank and return top-5. Evaluate both stages on a manually labeled set of 10 queries with at least 3 relevant documents each (create the relevance judgments yourself).",
    kpis: [
      "nDCG@5 of two-stage system at least 10% higher than bi-encoder alone",
      "MRR improvement documented between stage 1 and stage 2 on 10 test queries",
      "Full reranking of 50 candidates completes in under 10 seconds on CPU",
      "Evaluation report generated automatically from code",
    ],
    acceptance: [
      "Stage 1 (bi-encoder) and Stage 2 (cross-encoder) both implemented in a single pipeline function",
      "Relevance judgment file created (10 queries × N relevant PMIDs)",
      "nDCG@5 and MRR computed and printed for both stages",
      "At least 1 example query where reranking moves a relevant document from position 8+ to top-3",
    ],
  },
  {
    number: 7,
    theme: "LLMs as extraction systems",
    title: "Structured Extraction with Local LLMs",
    icon: Bot,
    models: ["Qwen 0.6B via Ollama (development)", "MedGemma 1.5 via Ollama (production)"],
    focus: ["Pydantic schema definition", "Instructor library", "Structured JSON extraction", "Hallucination control", "Output validation"],
    build: "Paper Structured Extractor",
    buildDetails: "Take a raw biomedical abstract and extract: disease name, mutation, treatment, evidence level — all as a validated Pydantic schema. Handle failed extractions gracefully.",
    task: "Define a BiomedicalExtraction Pydantic schema with fields: disease (str), gene_symbol (Optional[str]), mutation_hgvs (Optional[str]), treatment (Optional[str]), evidence_level (Literal['strong','moderate','weak','none']). Using Instructor + Ollama, run extraction on 50 abstracts from the database. Manually annotate 10 of those as ground truth and compute field-level accuracy.",
    kpis: [
      "Valid Pydantic-validated JSON produced for at least 90% of 50 abstracts",
      "Field accuracy on 10 manually annotated abstracts: disease ≥75%, gene ≥60%, mutation ≥55%",
      "Failed extractions (validation errors) caught and logged — never silently dropped",
      "Processing 50 abstracts completes in under 10 minutes with Qwen 0.6B on CPU",
    ],
    acceptance: [
      "BiomedicalExtraction Pydantic model defined with proper Optional types and Literal fields",
      "Instructor used with Ollama (not raw prompting with manual JSON parsing)",
      "Output file: one JSON record per abstract with extraction result + success/failure flag",
      "10-abstract ground truth annotation file included",
      "Field-level accuracy table printed: disease/gene/mutation/treatment/evidence",
    ],
  },
  {
    number: 8,
    theme: "Understanding genomic variants",
    title: "HGVS & Mutation Intelligence",
    icon: Dna,
    focus: ["HGVS notation (c., p., g., r.)", "Mutation normalization", "Transcript notation", "Genomic coordinates", "Hybrid extraction (regex + NLP + ML)"],
    build: "Mutation Extraction Engine",
    buildDetails: "Detect HGVS variants in text using regex patterns, normalize them, link to gene symbols. Hybrid rule-based + ML-assisted approach.",
    task: "Build a mutation extraction engine that: (1) uses regex to detect HGVS variants in 4 standard formats (c., p., g., r.) from 100 abstracts, (2) normalizes detected variants to a canonical structure, (3) extracts the nearest gene symbol mention using spaCy dependency parsing, (4) cross-references 5 detected variants against a manually curated ClinVar entry list.",
    kpis: [
      "Regex patterns detect at least 80% of HGVS variants in a 50-abstract labeled test set",
      "Normalizer correctly handles c., p., and g. notation for 90%+ of detected variants",
      "Gene symbol linked to variant in at least 70% of cases where gene is mentioned in the abstract",
      "False positive rate (non-HGVS strings matched) under 15% on test set",
    ],
    acceptance: [
      "Regex patterns for all 4 HGVS formats implemented and tested separately",
      "Normalization function with input/output documented for 10 example variants",
      "Gene linking via spaCy span proximity or dependency parsing (documented approach)",
      "Output CSV: abstract_pmid, variant_raw, variant_normalized, gene_symbol, confidence",
      "5 ClinVar cross-reference examples documented (match or no-match)",
    ],
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
    task: "Parse the MONDO OBO file, extract the first 3 levels of the disease hierarchy. Import entities extracted in Quests 4, 7, and 8 (diseases, genes, mutations). Build a NetworkX graph with 3 relationship types: ASSOCIATED_WITH (disease-gene), HAS_VARIANT (gene-mutation), TREATED_WITH (disease-treatment). Implement 3 query functions: shortest path between two diseases, all genes associated with a disease, all mutations linked to a gene.",
    kpis: [
      "Graph contains at least 500 nodes and 1000 edges after entity import",
      "All 3 relationship types present with at least 50 edges each",
      "3 query functions return results in under 2 seconds each",
      "Shortest path query correctly finds a path for at least 3 out of 5 test disease pairs",
    ],
    acceptance: [
      "MONDO OBO file parsed using pronto library",
      "NetworkX graph constructed with node attributes: id, label, type (disease/gene/mutation/treatment)",
      "Edge attributes: relationship_type, source_abstract_pmid",
      "3 query functions implemented, documented, and demonstrated with output",
      "Graph exported to JSON (node-link format) for reproducibility",
    ],
  },
  {
    number: 10,
    theme: "Experimental biology datasets",
    title: "Cell Lines & Experimental Metadata",
    icon: FlaskConical,
    resources: ["Cellosaurus database (API + flat file)"],
    focus: ["Cellosaurus data model", "Structured biological metadata", "Cancer cell line analysis", "Tissue origin mapping", "Mutation association queries"],
    build: "Cell Line Search & Analysis Explorer",
    buildDetails: "Filter cell lines by tissue origin, disease, or mutation. Analyze metadata distributions. Generate mutation summaries per cell line category.",
    task: "Download Cellosaurus data (API or flat file). Parse and store at least 1000 cancer cell line records in a DuckDB database. Implement 5 filter/query functions: by tissue origin, by disease name, by species, by mutation marker, by derived-from cancer type. Generate a statistical summary (counts, top diseases, top tissues) and a MedGemma-powered mutation summary for 3 cancer categories.",
    kpis: [
      "At least 1000 cell line records stored in DuckDB with all metadata fields",
      "5 filter functions each return correct results on 3 test cases (15 test cases total)",
      "Statistical summary generated in under 5 seconds",
      "MedGemma mutation summary for 3 cancer types produced (quality judged by participant)",
    ],
    acceptance: [
      "DuckDB table: accession, name, disease, tissue_origin, species, mutations (JSON array), category",
      "5 query functions implemented with docstrings and example calls",
      "Summary report: top 10 tissues, top 10 diseases, count by species",
      "MedGemma summary for breast cancer, lung cancer, and leukemia cell lines",
      "At least 1 cross-reference between a cell line mutation and the Quest 8 mutation database",
    ],
  },
  {
    number: 11,
    theme: "AI systems assisting researchers",
    title: "Biomedical Research Agents",
    icon: Cpu,
    models: ["Ollama (local)", "Qwen 2.5", "MedGemma 1.5"],
    focus: ["Agent orchestration", "Tool-calling patterns", "Retrieval augmented generation (RAG)", "Evidence aggregation", "Citation-aware outputs"],
    build: "Mini Biomedical Research Copilot",
    buildDetails: "Search PubMed papers, summarize findings, extract structured evidence. Local AI pipeline: retrieve → read → extract → answer. No cloud APIs required.",
    task: "Build a research copilot with 3 tools: (1) pubmed_search(query) → returns top-5 relevant abstracts from Quest 3 DB using BioClinicalModernBERT retrieval, (2) extract_evidence(abstract) → returns structured Pydantic extraction using MedGemma/Instructor, (3) summarize_findings(abstracts_list) → returns a paragraph summary with citations. Test on 10 predefined biomedical questions and document all outputs.",
    kpis: [
      "All 3 tools work independently and as a pipeline",
      "Answers to 10 test questions each include at least 1 PMID citation",
      "RAG pipeline retrieval + extraction + summarization completes in under 60 seconds per question",
      "At least 6/10 answers judged correct or partially correct by participant (manual review)",
    ],
    acceptance: [
      "3 tool functions implemented with clear input/output contracts",
      "End-to-end pipeline: question → retrieve → extract → summarize → answer with citations",
      "10 Q&A examples documented in a results notebook",
      "At least 1 failure case documented with diagnosis (hallucination, retrieval miss, etc.)",
      "System runs fully offline using Ollama (no OpenAI/Groq API calls required)",
    ],
  },
  {
    number: 12,
    theme: "Ship it",
    title: "Final Project Sprint & Demo Day",
    icon: Trophy,
    focus: ["Project polish", "Code review", "Documentation", "Demo preparation", "Peer review session"],
    build: "Biomedical Intelligence System",
    buildDetails: "Choose one of five directions and complete it to demo-ready state. Full system: working pipeline, documented code, structured outputs, live demo.",
    task: "Complete your chosen Final Project (Options A–E) to demo-ready state. The system must be reproducible from a single README.md, run on a provided test input end-to-end, and be presented in a 5-minute live demo covering: problem statement, pipeline walk-through, live example with real biomedical input, and one limitation or future direction.",
    kpis: [
      "System runs end-to-end on a provided test input without manual intervention",
      "README.md includes setup instructions, dependencies, and at least 3 example commands",
      "5-minute demo stays within time and covers all 4 required sections",
      "Peer reviewer can reproduce the system output on their machine following the README",
    ],
    acceptance: [
      "GitHub commit with all project code in the shared organization repository",
      "README.md: description, installation, usage, example input/output, known limitations",
      "At least 5 real biomedical input/output examples documented",
      "Demo includes a live run (not pre-recorded), showing a real biomedical query",
      "Peer review sign-off from at least 1 other participant",
    ],
  },
];

function SectionHeader({ icon: Icon, label }: { icon: React.ComponentType<{ className?: string }>; label: string }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <Icon className="h-3.5 w-3.5 text-primary" />
      <p className="text-xs font-mono text-primary uppercase tracking-widest">{label}</p>
    </div>
  );
}

function QuestCard({ quest, isOpen, onToggle }: { quest: Quest; isOpen: boolean; onToggle: () => void }) {
  return (
    <div
      data-testid={`card-quest-${quest.number}`}
      className={`border rounded-lg overflow-hidden transition-colors ${isOpen ? "border-primary/50 bg-card" : "border-border bg-card/50 hover:border-border/80"}`}
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
        <div className="border-t border-border/50">
          {/* Top row: Focus + Models/Resources + Build */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-border/50 px-0">
            <div className="p-5">
              <SectionHeader icon={Layers} label="Focus Areas" />
              <ul className="flex flex-col gap-1.5">
                {quest.focus.map((f) => (
                  <li key={f} className="text-xs text-muted-foreground flex items-start gap-1.5">
                    <span className="text-primary mt-0.5 shrink-0">·</span> {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5">
              {quest.models && (
                <div className="mb-4">
                  <SectionHeader icon={Cpu} label="Models" />
                  <ul className="flex flex-col gap-1.5">
                    {quest.models.map((m) => (
                      <li key={m} className="text-xs font-mono text-muted-foreground bg-muted/30 rounded px-2 py-0.5 border border-border w-fit">{m}</li>
                    ))}
                  </ul>
                </div>
              )}
              {quest.resources && (
                <div>
                  <SectionHeader icon={Database} label="Resources" />
                  <ul className="flex flex-col gap-1">
                    {quest.resources.map((r) => (
                      <li key={r} className="text-xs text-muted-foreground">{r}</li>
                    ))}
                  </ul>
                </div>
              )}
              {!quest.models && !quest.resources && (
                <div>
                  <SectionHeader icon={Cpu} label="Tech Notes" />
                  <p className="text-xs text-muted-foreground leading-relaxed">Standard Python libraries only — no external ML models required for this quest.</p>
                </div>
              )}
            </div>

            <div className="p-5">
              <SectionHeader icon={Terminal} label="Build Project" />
              <p className="text-sm font-mono font-semibold text-foreground mb-2">{quest.build}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{quest.buildDetails}</p>
              {quest.bonus && (
                <div className="mt-3 p-2 rounded border border-primary/20 bg-primary/5">
                  <p className="text-xs font-mono text-primary">Bonus: {quest.bonus}</p>
                </div>
              )}
            </div>
          </div>

          {/* Task */}
          <div className="border-t border-border/50 bg-muted/10 px-5 pt-5 pb-0">
            <SectionHeader icon={Target} label="Quest Task" />
            <p className="text-sm text-foreground leading-relaxed pb-5">{quest.task}</p>
          </div>

          {/* KPIs + Acceptance */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-border/50 border-t border-border/50">
            <div className="p-5">
              <SectionHeader icon={BarChart2} label="KPIs — Key Performance Indicators" />
              <ul className="flex flex-col gap-2">
                {quest.kpis.map((kpi, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <span className="shrink-0 w-4 h-4 rounded border border-primary/30 bg-primary/10 flex items-center justify-center text-primary font-mono font-bold text-[9px]">
                      {i + 1}
                    </span>
                    {kpi}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5">
              <SectionHeader icon={CheckSquare} label="Acceptance Criteria" />
              <ul className="flex flex-col gap-2">
                {quest.acceptance.map((ac, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <span className="shrink-0 text-primary mt-0.5">✓</span>
                    {ac}
                  </li>
                ))}
              </ul>
            </div>
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
            Each quest has a concrete task, measurable KPIs, and specific acceptance criteria.
            Click to expand — focus areas, models, build project, and deliverables.
          </p>
          <div className="flex flex-wrap gap-4 mt-4">
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Target className="h-3.5 w-3.5 text-primary" /> Task — what to build
            </span>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <BarChart2 className="h-3.5 w-3.5 text-primary" /> KPIs — measurable success metrics
            </span>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <CheckSquare className="h-3.5 w-3.5 text-primary" /> Acceptance — pass/fail criteria
            </span>
          </div>
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
                title={`Quest ${q.number}: ${q.title}`}
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
              <span className="text-primary">Note:</span> Quests are cumulative — each quest builds on outputs from previous ones.
              Quest 5 uses the Quest 3 database; Quest 6 uses Quest 5 embeddings; Quest 11 uses the full stack from Quests 3, 5, 7.
              Start planning your final project direction during Quest 10.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
