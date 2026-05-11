import { useState } from "react";
import { ExternalLink, Database, Zap, BookOpen, Server, Cpu, Package, Brain } from "lucide-react";

type TabKey = "databases" | "llm" | "colab" | "kaggle" | "medgemma" | "bioclinical" | "stack";

const tabs: { key: TabKey; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { key: "databases", label: "Biomedical Databases", icon: Database },
  { key: "llm", label: "Groq & OpenRouter", icon: Zap },
  { key: "colab", label: "Google Colab + Ollama", icon: BookOpen },
  { key: "kaggle", label: "Kaggle + Ollama", icon: Server },
  { key: "medgemma", label: "MedGemma 1.5", icon: Cpu },
  { key: "bioclinical", label: "BioClinicalModernBERT", icon: Brain },
  { key: "stack", label: "Stack Setup", icon: Package },
];

function CodeBlock({ code, lang = "python" }: { code: string; lang?: string }) {
  return (
    <div className="rounded border border-border bg-[hsl(180_50%_2%)] overflow-x-auto">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-border">
        <span className="text-xs font-mono text-muted-foreground">{lang}</span>
        <div className="flex gap-1.5 ml-auto">
          <div className="w-2.5 h-2.5 rounded-full bg-destructive/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-primary/50" />
        </div>
      </div>
      <pre className="p-4 text-xs font-mono text-foreground/90 leading-relaxed whitespace-pre-wrap break-words">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function ExternalA({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-primary hover:underline text-sm font-mono">
      {children} <ExternalLink className="h-3 w-3" />
    </a>
  );
}

function DatabasesTab() {
  const dbs = [
    {
      name: "NCBI",
      url: "https://www.ncbi.nlm.nih.gov/",
      description: "National Center for Biotechnology Information. Central hub for genomic sequences, protein data, literature, and biomedical databases including GenBank, RefSeq, and more.",
      api: "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/",
      quests: ["Quest 3", "Quest 8"],
      example: `import requests

# Search NCBI Entrez for records
url = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi"
params = {
    "db": "pubmed",
    "term": "BRCA1 mutation breast cancer",
    "retmax": 10,
    "retmode": "json"
}
response = requests.get(url, params=params)
data = response.json()
ids = data["esearchresult"]["idlist"]
print(f"Found {len(ids)} records: {ids}")`,
    },
    {
      name: "PubMed",
      url: "https://pubmed.ncbi.nlm.nih.gov/",
      description: "35M+ biomedical citations with free E-utilities API. Returns XML/JSON with title, abstract, MeSH terms, authors. Core data source for Quests 3, 5, 6, and 11.",
      api: "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi",
      quests: ["Quest 3", "Quest 5", "Quest 6", "Quest 11"],
      example: `import requests
import xml.etree.ElementTree as ET

# Fetch full article details
pmids = ["33462484", "34020579"]
url = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi"
params = {
    "db": "pubmed",
    "id": ",".join(pmids),
    "rettype": "xml",
    "retmode": "xml"
}
response = requests.get(url, params=params)
root = ET.fromstring(response.text)
for article in root.findall(".//Article"):
    title = article.findtext("ArticleTitle", "")
    abstract = article.findtext(".//AbstractText", "")
    print(f"Title: {title[:80]}...")`,
    },
    {
      name: "Cellosaurus",
      url: "https://www.cellosaurus.org/",
      description: "Curated knowledge resource on cell lines. Contains cancer cell line metadata, tissue of origin, disease associations, mutation data, and cross-references to genomic databases. Used in Quest 10.",
      api: "https://api.cellosaurus.org/",
      quests: ["Quest 10", "Final Option E"],
      example: `import requests

# Search Cellosaurus API
url = "https://api.cellosaurus.org/cell-line/HeLa"
response = requests.get(url, headers={"Accept": "application/json"})
data = response.json()

cell_line = data["Cellosaurus"]["cell-line-list"][0]
print("Name:", cell_line["name-list"][0]["value"])
print("Category:", cell_line.get("category"))
print("Species:", cell_line.get("species-list", [{}])[0].get("value"))`,
    },
    {
      name: "MONDO Disease Ontology",
      url: "https://mondo.monarchinitiative.org/",
      description: "Unified disease ontology integrating multiple disease naming systems (OMIM, Orphanet, DOID, NCIt). Provides hierarchical disease terms in OBO/OWL format. Used for entity linking in Quest 9.",
      api: "https://www.ebi.ac.uk/ols4/api/",
      quests: ["Quest 9", "Final Option C"],
      example: `# Download MONDO OBO file and parse it
# pip install pronto
import pronto

# Load ontology (download from: https://mondo.monarchinitiative.org/pages/download/)
onto = pronto.Ontology("mondo.obo")

# Search for a disease term
for term in onto.terms():
    if "breast carcinoma" in term.name.lower():
        print(f"ID: {term.id}")
        print(f"Name: {term.name}")
        print(f"Parents: {[p.name for p in term.superclasses(distance=1)]}")
        break`,
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      {dbs.map((db) => (
        <div key={db.name} data-testid={`card-db-${db.name.toLowerCase().replace(/\s/g, "-")}`}
          className="border border-border rounded-lg overflow-hidden bg-card">
          <div className="p-6 border-b border-border">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <h3 className="font-mono font-bold text-lg text-foreground mb-1">{db.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{db.description}</p>
              </div>
              <ExternalA href={db.url}>{db.name}</ExternalA>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {db.quests.map((q) => (
                <span key={q} className="px-2 py-0.5 text-xs font-mono rounded border border-primary/30 bg-primary/10 text-primary">{q}</span>
              ))}
              <span className="px-2 py-0.5 text-xs font-mono rounded border border-border text-muted-foreground">API: {db.api}</span>
            </div>
          </div>
          <div className="p-6">
            <p className="text-xs font-mono text-muted-foreground mb-2">Example usage:</p>
            <CodeBlock code={db.example} />
          </div>
        </div>
      ))}
    </div>
  );
}

function LLMTab() {
  return (
    <div className="flex flex-col gap-8">
      <div className="border border-border rounded-lg overflow-hidden bg-card" data-testid="card-llm-groq">
        <div className="p-6 border-b border-border">
          <div className="flex items-start justify-between gap-4 mb-2">
            <h3 className="font-mono font-bold text-lg text-foreground">Groq Console</h3>
            <ExternalA href="https://console.groq.com/">console.groq.com</ExternalA>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Free-tier API access to LLaMA 3, Mixtral, Gemma 2, and more. Extremely fast inference (GroqChip). OpenAI-compatible API — swap base_url, same Python code.
            Get your free API key at console.groq.com.
          </p>
          <div className="flex flex-wrap gap-2">
            {["llama-3.3-70b-versatile", "llama-3.1-8b-instant", "mixtral-8x7b-32768", "gemma2-9b-it"].map((m) => (
              <span key={m} className="px-2 py-0.5 text-xs font-mono border border-border rounded text-muted-foreground">{m}</span>
            ))}
          </div>
        </div>
        <div className="p-6">
          <CodeBlock code={`# pip install groq
from groq import Groq

client = Groq(api_key="YOUR_GROQ_API_KEY")

response = client.chat.completions.create(
    model="llama-3.3-70b-versatile",
    messages=[
        {"role": "system", "content": "You are a biomedical NLP expert."},
        {"role": "user", "content": "Extract mutations from: The BRCA1 c.5266dupC variant was found in 3 patients."}
    ],
    temperature=0.1,
    max_tokens=512
)

print(response.choices[0].message.content)`} />
        </div>
      </div>

      <div className="border border-border rounded-lg overflow-hidden bg-card" data-testid="card-llm-openrouter">
        <div className="p-6 border-b border-border">
          <div className="flex items-start justify-between gap-4 mb-2">
            <h3 className="font-mono font-bold text-lg text-foreground">OpenRouter</h3>
            <ExternalA href="https://openrouter.ai/">openrouter.ai</ExternalA>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Unified API for 200+ models. Free tier available with daily credits. Access BioMedLM, Qwen variants, Claude, Mistral, and more through a single OpenAI-compatible endpoint.
          </p>
          <div className="flex flex-wrap gap-2">
            {["google/gemma-2-9b-it:free", "meta-llama/llama-3.1-8b-instruct:free", "qwen/qwen-2.5-7b-instruct:free", "microsoft/phi-3-mini-128k-instruct:free"].map((m) => (
              <span key={m} className="px-2 py-0.5 text-xs font-mono border border-border rounded text-muted-foreground">{m}</span>
            ))}
          </div>
        </div>
        <div className="p-6">
          <CodeBlock code={`# pip install openai (uses OpenAI-compatible client)
from openai import OpenAI

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key="YOUR_OPENROUTER_API_KEY",
    default_headers={
        "HTTP-Referer": "https://your-site.com",
        "X-Title": "AI Quest Bioinformatics"
    }
)

response = client.chat.completions.create(
    model="google/gemma-2-9b-it:free",
    messages=[
        {"role": "user", "content": "Summarize this abstract in 2 sentences: ..."}
    ]
)

print(response.choices[0].message.content)`} />
        </div>
      </div>

      <div className="p-4 border border-primary/20 rounded bg-primary/5">
        <p className="text-xs font-mono text-muted-foreground">
          <span className="text-primary">Quest usage:</span> Groq/OpenRouter are useful for cloud-based extraction in Quests 7 and 11.
          For fully offline/local inference use Ollama with Qwen 0.6B or MedGemma (see Colab/Kaggle tabs).
        </p>
      </div>
    </div>
  );
}

function ColabTab() {
  const steps = [
    {
      step: "01",
      title: "Install colab-xterm (optional terminal)",
      code: `!pip install colab-xterm -q
%load_ext colabxterm
%xterm`,
    },
    {
      step: "02",
      title: "Install Ollama",
      code: `!curl -fsSL https://ollama.com/install.sh | sh`,
      lang: "bash",
    },
    {
      step: "03",
      title: "Start Ollama server in background",
      code: `import subprocess
import time

proc = subprocess.Popen(["ollama", "serve"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
time.sleep(3)  # Wait for server startup
print("Ollama server started!")`,
    },
    {
      step: "04",
      title: "Pull MedGemma or Qwen model",
      code: `# For GPU (T4/A100 recommended):
!ollama pull medgemma:2b

# For CPU (fast, smaller):
!ollama pull qwen2.5:0.5b`,
      lang: "bash",
    },
    {
      step: "05",
      title: "Run inference via Python",
      code: `import requests
import json

def ollama_generate(model: str, prompt: str) -> str:
    response = requests.post(
        "http://localhost:11434/api/generate",
        json={"model": model, "prompt": prompt, "stream": False}
    )
    return response.json()["response"]

result = ollama_generate(
    "medgemma:2b",
    "Extract the mutation from: The EGFR L858R variant was detected in lung adenocarcinoma."
)
print(result)`,
    },
    {
      step: "06",
      title: "Structured extraction with Instructor + Pydantic",
      code: `# pip install instructor openai
import instructor
from openai import OpenAI
from pydantic import BaseModel

client = instructor.from_openai(
    OpenAI(base_url="http://localhost:11434/v1", api_key="ollama"),
    mode=instructor.Mode.JSON
)

class MutationExtraction(BaseModel):
    gene: str
    mutation_hgvs: str
    disease: str
    evidence: str

result = client.chat.completions.create(
    model="medgemma:2b",
    response_model=MutationExtraction,
    messages=[{
        "role": "user",
        "content": "Extract: EGFR L858R mutation found in lung adenocarcinoma patients."
    }]
)
print(result.model_dump())`,
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between gap-4 p-4 border border-border rounded-lg bg-card">
        <div>
          <h3 className="font-mono font-bold text-foreground mb-1">Google Colab + Ollama Setup</h3>
          <p className="text-sm text-muted-foreground">Run MedGemma or Qwen locally in Colab. T4 or A100 GPU recommended for MedGemma 7B+. CPU works for Qwen 0.5B/1.5B.</p>
        </div>
        <a href="https://colab.research.google.com/" target="_blank" rel="noopener noreferrer"
          data-testid="link-open-colab"
          className="shrink-0 px-3 py-1.5 border border-primary/30 bg-primary/10 text-primary text-xs font-mono rounded hover:bg-primary/20 transition-colors flex items-center gap-1">
          Open Colab <ExternalLink className="h-3 w-3" />
        </a>
      </div>

      <div className="p-3 border border-yellow-500/20 rounded bg-yellow-500/5">
        <p className="text-xs font-mono text-yellow-400">GPU Recommendation: Runtime → Change runtime type → T4 GPU (free) or A100 (Pro). CPU-only works for qwen2.5:0.5b.</p>
      </div>

      <div className="flex flex-col gap-4">
        {steps.map((s) => (
          <div key={s.step} data-testid={`step-colab-${s.step}`} className="border border-border rounded-lg overflow-hidden bg-card">
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
              <span className="text-xs font-mono text-primary font-bold">Step {s.step}</span>
              <span className="text-sm font-mono text-foreground">{s.title}</span>
            </div>
            <div className="p-4">
              <CodeBlock code={s.code} lang={s.lang || "python"} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function KaggleTab() {
  const steps = [
    {
      step: "01",
      title: "Create notebook & enable GPU",
      code: `# In Kaggle: Settings → Accelerator → GPU T4 x2 (recommended)
# This gives you ~2x T4 GPUs and 30h/week free GPU quota`,
      lang: "text",
    },
    {
      step: "02",
      title: "Install Ollama",
      code: `!curl -fsSL https://ollama.com/install.sh | sh`,
      lang: "bash",
    },
    {
      step: "03",
      title: "Start Ollama server",
      code: `import subprocess
import time

proc = subprocess.Popen(
    ["ollama", "serve"],
    stdout=subprocess.DEVNULL,
    stderr=subprocess.DEVNULL
)
time.sleep(5)  # Kaggle environment needs a bit more time
print("Ollama is running on http://localhost:11434")`,
    },
    {
      step: "04",
      title: "Pull model",
      code: `# MedGemma 2B (good for GPU T4)
!ollama pull medgemma:2b

# Or lightweight option for faster iteration
!ollama pull qwen2.5:1.5b`,
      lang: "bash",
    },
    {
      step: "05",
      title: "Verify server is responding",
      code: `import requests

try:
    r = requests.get("http://localhost:11434/api/tags")
    models = [m["name"] for m in r.json().get("models", [])]
    print("Available models:", models)
except Exception as e:
    print("Server not ready:", e)`,
    },
    {
      step: "06",
      title: "Generate with streaming",
      code: `import requests
import json

def stream_ollama(model: str, prompt: str):
    response = requests.post(
        "http://localhost:11434/api/generate",
        json={"model": model, "prompt": prompt, "stream": True},
        stream=True
    )
    full_text = ""
    for line in response.iter_lines():
        if line:
            chunk = json.loads(line)
            token = chunk.get("response", "")
            full_text += token
            print(token, end="", flush=True)
            if chunk.get("done"):
                break
    return full_text

result = stream_ollama("medgemma:2b", "What is HGVS notation for mutations?")`,
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between gap-4 p-4 border border-border rounded-lg bg-card">
        <div>
          <h3 className="font-mono font-bold text-foreground mb-1">Kaggle Notebooks + Ollama</h3>
          <p className="text-sm text-muted-foreground">Free GPU compute (30h/week T4 x2). Persistent environment, easy dataset access. Great for Quest 7 and final projects.</p>
        </div>
        <a href="https://www.kaggle.com/" target="_blank" rel="noopener noreferrer"
          data-testid="link-open-kaggle"
          className="shrink-0 px-3 py-1.5 border border-primary/30 bg-primary/10 text-primary text-xs font-mono rounded hover:bg-primary/20 transition-colors flex items-center gap-1">
          Open Kaggle <ExternalLink className="h-3 w-3" />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 border border-primary/20 rounded bg-primary/5">
          <p className="text-xs font-mono text-primary mb-1">Free GPU Quota</p>
          <p className="text-xs text-muted-foreground">30 hours/week with GPU T4 x2. Resets weekly. No credit card needed.</p>
        </div>
        <div className="p-4 border border-border rounded bg-card">
          <p className="text-xs font-mono text-muted-foreground mb-1">Persistence</p>
          <p className="text-xs text-muted-foreground">Session data is not persistent by default. Save outputs to /kaggle/working/ or use Kaggle Datasets.</p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {steps.map((s) => (
          <div key={s.step} data-testid={`step-kaggle-${s.step}`} className="border border-border rounded-lg overflow-hidden bg-card">
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
              <span className="text-xs font-mono text-primary font-bold">Step {s.step}</span>
              <span className="text-sm font-mono text-foreground">{s.title}</span>
            </div>
            <div className="p-4">
              <CodeBlock code={s.code} lang={s.lang || "python"} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MedGemmaTab() {
  return (
    <div className="flex flex-col gap-8">
      <div className="border border-border rounded-lg p-6 bg-card">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h3 className="font-mono font-bold text-lg text-foreground mb-1">MedGemma 1.5</h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
              Google's medical-domain fine-tuned Gemma model. Specialized for biomedical text understanding, clinical NLP tasks, medical question answering, and structured extraction from biomedical literature.
              Available in multiple sizes via Ollama.
            </p>
          </div>
          <ExternalA href="https://huggingface.co/google/medgemma-2b-it">HuggingFace</ExternalA>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {[
            { size: "medgemma:2b", vram: "~3GB VRAM", speed: "Fast", use: "Quest 7, iteration" },
            { size: "medgemma:7b", vram: "~6GB VRAM", speed: "Balanced", use: "Quest 11, copilot" },
            { size: "medgemma:27b", vram: "~20GB VRAM", speed: "Precise", use: "Final project, best quality" },
          ].map((m) => (
            <div key={m.size} data-testid={`card-medgemma-${m.size.replace(":", "-")}`}
              className="border border-border rounded p-4 bg-muted/20">
              <p className="font-mono font-bold text-sm text-primary mb-2">{m.size}</p>
              <p className="text-xs text-muted-foreground mb-1">VRAM: {m.vram}</p>
              <p className="text-xs text-muted-foreground mb-1">Speed: {m.speed}</p>
              <p className="text-xs text-muted-foreground">Best for: {m.use}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="border border-border rounded-lg overflow-hidden bg-card">
        <div className="p-4 border-b border-border">
          <p className="font-mono text-sm text-foreground font-semibold">Ollama commands</p>
        </div>
        <div className="p-4">
          <CodeBlock lang="bash" code={`# Pull the model (run once)
ollama pull medgemma:2b

# Run interactively in terminal
ollama run medgemma:2b

# List downloaded models
ollama list

# Check running server
curl http://localhost:11434/api/tags`} />
        </div>
      </div>

      <div className="border border-border rounded-lg overflow-hidden bg-card">
        <div className="p-4 border-b border-border">
          <p className="font-mono text-sm text-foreground font-semibold">Structured extraction with Instructor (Quest 7)</p>
        </div>
        <div className="p-4">
          <CodeBlock code={`# pip install instructor openai pydantic
import instructor
from openai import OpenAI
from pydantic import BaseModel, Field
from typing import Optional

# Connect to local Ollama
client = instructor.from_openai(
    OpenAI(base_url="http://localhost:11434/v1", api_key="ollama"),
    mode=instructor.Mode.JSON
)

class BiomedicalExtraction(BaseModel):
    disease: str = Field(description="Primary disease or condition mentioned")
    gene_symbol: Optional[str] = Field(None, description="Gene symbol (e.g. BRCA1, EGFR)")
    mutation_hgvs: Optional[str] = Field(None, description="HGVS notation (e.g. c.5266dupC)")
    treatment: Optional[str] = Field(None, description="Treatment or drug mentioned")
    evidence_level: str = Field(description="Evidence quality: strong/moderate/weak")

abstract = """
We identified the BRCA1 c.5266dupC (p.Gln1756Profs*74) variant in three patients
with hereditary breast and ovarian cancer syndrome. Treatment with PARP inhibitors
showed significant efficacy in two of three cases.
"""

result = client.chat.completions.create(
    model="medgemma:2b",
    response_model=BiomedicalExtraction,
    messages=[{
        "role": "user",
        "content": f"Extract biomedical information from this abstract:\\n\\n{abstract}"
    }]
)

print(result.model_dump_json(indent=2))`} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border border-border rounded-lg p-5 bg-card">
          <p className="font-mono text-xs text-primary uppercase tracking-widest mb-3">Use cases in the program</p>
          <ul className="flex flex-col gap-2">
            {[
              "Quest 7 — Structured extraction with Pydantic schemas",
              "Quest 11 — Core of the biomedical research copilot",
              "Final Option D — Citation-aware research assistant",
              "Final Option A — Mutation intelligence pipeline",
            ].map((u) => (
              <li key={u} className="text-xs text-muted-foreground flex items-start gap-1.5">
                <span className="text-primary">·</span> {u}
              </li>
            ))}
          </ul>
        </div>
        <div className="border border-border rounded-lg p-5 bg-card">
          <p className="font-mono text-xs text-primary uppercase tracking-widest mb-3">vs Qwen 0.6B</p>
          <div className="flex flex-col gap-2 text-xs text-muted-foreground">
            <p><span className="text-primary font-mono">MedGemma:</span> Better biomedical understanding, clinical text, mutation extraction. Larger, slower.</p>
            <p><span className="text-foreground font-mono">Qwen 0.5B:</span> Tiny, extremely fast, lower quality. Great for prototyping and development iteration.</p>
            <p className="mt-2 text-muted-foreground">Recommendation: Develop with Qwen, finalize with MedGemma.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StackTab() {
  const sections = [
    {
      title: "Python Environment",
      code: `# Create a virtual environment
python -m venv bioquest-env
source bioquest-env/bin/activate  # Linux/macOS
# bioquest-env\\Scripts\\activate  # Windows

# Or use conda
conda create -n bioquest python=3.11
conda activate bioquest`,
      lang: "bash",
    },
    {
      title: "Core NLP Stack",
      code: `pip install spacy scispacy
pip install scikit-learn pandas numpy

# Download SciSpaCy models
pip install https://s3-us-west-2.amazonaws.com/ai2-s2-scispacy/releases/v0.5.4/en_core_sci_sm-0.5.4.tar.gz
pip install https://s3-us-west-2.amazonaws.com/ai2-s2-scispacy/releases/v0.5.4/en_ner_bc5cdr_md-0.5.4.tar.gz

# Transformers & embeddings
pip install transformers sentence-transformers
pip install faiss-cpu  # or faiss-gpu for GPU indexing`,
      lang: "bash",
    },
    {
      title: "Web Scraping & Automation",
      code: `pip install requests beautifulsoup4 lxml
pip install playwright
playwright install chromium  # Download browser

# BM25 for retrieval
pip install rank-bm25`,
      lang: "bash",
    },
    {
      title: "Structured Extraction & LLMs",
      code: `pip install pydantic instructor openai groq
pip install ollama  # Python client for local Ollama

# Ontology parsing
pip install pronto networkx`,
      lang: "bash",
    },
    {
      title: "Engineering & Storage",
      code: `pip install fastapi uvicorn
pip install duckdb  # OLAP SQL database
# SQLite is built-in to Python

# DuckDB usage
import duckdb
con = duckdb.connect("biomedical.db")
con.execute("CREATE TABLE IF NOT EXISTS papers (pmid TEXT, title TEXT, abstract TEXT)")`,
    },
    {
      title: "Full requirements.txt",
      code: `# requirements.txt
requests==2.32.3
beautifulsoup4==4.12.3
lxml==5.2.2
playwright==1.44.0
pandas==2.2.2
numpy==1.26.4
scikit-learn==1.5.0
spacy==3.7.4
sentence-transformers==3.0.1
transformers==4.41.2
torch==2.3.1
faiss-cpu==1.8.0
rank-bm25==0.2.2
pydantic==2.7.4
instructor==1.3.3
openai==1.35.7
groq==0.9.0
ollama==0.2.1
fastapi==0.111.0
uvicorn==0.30.1
duckdb==0.10.3
pronto==2.5.7
networkx==3.3`,
      lang: "text",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      {sections.map((s) => (
        <div key={s.title} data-testid={`card-stack-setup-${s.title.toLowerCase().replace(/\s/g, "-")}`}
          className="border border-border rounded-lg overflow-hidden bg-card">
          <div className="px-4 py-3 border-b border-border">
            <p className="font-mono font-semibold text-sm text-foreground">{s.title}</p>
          </div>
          <div className="p-4">
            <CodeBlock code={s.code} lang={s.lang || "python"} />
          </div>
        </div>
      ))}
    </div>
  );
}

function BioClinicalModernBERTTab() {
  return (
    <div className="flex flex-col gap-8">
      {/* Overview */}
      <div className="border border-border rounded-lg p-6 bg-card" data-testid="card-bioclinical-overview">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h3 className="font-mono font-bold text-lg text-foreground mb-1">BioClinicalModernBERT</h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
              A BERT-based transformer pretrained on clinical notes, biomedical literature, and PubMed abstracts.
              The "ModernBERT" architecture brings updated positional encodings, longer context windows, and improved
              training efficiency compared to the original BioBERT and BioClinicalBERT. It is the primary bi-encoder
              used for semantic search and retrieval in this program (Quests 5, 6, and 11).
            </p>
          </div>
          <a href="https://huggingface.co/models?search=bioclinical+modernbert" target="_blank" rel="noopener noreferrer"
            data-testid="link-bioclinical-hf"
            className="shrink-0 flex items-center gap-1 text-primary hover:underline text-sm font-mono">
            HuggingFace <ExternalLink className="h-3 w-3" />
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {[
            { label: "Architecture", value: "ModernBERT encoder" },
            { label: "Context window", value: "8192 tokens" },
            { label: "Embedding dim", value: "768 / 1024" },
            { label: "Training data", value: "PubMed + clinical notes" },
          ].map((s) => (
            <div key={s.label} className="border border-border rounded p-3 bg-muted/20 text-center">
              <p className="font-mono text-sm font-bold text-primary mb-1">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Why BioClinicalModernBERT vs alternatives */}
      <div className="border border-border rounded-lg p-6 bg-card">
        <p className="font-mono text-xs text-primary uppercase tracking-widest mb-4">Why BioClinicalModernBERT vs alternatives</p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs font-mono">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 pr-4 text-muted-foreground font-normal">Model</th>
                <th className="text-left py-2 pr-4 text-muted-foreground font-normal">Domain</th>
                <th className="text-left py-2 pr-4 text-muted-foreground font-normal">Context</th>
                <th className="text-left py-2 pr-4 text-muted-foreground font-normal">Best for</th>
                <th className="text-left py-2 text-muted-foreground font-normal">Program role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {[
                ["BioClinicalModernBERT", "Clinical + PubMed", "8192 tok", "Biomedical retrieval", "Primary bi-encoder (Q5, Q6, Q11)"],
                ["all-MiniLM-L6-v2", "General", "512 tok", "Fast general embeddings", "Baseline comparison only"],
                ["BioBERT", "PubMed", "512 tok", "NER, classification", "NLP foundations (Q4)"],
                ["PubMedBERT", "PubMed", "512 tok", "Biomedical QA", "Alternative bi-encoder"],
                ["DeBERTa (cross-encoder)", "General", "512 tok", "Reranking pairs", "Stage 2 reranking (Q6)"],
              ].map(([model, domain, ctx, use, role]) => (
                <tr key={model} className={model === "BioClinicalModernBERT" ? "bg-primary/5" : ""}>
                  <td className={`py-2 pr-4 ${model === "BioClinicalModernBERT" ? "text-primary font-bold" : "text-foreground"}`}>{model}</td>
                  <td className="py-2 pr-4 text-muted-foreground">{domain}</td>
                  <td className="py-2 pr-4 text-muted-foreground">{ctx}</td>
                  <td className="py-2 pr-4 text-muted-foreground">{use}</td>
                  <td className="py-2 text-muted-foreground">{role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Installation */}
      <div className="border border-border rounded-lg overflow-hidden bg-card">
        <div className="px-4 py-3 border-b border-border">
          <p className="font-mono font-semibold text-sm text-foreground">Installation</p>
        </div>
        <div className="p-4">
          <CodeBlock lang="bash" code={`pip install sentence-transformers transformers torch
# For GPU-accelerated indexing:
pip install faiss-gpu  # instead of faiss-cpu`} />
        </div>
      </div>

      {/* Load and embed */}
      <div className="border border-border rounded-lg overflow-hidden bg-card">
        <div className="px-4 py-3 border-b border-border">
          <p className="font-mono font-semibold text-sm text-foreground">Loading & generating embeddings (Quest 5)</p>
        </div>
        <div className="p-4">
          <CodeBlock code={`from sentence_transformers import SentenceTransformer
import numpy as np

# Load BioClinicalModernBERT as a bi-encoder
model = SentenceTransformer("NovaSky-Berkeley/BioClinicalModernBERT-base")
# Alternative: "HealthNLP/BioClinicalBERT-sentence-transformers"

# Embed a list of PubMed abstracts
abstracts = [
    "BRCA1 mutations are associated with hereditary breast and ovarian cancer.",
    "EGFR L858R variant shows high sensitivity to tyrosine kinase inhibitors.",
    "TP53 loss of function mutations are frequent in colorectal carcinoma.",
]

# Encode — returns numpy array of shape (n_abstracts, embedding_dim)
embeddings = model.encode(
    abstracts,
    batch_size=32,
    show_progress_bar=True,
    normalize_embeddings=True  # Important for cosine similarity with dot product
)

print(f"Embedding shape: {embeddings.shape}")  # e.g. (3, 768)
np.save("abstract_embeddings.npy", embeddings)`} />
        </div>
      </div>

      {/* FAISS index */}
      <div className="border border-border rounded-lg overflow-hidden bg-card">
        <div className="px-4 py-3 border-b border-border">
          <p className="font-mono font-semibold text-sm text-foreground">Building & querying a FAISS index (Quest 5)</p>
        </div>
        <div className="p-4">
          <CodeBlock code={`import faiss
import numpy as np
from sentence_transformers import SentenceTransformer

model = SentenceTransformer("NovaSky-Berkeley/BioClinicalModernBERT-base")

# Load pre-computed embeddings
embeddings = np.load("abstract_embeddings.npy").astype("float32")
dim = embeddings.shape[1]

# Build inner-product index (equivalent to cosine sim when embeddings are normalized)
index = faiss.IndexFlatIP(dim)
index.add(embeddings)

# Save index
faiss.write_index(index, "bioclinical_faiss.index")

# --- Query ---
query = "EGFR mutation lung cancer targeted therapy"
query_embedding = model.encode([query], normalize_embeddings=True).astype("float32")

scores, indices = index.search(query_embedding, k=5)

print("Top-5 results:")
for rank, (idx, score) in enumerate(zip(indices[0], scores[0])):
    print(f"  Rank {rank+1} | Score: {score:.4f} | Abstract #{idx}")`} />
        </div>
      </div>

      {/* Cross-encoder pipeline */}
      <div className="border border-border rounded-lg overflow-hidden bg-card">
        <div className="px-4 py-3 border-b border-border">
          <p className="font-mono font-semibold text-sm text-foreground">Two-stage pipeline: BioClinicalModernBERT + DeBERTa reranker (Quest 6)</p>
        </div>
        <div className="p-4">
          <CodeBlock code={`from sentence_transformers import SentenceTransformer, CrossEncoder
import faiss
import numpy as np

bi_encoder = SentenceTransformer("NovaSky-Berkeley/BioClinicalModernBERT-base")
cross_encoder = CrossEncoder("cross-encoder/ms-marco-MiniLM-L-6-v2")
# Biomedical cross-encoder alternative:
# cross_encoder = CrossEncoder("cross-encoder/nli-deberta-v3-small")

def two_stage_retrieve(query: str, abstracts: list[str], embeddings: np.ndarray, top_k: int = 5):
    # Stage 1: Bi-encoder fast retrieval
    index = faiss.read_index("bioclinical_faiss.index")
    q_emb = bi_encoder.encode([query], normalize_embeddings=True).astype("float32")
    _, candidate_ids = index.search(q_emb, k=50)  # retrieve top-50 candidates

    # Stage 2: Cross-encoder reranking
    pairs = [(query, abstracts[i]) for i in candidate_ids[0]]
    scores = cross_encoder.predict(pairs)

    # Sort by cross-encoder score, return top_k
    ranked = sorted(zip(candidate_ids[0], scores), key=lambda x: x[1], reverse=True)
    return ranked[:top_k]

results = two_stage_retrieve("BRCA1 mutation ovarian cancer treatment", abstracts, embeddings)
for idx, score in results:
    print(f"Score: {score:.4f} | {abstracts[idx][:80]}...")`} />
        </div>
      </div>

      {/* Use in research copilot */}
      <div className="border border-border rounded-lg p-6 bg-card">
        <p className="font-mono text-xs text-primary uppercase tracking-widest mb-3">Role in the program</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              quest: "Quest 5",
              role: "Primary bi-encoder for semantic search",
              detail: "Embed 500+ PubMed abstracts. Build FAISS index. Compare vs BM25 on 10 test queries.",
            },
            {
              quest: "Quest 6",
              role: "Stage 1 of two-stage retrieval",
              detail: "Fast candidate retrieval (top-50). Feeds into DeBERTa cross-encoder reranker. Evaluated with nDCG@5 and MRR.",
            },
            {
              quest: "Quest 11",
              role: "Retrieval engine in the biomedical copilot",
              detail: "Powers the pubmed_search() tool in the research agent. Provides semantically relevant abstracts as context for MedGemma.",
            },
          ].map((item) => (
            <div key={item.quest} className="border border-border rounded p-4 bg-muted/20">
              <p className="font-mono text-xs text-primary mb-1">{item.quest}</p>
              <p className="font-mono text-sm font-semibold text-foreground mb-2">{item.role}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Resources() {
  const [activeTab, setActiveTab] = useState<TabKey>("databases");

  return (
    <div className="flex flex-col">
      <section className="px-4 md:px-8 pt-16 pb-12 border-b border-border">
        <div className="container mx-auto max-w-5xl">
          <p className="font-mono text-xs text-primary tracking-widest uppercase mb-2">Setup Guides & Resources</p>
          <h1 className="text-3xl md:text-4xl font-bold font-mono mb-4">Resources</h1>
          <p className="text-muted-foreground max-w-2xl">
            Everything you need to set up your environment: biomedical databases, LLM API access, Google Colab setup, Kaggle notebooks, and the full core stack.
          </p>
        </div>
      </section>

      <section className="px-4 md:px-8 py-12">
        <div className="container mx-auto max-w-5xl">
          {/* Tab bar */}
          <div className="flex flex-wrap gap-2 mb-8 border-b border-border pb-4">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                data-testid={`tab-${tab.key}`}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded transition-colors ${
                  activeTab === tab.key
                    ? "bg-primary text-primary-foreground"
                    : "border border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
                }`}
              >
                <tab.icon className="h-3 w-3" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          {activeTab === "databases" && <DatabasesTab />}
          {activeTab === "llm" && <LLMTab />}
          {activeTab === "colab" && <ColabTab />}
          {activeTab === "kaggle" && <KaggleTab />}
          {activeTab === "medgemma" && <MedGemmaTab />}
          {activeTab === "bioclinical" && <BioClinicalModernBERTTab />}
          {activeTab === "stack" && <StackTab />}
        </div>
      </section>
    </div>
  );
}
