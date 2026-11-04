import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import BookExperience from "./BookExperience";
import { copy } from "./copy";
import "./styles.css";

export default function App() {
  useEffect(() => {
    document.title = copy.titles["/"];
  }, []);

  return (
    <Routes>
      <Route path="/" element={<BookExperience />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
