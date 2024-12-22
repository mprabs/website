import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { marked } from "marked";

const blogFiles = import.meta.glob("../BlogFiles/*.md", {
  as: "raw",
  eager: false,
});

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [htmlContent, setHtmlContent] = useState<string>("");

  useEffect(() => {
    const fullPath = `../BlogFiles/${slug}.md`;

    if (fullPath in blogFiles) {
      const fetchContent = async () => {
        const markdownContent = await blogFiles[fullPath]();
        const parsedContent = marked(markdownContent);
        setHtmlContent(parsedContent);
      };

      fetchContent();
    } else {
      console.error(`File not found: ${slug}`);
    }
  }, [slug]);

  return (
    <div className="blog-post-container">
      <button onClick={() => navigate("/blogs")} className="back-button">
        &larr; Back to Blogs
      </button>
      {htmlContent && <div className="content" dangerouslySetInnerHTML={{ __html: htmlContent }} />}
    </div>
  );
};

export default BlogPost;
