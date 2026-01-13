import React from 'react';
import { Table } from '@/components/ui/table';

export const mdxComponents = {
    h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h1 className="text-2xl font-bold mb-4 font-mono text-white" {...props} />
    ),
    h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h2 className="text-lg font-bold mb-3 font-mono text-white" {...props} />
    ),
    h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h3 className="text-base font-bold mb-2 font-mono text-white" {...props} />
    ),
    p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
        <p className="mb-4 font-mono text-sm leading-relaxed text-zinc-300" {...props} />
    ),
    code: (props: React.HTMLAttributes<HTMLElement>) => (
        <code
            className="bg-zinc-800/50 px-1 py-0.5 rounded font-mono text-sm text-zinc-300"
            {...props}
        />
    ),
    pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
        <pre
            className="bg-zinc-900 p-4 rounded-lg mb-4 overflow-x-auto font-mono text-sm border border-zinc-800"
            {...props}
        />
    ),
    a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
        <a className="text-purple-400 hover:text-purple-300 underline font-mono" {...props} />
    ),
    ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
        <ul className="list-disc list-inside mb-4 font-mono text-sm space-y-1 text-zinc-300" {...props} />
    ),
    ol: (props: React.OlHTMLAttributes<HTMLOListElement>) => (
        <ol className="list-decimal list-inside mb-4 font-mono text-sm space-y-1 text-zinc-300" {...props} />
    ),
    li: (props: React.LiHTMLAttributes<HTMLLIElement>) => (
        <li className="leading-relaxed font-mono" {...props} />
    ),
    blockquote: (props: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
        <blockquote
            className="border-l-2 border-purple-400 pl-4 italic mb-4 font-mono text-sm text-zinc-500"
            {...props}
        />
    ),
    Table: Table,
};
