import { useState } from "react";
import { blogPosts } from "../data/data";
import MarkdownRenderer from "../components/MarkdownRenderer";
import { FiBook } from "react-icons/fi";
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
    <section className="pt-2 pb-8 sm:py-12 md:py-20 px-4 max-w-6xl mx-auto pointer-events-auto">
      <div className="flex items-center gap-3 mb-12 border-b border-vscode-border pb-4">
        <h2 className="text-3xl font-bold flex items-center gap-2">
          <span className="text-vscode-accent">04.</span> My Blogs
        </h2>
      </div>

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
        <div className="grid md:grid-cols-2 gap-8">
          {blogPosts.map((post, index) => (
            <article
              key={index}
              className="bg-vscode-surface/50 border border-vscode-border p-6 rounded-xl hover:border-vscode-accent hover:bg-vscode-surface transition-all duration-300 group hover:shadow-lg hover:shadow-vscode-accent/5 hover:-translate-y-1"
            >
              <div className="flex justify-between items-start mb-4">
                <FiBook className="text-vscode-muted group-hover:text-vscode-accent transition-colors" />
                <span className="text-xs font-mono text-vscode-muted">
                  {post.date}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white group-hover:text-vscode-accent transition-colors">
                {post.title}
              </h3>
              <p className="text-vscode-text/80 mb-6 leading-relaxed text-sm line-clamp-3">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <button
                  onClick={() => handleReadPost(post)}
                  className="text-vscode-accent hover:text-white transition-colors duration-200 group/btn flex items-center gap-2 font-mono text-sm"
                >
                  Read More
                  <span className="group-hover/btn:translate-x-1 transition-transform duration-200">
                    →
                  </span>
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
