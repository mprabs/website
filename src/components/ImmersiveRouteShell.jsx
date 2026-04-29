export default function ImmersiveRouteShell({
  eyebrow,
  title,
  description,
  children,
  className = "",
}) {
  return (
    <section className={`immersive-route-shell pointer-events-auto ${className}`}>
      <div className="immersive-route-shell__backdrop" />
      <div className="immersive-route-shell__header">
        <span className="immersive-route-shell__eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        {description ? <p>{description}</p> : null}
      </div>
      <div className="immersive-route-shell__body">{children}</div>
    </section>
  );
}
