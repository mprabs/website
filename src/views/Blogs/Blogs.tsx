import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Blogs.scss";
import Meta from "../../components/Meta";

const blogFiles = import.meta.glob("../BlogFiles/*.md", {
  as: "raw",
  eager: true, // Eagerly load content to access headers
});

interface BlogFile {
  title: string;
  fileName: string;
  date: string;
  contentSnippet: string; // Add a new property to store the content snippet
}

const Blog = () => {
  const [files, setFiles] = useState<BlogFile[]>([]);

  useEffect(() => {
    const parsedFiles = Object.entries(blogFiles).map(([filePath, fileContent]) => {
      const fileName = filePath.split("/").pop() || "";

      // Manually extract frontmatter (title and date)
      const frontmatterEnd = (fileContent as string).indexOf("\n\n");
      const frontmatter = (fileContent as string).slice(0, frontmatterEnd);
      const lines = frontmatter.split("\n");

      // Default values
      let title = fileName.replace(".md", "");
      let date = "";
      let contentSnippet = "";

      // Loop through the lines to find title and date
      lines.forEach((line) => {
        if (line.startsWith("title:")) {
          title = line.replace("title:", "").trim();
        }
        if (line.startsWith("date:")) {
          date = line.replace("date:", "").trim();
        }
      });

      // Extract the content after the frontmatter
      const content = (fileContent as string).slice(frontmatterEnd).trim();

      // Create a snippet (first 100 characters or adjust as needed)
      contentSnippet = content.length > 100 ? content.slice(0, 100) + "..." : content;

      return { title, fileName, date, contentSnippet };
    });

    setFiles(parsedFiles);
  }, []);

  return (
    <div className="blog-list-container">
      <Meta
        title="My Blogs"
        description="This is a list of my blogs. Check them out!"
        tags={["Blog", "Prabin Acharya", "FrontEnd Developer", "Web Development"]}
      />

      <h3>My Blogs</h3>

      <ol className="file-list">
        {files.map(({ title, fileName, date, contentSnippet }) => (
          <Link to={`/blog/${fileName.replace(".md", "")}`} className="file-link" key={fileName}>
            <li>
              <div className="blog-item">
                <div className="blog-title">{title}</div>
                {date && <div className="blog-date">{date}</div>} {/* Show date if available */}
              </div>
            </li>
          </Link>
        ))}
      </ol>
    </div>
  );
};

export default Blog;
