import { useState } from "react";
import { blogPosts } from "../data/data";
import MarkdownRenderer from "../components/MarkdownRenderer";
import { FiBook, FiChevronRight } from "react-icons/fi";
import WindowFrame from "../components/WindowFrame";

export default function Blogs() {
  const [selectedPost, setSelectedPost] = useState(null);
  const [markdownContent, setMarkdownContent] = useState("");

  const handleReadPost = async (post) => {
    if (post.isMarkdown) {
      try {
        const response = await fetch(post.url);
        const text = await response.text();
        setMarkdownContent(text);
        setSelectedPost(post);
      } catch (error) {
        console.error("Error loading post:", error);
      }
    } else {
      window.location.href = post.url;
    }
  };

  return (
    <section className="pt-2 pb-8 sm:py-12 md:py-20 px-4 sm:px-6 max-w-6xl mx-auto pointer-events-auto">
      <div className="flex items-center gap-3 mb-12 border-b border-vscode-border pb-4">
        <h2 className="text-3xl font-bold flex items-center gap-2">
          <span className="text-vscode-accent">04.</span> My Blogs
        </h2>
      </div>

      <div className="animate-fade-in-up">
        {selectedPost ? (
          <WindowFrame
            title={`${selectedPost.title.toLowerCase().replace(/\s+/g, "_")}.md`}
            icon={FiBook}
            containerClassName="animate-fade-in"
          >
            <div className="p-6 md:p-12">
              <button
                onClick={() => setSelectedPost(null)}
                className="mb-8 text-vscode-accent hover:text-vscode-string flex items-center gap-2 transition-colors duration-200 group font-mono text-sm"
              >
                <span className="group-hover:-translate-x-1 transition-transform duration-200">
                  ←
                </span>
                cd ../articles
              </button>
              <article className="max-w-4xl mx-auto prose prose-invert prose-vscode">
                <MarkdownRenderer content={markdownContent} />
              </article>
            </div>
          </WindowFrame>
        ) : (
          <WindowFrame
            title="articles.index"
            icon={FiBook}
            containerClassName="animate-fade-in"
          >
            <div className="bg-vscode-surface/20">
            <div className="hidden md:grid md:grid-cols-[128px_1fr_120px] md:gap-6 px-6 py-3 border-b border-vscode-border bg-vscode-bg/35 text-[11px] font-mono uppercase tracking-[0.12em] text-vscode-muted">
              <span>Date</span>
              <span>Post</span>
              <span className="text-right">Read</span>
            </div>

            {blogPosts.map((post, index) => (
              <article
                key={index}
                className="group border-b border-vscode-border/80 last:border-b-0 transition-colors duration-200 hover:bg-vscode-surface/45"
              >
                <div className="px-4 py-4 md:px-6 md:py-5 grid gap-3 md:gap-6 md:grid-cols-[128px_1fr_120px] md:items-center">
                  <div className="text-xs font-mono text-vscode-muted md:text-sm">
                    {post.date}
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-vscode-accent transition-colors leading-tight">
                      {post.title}
                    </h3>
                    <p className="mt-1.5 text-sm md:text-[15px] text-vscode-text/80 leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="md:justify-self-end">
                    <button
                      onClick={() => handleReadPost(post)}
                      className="inline-flex items-center gap-1.5 text-vscode-accent hover:text-white transition-colors duration-200 font-mono text-xs md:text-sm"
                    >
                      Open
                      <FiChevronRight className="transition-transform duration-200 group-hover:translate-x-0.5" />
                    </button>
                  </div>
                </div>
              </article>
            ))}

            {!blogPosts.length && (
              <div className="p-8 text-center">
                <p className="text-vscode-muted text-sm font-mono">
                  No blog posts published yet.
                </p>
              </div>
            )}
            </div>
          </WindowFrame>
        )}
      </div>
    </section>
  );
}
