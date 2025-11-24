import { useState } from 'react';
import { blogPosts } from '../data/data';
import MarkdownRenderer from '../components/MarkdownRenderer';

export default function Blogs() {
    const [selectedPost, setSelectedPost] = useState(null);
    const [markdownContent, setMarkdownContent] = useState('');

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
        <section className="py-20 px-4 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 flex items-center gap-2">
                <span className="text-vscode-accent">05.</span> My Blogs
            </h2>

            {selectedPost ? (
                <div className="bg-vscode-surface/50 backdrop-blur-sm p-8 md:p-12 rounded-lg border border-vscode-border animate-fade-in">
                    <button
                        onClick={() => setSelectedPost(null)}
                        className="mb-8 text-vscode-accent hover:text-vscode-string flex items-center gap-2 transition-colors duration-200 group"
                    >
                        <span className="group-hover:-translate-x-1 transition-transform duration-200">←</span>
                        Back to Articles
                    </button>
                    <article className="max-w-4xl mx-auto">
                        <MarkdownRenderer content={markdownContent} />
                    </article>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 gap-8">
                    {blogPosts.map((post, index) => (
                        <article
                            key={index}
                            className="bg-vscode-surface/50 backdrop-blur-sm p-6 rounded-lg border border-vscode-border hover:border-vscode-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-vscode-accent/10"
                        >
                            <h3 className="text-xl font-semibold mb-2 text-white">{post.title}</h3>
                            <p className="text-vscode-muted mb-4 leading-relaxed">{post.excerpt}</p>
                            <div className="flex items-center justify-between">
                                <button
                                    onClick={() => handleReadPost(post)}
                                    className="text-vscode-accent hover:text-vscode-string transition-colors duration-200 group flex items-center gap-2"
                                >
                                    Read Article
                                    <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                                </button>
                                <span className="text-sm text-vscode-muted">{post.date}</span>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </section>
    )
}