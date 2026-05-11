import React from "react";
import { Github, MessageSquare } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/20 py-12">
      <div className="container mx-auto px-4 md:px-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h3 className="font-mono font-bold text-lg text-white mb-2">AI Quest Bioinformatics</h3>
          <p className="text-sm text-muted-foreground max-w-md">
            Summer Research Edition. Bridging the gap between software engineering, artificial intelligence, and biomedical research.
          </p>
        </div>
        
        <div className="flex gap-4">
          <a
            href="https://discord.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            <MessageSquare className="h-4 w-4" />
            Discord Community
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            <Github className="h-4 w-4" />
            GitHub Org
          </a>
        </div>
      </div>
    </footer>
  );
}
