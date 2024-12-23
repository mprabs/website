import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { marked } from "marked";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";
import Meta from "../../components/Meta";

const blogFiles = import.meta.glob("../BlogFiles/*.md", {
  as: "raw",
  eager: false,
});

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [content, setContent] = useState<JSX.Element[]>([]);
  const [blogTitle, setBlogTitle] = useState<string>("");

  useEffect(() => {
    const fullPath = `../BlogFiles/${slug}.md`;

    if (fullPath in blogFiles) {
      const fetchContent = async () => {
        try {
          const markdownFetcher = blogFiles[fullPath] as () => Promise<string>;
          const markdownContent = await markdownFetcher();

          // Extract title and date, then remove from the content
          const titleMatch = markdownContent.match(/^title:\s*(.*)/m);
          const dateMatch = markdownContent.match(/^date:\s*(.*)/m);
          const title = titleMatch ? titleMatch[1] : "";
          const date = dateMatch ? dateMatch[1] : "";

          // Remove title and date lines from markdown content
          let cleanedMarkdown = markdownContent.replace(/^title:.*\n?/m, "").replace(/^date:.*\n?/m, "");

          // Parse the cleaned markdown content to HTML
          const parsedContent: string = marked.parse(cleanedMarkdown) as string;
          // Split the content into HTML and code blocks
          const regex = /<pre><code class="language-(\w+)">([\s\S]*?)<\/code><\/pre>/g;
          let match;
          const result: JSX.Element[] = [];
          let lastIndex = 0;

          // Helper function to decode HTML entities
          const decodeHtmlEntities = (str: string) => {
            const doc = new DOMParser().parseFromString(str, "text/html");
            return doc.documentElement.textContent || "";
          };

          setBlogTitle(title);

          // Add title and date in separate elements within a div
          result.push(
            <div key="metadata" className="post-metadata">
              <h1 className="post-title">{title}</h1>
              <p className="post-date">Created Date: {date}</p>
            </div>
          );

          // Process the HTML content and inject SyntaxHighlighter for code blocks
          while ((match = regex.exec(parsedContent)) !== null) {
            // Add non-code content as raw HTML
            result.push(<div key={lastIndex} dangerouslySetInnerHTML={{ __html: parsedContent.slice(lastIndex, match.index) }} />);
            // Decode HTML entities in the code block content and replace with SyntaxHighlighter
            const decodedCode = decodeHtmlEntities(match[2]);
            result.push(
              <SyntaxHighlighter key={match.index} language={match[1]} style={solarizedlight}>
                {decodedCode}
              </SyntaxHighlighter>
            );
            lastIndex = regex.lastIndex;
          }

          // Add the remaining non-code content
          result.push(<div key={lastIndex} dangerouslySetInnerHTML={{ __html: parsedContent.slice(lastIndex) }} />);

          setContent(result);
        } catch (error) {
          console.error("Error fetching or parsing content:", error);
        }
      };

      fetchContent();
    } else {
      console.error(`File not found: ${slug}`);
    }
  }, [slug]);

  return (
    <div className="blog-post-container">
      <Meta title={blogTitle} description={JSON.stringify(content)} tags={blogTitle.split(" ")} />

      <button onClick={() => navigate("/blogs")} className="back-button">
        ← Back to Blogs
      </button>
      <div className="content">{content}</div>
    </div>
  );
};

export default BlogPost;
