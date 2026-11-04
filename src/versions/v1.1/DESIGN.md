# Portfolio Design Principles

These principles define the visual and functional identity of the portfolio, ensuring a consistent, professional, and developer-centric user experience.

## 1. Visual Identity: The Developer Aesthetic

The core theme is inspired by modern development environments (primarily VS Code and GitHub).

### Color Palette (VS Code Tokens)

| Token          | Variable                  | Hex       | Usage                                          |
| :------------- | :------------------------ | :-------- | :--------------------------------------------- |
| **Background** | `--color-vscode-bg`       | `#0d1117` | Main page background                           |
| **Surface**    | `--color-vscode-surface`  | `#161b22` | Cards, panels, secondary backgrounds           |
| **Border**     | `--color-vscode-border`   | `#30363d` | Dividers, card strokes, UI structure           |
| **Accent**     | `--color-vscode-accent`   | `#58a6ff` | Primary actions, highlights, folder/file icons |
| **Text**       | `--color-vscode-text`     | `#c9d1d9` | Primary body text                              |
| **Muted**      | `--color-vscode-muted`    | `#8b949e` | Labels, placeholders, subtitle text            |
| **Keyword**    | `--color-vscode-keyword`  | `#ff7b72` | Critical labels, technical skill icons         |
| **Function**   | `--color-vscode-function` | `#d2a8ff` | Section headers, special tags                  |
| **String**     | `--color-vscode-string`   | `#a5d6ff` | Hobby tags, success indicators                 |

### Typography & Sizing

| Font        | Variable         | Stack                  | Usage                                 |
| :---------- | :--------------- | :--------------------- | :------------------------------------ |
| **Display** | `--font-display` | `Outfit, sans-serif`   | Major headings (Hero, Section Titles) |
| **Sans**    | `--font-sans`    | `Inter, sans-serif`    | Body copy, descriptions               |
| **Mono**    | `--font-mono`    | `Fira Code, monospace` | Labels, stats, prompts, setup keys    |

#### Text Scale

- **H1 (Hero Name)**: `text-4xl` (Mobile) → `text-5xl` (Tablet) → `text-6xl` (Desktop)
- **H2 (Section Header)**: `text-3xl` (About Me), `text-2xl` (Skills/Setup)
- **Body Content**: `text-lg` for bio, `text-sm/base` for general descriptions.
- **Labels/Mono**: `text-xs` or `text-sm` font-mono.

## 2. Structural & Layout Standards

- **Container**: Max width of `max-w-6xl` for most content pages; `max-w-7xl` for projects grid.
- **Padding**:
  - Section-level: `py-12 px-4` (Mobile) → `px-8` (Desktop).
  - Component-level: `p-4` (Mobile) → `p-10` (Desktop Card Content).
- **The "File" Motif**: Always use a header simulating a VS Code file tab (`README.md`) for primary content buckets.
  - **Window Controls**: Circle icons with exact hex values: Red (`#ff5f56`), Yellow (`#ffbd2e`), Green (`#27c93f`).
- **Dividers**: Section headers must include a horizontal rule (`h-px flex-1 bg-vscode-border`) following the title.

## 3. Interaction Design

- **Animation Entry**: Standardize on `animate-fade-in-up` (0.6s ease-out) for all major page components.
- **Elevation**: Avoid heavy shadows. Use `border border-vscode-border` with `bg-vscode-bg` and a very subtle `shadow-xl`.

### Hover Patterns

1. **Developer Grids (Skills)**: `border-vscode-border` → `hover:border-vscode-accent`.
2. **Setup Items**: `bg-vscode-surface/50` → `hover:bg-vscode-surface`.
3. **Hero Image**: Grayscale (`grayscale`) → Color (`grayscale-0`) with a glow effect via `bg-gradient-to-r`.
4. **Social Links**: `-translate-y-1` with `shadow-lg` and accent color transition.

## 4. Content Philosophy

- **Category Over Chaos**: Organize technical data into categorized panels (Hardware, Software, etc.) using `Object.entries` mapping for clean data-driven UI.
- **Visual Scannability**: Use mono-spaced labels (muted) on the left and primary values (text) on the right for technical specs.
- **Iconography**: Use `react-icons/fi` (Feather Icons) for a thin, clean developer look. Stroke width should feel consistent across the site.

## 5. Implementation Rules

- Always use `@apply` with Tailwind tokens for component styles.
- Never use hardcoded hex values in JSX unless they are the system controls.
- Maintain a selection color that matches the brand: `selection:bg-vscode-accent selection:text-vscode-bg`.
