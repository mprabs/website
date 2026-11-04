import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

export default function MarkdownRenderer({ content }) {
    const [copiedCode, setCopiedCode] = useState(null);

    const copyToClipboard = (code, index) => {
        navigator.clipboard.writeText(code);
        setCopiedCode(index);
        setTimeout(() => setCopiedCode(null), 2000);
    };

    const components = {
        // Code blocks with syntax highlighting
        code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            const codeString = String(children).replace(/\n$/, '');
            const codeIndex = `${codeString.substring(0, 20)}-${Math.random()}`;

            return !inline && match ? (
                <div className="code-block-wrapper group relative my-6">
                    {/* Language badge */}
                    <div className="flex items-center justify-between bg-vscode-surface border-b border-vscode-border px-4 py-2 rounded-t-lg">
                        <span className="text-xs font-mono text-vscode-muted uppercase tracking-wider">
                            {match[1]}
                        </span>
                        <button
                            onClick={() => copyToClipboard(codeString, codeIndex)}
                            className="text-xs px-3 py-1 rounded bg-vscode-bg hover:bg-vscode-accent/20 text-vscode-muted hover:text-vscode-accent transition-all duration-200"
                        >
                            {copiedCode === codeIndex ? '✓ Copied!' : 'Copy'}
                        </button>
                    </div>
                    <SyntaxHighlighter
                        style={vscDarkPlus}
                        language={match[1]}
                        PreTag="div"
                        className="!mt-0 !rounded-t-none !rounded-b-lg !bg-vscode-surface border border-t-0 border-vscode-border"
                        customStyle={{
                            margin: 0,
                            padding: '1.25rem',
                            fontSize: '0.875rem',
                            lineHeight: '1.7',
                        }}
                        {...props}
                    >
                        {codeString}
                    </SyntaxHighlighter>
                </div>
            ) : (
                <code
                    className="px-2 py-0.5 rounded bg-vscode-surface text-vscode-accent border border-vscode-border font-mono text-sm"
                    {...props}
                >
                    {children}
                </code>
            );
        },

        // Headings with gradient and anchor links
        h1({ children, ...props }) {
            return (
                <h1
                    className="text-4xl md:text-5xl font-bold mb-6 mt-12 first:mt-0 bg-gradient-to-r from-white via-vscode-accent to-vscode-function bg-clip-text text-transparent"
                    {...props}
                >
                    {children}
                </h1>
            );
        },

        h2({ children, ...props }) {
            return (
                <h2
                    className="text-3xl md:text-4xl font-bold mb-5 mt-10 text-white border-b border-vscode-border pb-3"
                    {...props}
                >
                    {children}
                </h2>
            );
        },

        h3({ children, ...props }) {
            return (
                <h3
                    className="text-2xl md:text-3xl font-semibold mb-4 mt-8 text-white"
                    {...props}
                >
                    {children}
                </h3>
            );
        },

        h4({ children, ...props }) {
            return (
                <h4
                    className="text-xl md:text-2xl font-semibold mb-3 mt-6 text-vscode-text"
                    {...props}
                >
                    {children}
                </h4>
            );
        },

        h5({ children, ...props }) {
            return (
                <h5
                    className="text-lg md:text-xl font-semibold mb-3 mt-5 text-vscode-text"
                    {...props}
                >
                    {children}
                </h5>
            );
        },

        h6({ children, ...props }) {
            return (
                <h6
                    className="text-base md:text-lg font-semibold mb-2 mt-4 text-vscode-muted"
                    {...props}
                >
                    {children}
                </h6>
            );
        },

        // Paragraphs
        p({ children, ...props }) {
            return (
                <p
                    className="mb-5 leading-relaxed text-vscode-text text-base md:text-lg"
                    {...props}
                >
                    {children}
                </p>
            );
        },

        // Links with hover effects
        a({ href, children, ...props }) {
            const isExternal = href?.startsWith('http');
            return (
                <a
                    href={href}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                    className="text-vscode-accent hover:text-vscode-string underline decoration-vscode-accent/30 hover:decoration-vscode-string transition-all duration-200 font-medium"
                    {...props}
                >
                    {children}
                    {isExternal && <span className="ml-1 text-xs">↗</span>}
                </a>
            );
        },

        // Blockquotes
        blockquote({ children, ...props }) {
            return (
                <blockquote
                    className="border-l-4 border-vscode-accent pl-6 py-2 my-6 italic text-vscode-muted bg-vscode-surface/50 rounded-r-lg"
                    {...props}
                >
                    {children}
                </blockquote>
            );
        },

        // Unordered lists
        ul({ children, ...props }) {
            return (
                <ul
                    className="list-none space-y-2 my-5 ml-6"
                    {...props}
                >
                    {children}
                </ul>
            );
        },

        // Ordered lists
        ol({ children, ...props }) {
            return (
                <ol
                    className="list-decimal list-inside space-y-2 my-5 ml-6 marker:text-vscode-accent marker:font-bold"
                    {...props}
                >
                    {children}
                </ol>
            );
        },

        // List items
        li({ children, ...props }) {
            return (
                <li
                    className="text-vscode-text leading-relaxed pl-2 before:content-['▹'] before:text-vscode-accent before:mr-3 before:font-bold"
                    {...props}
                >
                    <span className="inline-block">{children}</span>
                </li>
            );
        },

        // Tables
        table({ children, ...props }) {
            return (
                <div className="overflow-x-auto my-8">
                    <table
                        className="min-w-full border border-vscode-border rounded-lg overflow-hidden"
                        {...props}
                    >
                        {children}
                    </table>
                </div>
            );
        },

        thead({ children, ...props }) {
            return (
                <thead
                    className="bg-vscode-surface border-b-2 border-vscode-accent"
                    {...props}
                >
                    {children}
                </thead>
            );
        },

        tbody({ children, ...props }) {
            return (
                <tbody {...props}>
                    {children}
                </tbody>
            );
        },

        tr({ children, ...props }) {
            return (
                <tr
                    className="border-b border-vscode-border hover:bg-vscode-surface/50 transition-colors duration-150"
                    {...props}
                >
                    {children}
                </tr>
            );
        },

        th({ children, ...props }) {
            return (
                <th
                    className="px-6 py-3 text-left text-sm font-semibold text-white uppercase tracking-wider"
                    {...props}
                >
                    {children}
                </th>
            );
        },

        td({ children, ...props }) {
            return (
                <td
                    className="px-6 py-4 text-vscode-text"
                    {...props}
                >
                    {children}
                </td>
            );
        },

        // Horizontal rule
        hr({ ...props }) {
            return (
                <hr
                    className="my-8 border-t-2 border-vscode-border"
                    {...props}
                />
            );
        },

        // Images
        img({ src, alt, ...props }) {
            return (
                <img
                    src={src}
                    alt={alt}
                    className="rounded-lg shadow-lg my-6 max-w-full h-auto border border-vscode-border"
                    {...props}
                />
            );
        },

        // Strong/Bold
        strong({ children, ...props }) {
            return (
                <strong
                    className="font-bold text-white"
                    {...props}
                >
                    {children}
                </strong>
            );
        },

        // Emphasis/Italic
        em({ children, ...props }) {
            return (
                <em
                    className="italic text-vscode-string"
                    {...props}
                >
                    {children}
                </em>
            );
        },
    };

    return (
        <div className="markdown-content">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={components}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}
