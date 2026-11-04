import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { copy } from "../copy";

// A blog post, laid over the book like a loose manuscript sheet.
export default function Manuscript({ post, onClose }) {
  const [state, setState] = useState({ status: "loading", text: "" });
  const closeRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    fetch(post.url)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.text();
      })
      .then((text) => !cancelled && setState({ status: "ready", text }))
      .catch((error) => {
        console.error("Manuscript failed to load:", error);
        if (!cancelled) setState({ status: "failed", text: "" });
      });
    return () => {
      cancelled = true;
    };
  }, [post.url]);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="manuscript" role="dialog" aria-modal="true" aria-label={post.title}>
      <button type="button" className="manuscript__backdrop" aria-label={copy.writing.close} onClick={onClose} />
      <article className="manuscript__sheet">
        <header className="manuscript__header">
          <p className="manuscript__date">{post.date}</p>
          <button ref={closeRef} type="button" className="manuscript__close" onClick={onClose}>
            {copy.writing.close} ✕
          </button>
        </header>
        <div className="manuscript__body">
          {state.status === "loading" && <p className="manuscript__note">{copy.writing.loading}</p>}
          {state.status === "failed" && <p className="manuscript__note">{copy.writing.failed}</p>}
          {state.status === "ready" && <ReactMarkdown remarkPlugins={[remarkGfm]}>{state.text}</ReactMarkdown>}
        </div>
      </article>
    </div>
  );
}
