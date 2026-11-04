import { useState } from "react";
import { profile, social } from "../../../content";
import { copy } from "../copy";
import { TextLink } from "./Page";
import { Sparkle, Star, Underline } from "./doodles";

const text = copy.letter;
const { email, formEndpoint } = profile.contact;
const EMPTY = { name: "", email: "", message: "" };

export function LetterPage() {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState("idle");

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const send = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const response = await fetch(formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error(`Form endpoint returned ${response.status}`);
      setStatus("sent");
      setForm(EMPTY);
    } catch (error) {
      console.error("Letter failed to send:", error);
      setStatus("failed");
    }
  };

  const sending = status === "sending";

  return (
    <div className="letter">
      <form className="letter__form" onSubmit={send}>
        {Object.entries(text.fields).map(([field, { label, placeholder }]) => {
          const Control = field === "message" ? "textarea" : "input";
          return (
            <label key={field} className="letter__field">
              <span className="label">{label}</span>
              <Control
                type={field === "email" ? "email" : field === "name" ? "text" : undefined}
                name={field}
                value={form[field]}
                onChange={update(field)}
                placeholder={placeholder}
                rows={field === "message" ? 4 : undefined}
                required
                disabled={sending}
              />
            </label>
          );
        })}
        <div className="letter__send">
          <button type="submit" className="sketch-button sketch-button--solid" disabled={sending}>
            {sending ? text.submitting : text.submit}
          </button>
          <p className="letter__status" role="status">
            {status === "sent" && text.success}
            {status === "failed" && text.error(email)}
          </p>
        </div>
      </form>

      <p className="label letter__elsewhere">{text.elsewhere}</p>
      <ul className="letter__links">
        {social.map((link) => (
          <li key={link.id}>
            <TextLink href={link.url}>{link.id === "email" ? link.handle : link.name}</TextLink>
          </li>
        ))}
        <li>
          <TextLink href={profile.resume.url} download={profile.resume.fileName}>
            {text.resume}
          </TextLink>
        </li>
      </ul>
    </div>
  );
}

export function EndPage({ ctx }) {
  return (
    <div className="end">
      <p className="end__heading">
        {copy.end.heading}
        <Underline className="end__underline" />
      </p>
      <div className="end__stars" aria-hidden="true">
        <Star className="end__star end__star--a" />
        <Sparkle className="end__star end__star--b" />
        <Star className="end__star end__star--c" />
      </div>
      <p className="end__colophon">{copy.end.colophon}</p>
      <div className="end__actions">
        <button type="button" className="sketch-button" onClick={() => ctx.goToPage("contents")}>
          {copy.end.toContents}
        </button>
        <button type="button" className="sketch-button sketch-button--solid" onClick={ctx.closeBook}>
          {copy.end.close}
        </button>
      </div>
    </div>
  );
}
