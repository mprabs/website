import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Blogs.scss";

const blogFiles = import.meta.glob("../BlogFiles/*.md", {
  as: "raw",
  eager: true, // Eagerly load content to access headers
});

interface BlogFile {
  title: string;
  fileName: string;
}

const Blog = () => {
  const [files, setFiles] = useState<BlogFile[]>([]);

  useEffect(() => {
    const parsedFiles = Object.entries(blogFiles).map(([filePath, fileContent]) => {
      const fileName = filePath.split("/").pop() || "";
      const firstLine = (fileContent as string).split("\n")[0]; // Get the first line of the content
      const title = firstLine.startsWith("#") ? firstLine.replace("#", "").trim() : fileName.replace(".md", ""); // Extract title or fallback to filename
      return { title, fileName };
    });
    setFiles(parsedFiles);
  }, []);

  return (
    <div className="blog-list-container">
      <ol className="file-list">
        {files.map(({ title, fileName }) => (
          <Link to={`/blog/${fileName.replace(".md", "")}`} className="file-link">
            <li key={fileName}>{title}</li>
          </Link>
        ))}
      </ol>
    </div>
  );
};

export default Blog;
