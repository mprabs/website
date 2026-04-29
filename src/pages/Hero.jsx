import { Suspense, lazy, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiCompass, FiMove, FiMousePointer, FiPlay, FiX } from "react-icons/fi";

const FPSHouseScene = lazy(() => import("../components/FPSHouseScene"));

const defaultZone = {
  label: "Front Gate",
  hint: "Walk toward the house and use the doors to discover the rooms.",
};

export default function Hero() {
  const [locked, setLocked] = useState(false);
  const [zone, setZone] = useState(defaultZone);
  const [lockRequestCount, setLockRequestCount] = useState(0);

  useEffect(() => {
    const handlePointerLockChange = () => {
      setLocked(Boolean(document.pointerLockElement));
    };

    document.addEventListener("pointerlockchange", handlePointerLockChange);

    return () => {
      document.removeEventListener(
        "pointerlockchange",
        handlePointerLockChange
      );
    };
  }, []);

  return (
    <div className="game-home">
      <div className="game-canvas-shell">
        <Suspense fallback={null}>
          <FPSHouseScene
            onZoneChange={setZone}
            lockRequestCount={lockRequestCount}
          />
        </Suspense>
      </div>

      <div className="game-crosshair" aria-hidden="true" />

      <div className="game-hud">
        <div className="game-hud-top">
          <div className="game-status-card">
            <span className="game-status-label">Current Room</span>
            <strong>{zone.label}</strong>
            <p>{zone.hint}</p>
          </div>

          <div className="game-status-card game-status-card-small">
            <span className="game-status-label">Controls</span>
            <div className="game-control-list">
              <span>
                <FiMove />
                <span>`WASD` move</span>
              </span>
              <span>
                <FiMousePointer />
                <span>Mouse look</span>
              </span>
              <span>
                <FiCompass />
                <span>`Shift` sprint</span>
              </span>
            </div>
          </div>
        </div>

        <div className="game-hud-bottom">
          <button
            type="button"
            className="game-enter-button"
            onClick={() => setLockRequestCount((count) => count + 1)}
          >
            <FiPlay />
            <span>{locked ? "Resume World" : "Enter World"}</span>
          </button>

          <Link to="/about" className="game-exit-link">
            <FiX />
            <span>Exit To Routes</span>
          </Link>
        </div>
      </div>

      {!locked && (
        <div className="game-overlay">
          <div className="game-overlay-panel">
            <span className="game-overlay-eyebrow">Playable Portfolio Prototype</span>
            <h1>Free-roam through the house like a first-person game.</h1>
            <p>
              Click to lock the pointer, then explore the rooms with `WASD`.
              This route is intentionally game-first and stripped away from the
              usual website layout.
            </p>
            <button
              type="button"
              className="game-enter-button game-enter-button-large"
              onClick={() => setLockRequestCount((count) => count + 1)}
            >
              <FiPlay />
              <span>Start Exploring</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
