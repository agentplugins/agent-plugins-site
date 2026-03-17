/**
 * Terminal UI utilities.
 *
 * Zero-dependency styled terminal output using ANSI escape codes.
 * Inspired by the @clack/prompts aesthetic.
 */

const isColorSupported =
  process.env.FORCE_COLOR !== "0" &&
  !process.env.NO_COLOR &&
  (process.env.FORCE_COLOR !== undefined || process.stdout.isTTY);

// -- ANSI helpers -----------------------------------------------------------

function ansi(code: string) {
  return isColorSupported ? `\x1b[${code}m` : "";
}

const reset = ansi("0");
const bold = ansi("1");
const dim = ansi("2");
const italic = ansi("3");
const underline = ansi("4");
const red = ansi("31");
const green = ansi("32");
const yellow = ansi("33");
const blue = ansi("34");
const magenta = ansi("35");
const cyan = ansi("36");
const gray = ansi("90");
const bgGreen = ansi("42");
const bgRed = ansi("41");
const bgYellow = ansi("43");
const bgCyan = ansi("46");
const black = ansi("30");

// -- Public color functions -------------------------------------------------

export const c = {
  bold: (s: string) => `${bold}${s}${reset}`,
  dim: (s: string) => `${dim}${s}${reset}`,
  italic: (s: string) => `${italic}${s}${reset}`,
  underline: (s: string) => `${underline}${s}${reset}`,
  red: (s: string) => `${red}${s}${reset}`,
  green: (s: string) => `${green}${s}${reset}`,
  yellow: (s: string) => `${yellow}${s}${reset}`,
  blue: (s: string) => `${blue}${s}${reset}`,
  magenta: (s: string) => `${magenta}${s}${reset}`,
  cyan: (s: string) => `${cyan}${s}${reset}`,
  gray: (s: string) => `${gray}${s}${reset}`,
  bgGreen: (s: string) => `${bgGreen}${black}${s}${reset}`,
  bgRed: (s: string) => `${bgRed}${black}${s}${reset}`,
  bgYellow: (s: string) => `${bgYellow}${black}${s}${reset}`,
  bgCyan: (s: string) => `${bgCyan}${black}${s}${reset}`,
};

// -- Symbols ----------------------------------------------------------------

export const S = {
  // Box drawing
  bar: "│",
  barEnd: "└",
  barStart: "┌",
  barH: "─",
  corner: "╮",

  // Bullets
  diamond: "◇",
  diamondFilled: "◆",
  bullet: "●",
  circle: "○",
  check: "✔",
  cross: "✖",
  arrow: "→",
  warning: "▲",
  info: "ℹ",
  step: "◇",
  stepActive: "◆",
  stepComplete: "●",
  stepError: "■",
};

// -- Layout helpers ---------------------------------------------------------

/** Print a bar-connected line: `│  <content>` */
export function barLine(content: string = "") {
  console.log(`${c.gray(S.bar)}  ${content}`);
}

/** Print an empty bar line */
export function barEmpty() {
  console.log(`${c.gray(S.bar)}`);
}

/** Print a step line: `◇  <content>` */
export function step(content: string) {
  console.log(`${c.gray(S.step)}  ${content}`);
}

/** Print a completed step: `●  <content>` (green) */
export function stepDone(content: string) {
  console.log(`${c.green(S.stepComplete)}  ${content}`);
}

/** Print an active/prompt step: `◆  <content>` (cyan) */
export function stepActive(content: string) {
  console.log(`${c.cyan(S.stepActive)}  ${content}`);
}

/** Print an error step: `■  <content>` (red) */
export function stepError(content: string) {
  console.log(`${c.red(S.stepError)}  ${content}`);
}

/** Print a header box with a label */
export function header(label: string) {
  console.log();
  console.log(`${c.gray(S.barStart)}  ${c.bgCyan(` ${label} `)}`);
}

/** Print a footer/end bar */
export function footer(message?: string) {
  if (message) {
    console.log(`${c.gray(S.barEnd)}  ${message}`);
  } else {
    console.log(`${c.gray(S.barEnd)}`);
  }
}

/** Print an error message block */
export function error(title: string, details?: string[]) {
  console.log(`${c.red(S.stepError)}  ${c.red(c.bold(title))}`);
  if (details) {
    for (const line of details) {
      barLine(c.dim(line));
    }
  }
}

/** Print a warning message */
export function warn(message: string) {
  barLine(`${c.yellow(S.warning)}  ${c.yellow(message)}`);
}

// -- Multi-select prompt ----------------------------------------------------

export interface MultiSelectOption {
  label: string;
  value: string;
  hint?: string;
}

/**
 * Interactive search multi-select prompt.
 * Type to filter, arrow keys to navigate, space to toggle, enter to confirm.
 * Shows a scrolling window of max 8 items with scroll indicators.
 * All items start selected. Returns selected values, or null if cancelled.
 *
 * Matches the skills CLI's search-multiselect aesthetic.
 */
export async function multiSelect(
  title: string,
  options: MultiSelectOption[],
  maxVisible = 8,
): Promise<string[] | null> {
  if (!process.stdin.isTTY) {
    return options.map((o) => o.value);
  }

  const { createInterface, emitKeypressEvents } = await import("readline");
  const { Writable } = await import("stream");

  // Silent output to prevent readline echo
  const silentOutput = new Writable({
    write(_chunk: any, _encoding: any, callback: () => void) {
      callback();
    },
  });

  return new Promise<string[] | null>((resolve) => {
    const rl = createInterface({
      input: process.stdin,
      output: silentOutput,
      terminal: false,
    });

    if (process.stdin.isTTY) {
      process.stdin.setRawMode(true);
    }
    emitKeypressEvents(process.stdin, rl);

    let query = "";
    let cursor = 0;
    const selected = new Set(options.map((o) => o.value));
    let lastRenderHeight = 0;

    const filter = (item: MultiSelectOption, q: string): boolean => {
      if (!q) return true;
      const lq = q.toLowerCase();
      return item.label.toLowerCase().includes(lq) || (item.hint?.toLowerCase().includes(lq) ?? false);
    };

    const getFiltered = () => options.filter((item) => filter(item, query));

    const clearRender = () => {
      if (lastRenderHeight > 0) {
        process.stdout.write(`\x1b[${lastRenderHeight}A`);
        for (let i = 0; i < lastRenderHeight; i++) {
          process.stdout.write("\x1b[2K\x1b[1B");
        }
        process.stdout.write(`\x1b[${lastRenderHeight}A`);
      }
    };

    const render = (state: "active" | "submit" | "cancel" = "active") => {
      clearRender();
      const lines: string[] = [];
      const filtered = getFiltered();

      const icon =
        state === "active"
          ? c.cyan(S.stepActive)
          : state === "cancel"
            ? c.red(S.stepError)
            : c.green(S.stepComplete);
      lines.push(`${icon}  ${state === "active" ? title : c.dim(title)}`);

      if (state === "active") {
        // Search input
        const blockCursor = isColorSupported ? `\x1b[7m \x1b[0m` : "_";
        lines.push(`${c.gray(S.bar)}  ${c.dim("Search:")} ${query}${blockCursor}`);
        lines.push(`${c.gray(S.bar)}  ${c.dim("↑↓ move, space toggle, a all, n none, enter confirm")}`);
        lines.push(`${c.gray(S.bar)}`);

        // Scrolling window
        const visibleStart = Math.max(
          0,
          Math.min(cursor - Math.floor(maxVisible / 2), filtered.length - maxVisible),
        );
        const visibleEnd = Math.min(filtered.length, visibleStart + maxVisible);
        const visibleItems = filtered.slice(visibleStart, visibleEnd);

        if (filtered.length === 0) {
          lines.push(`${c.gray(S.bar)}  ${c.dim("No matches found")}`);
        } else {
          for (let i = 0; i < visibleItems.length; i++) {
            const item = visibleItems[i]!;
            const actualIndex = visibleStart + i;
            const isSelected = selected.has(item.value);
            const isCursor = actualIndex === cursor;

            const radio = isSelected ? c.green(S.stepComplete) : c.dim(S.circle);
            const label = isCursor ? c.underline(item.label) : item.label;
            const hint = item.hint ? c.dim(` (${item.hint})`) : "";
            const pointer = isCursor ? c.cyan("\u276F") : " ";
            lines.push(`${c.gray(S.bar)} ${pointer} ${radio} ${label}${hint}`);
          }

          // Scroll indicators
          const hiddenBefore = visibleStart;
          const hiddenAfter = filtered.length - visibleEnd;
          if (hiddenBefore > 0 || hiddenAfter > 0) {
            const parts: string[] = [];
            if (hiddenBefore > 0) parts.push(`\u2191 ${hiddenBefore} more`);
            if (hiddenAfter > 0) parts.push(`\u2193 ${hiddenAfter} more`);
            lines.push(`${c.gray(S.bar)}  ${c.dim(parts.join("  "))}`);
          }
        }

        // Selected summary
        lines.push(`${c.gray(S.bar)}`);
        const selectedLabels = options.filter((o) => selected.has(o.value)).map((o) => o.label);
        if (selectedLabels.length === 0) {
          lines.push(`${c.gray(S.bar)}  ${c.dim("Selected: (none)")}`);
        } else {
          const summary =
            selectedLabels.length <= 3
              ? selectedLabels.join(", ")
              : `${selectedLabels.slice(0, 3).join(", ")} +${selectedLabels.length - 3} more`;
          lines.push(`${c.gray(S.bar)}  ${c.green("Selected:")} ${summary}`);
        }
        lines.push(c.gray(S.barEnd));
      } else if (state === "submit") {
        const selectedLabels = options.filter((o) => selected.has(o.value)).map((o) => o.label);
        lines.push(`${c.gray(S.bar)}  ${c.dim(selectedLabels.join(", "))}`);
      } else if (state === "cancel") {
        lines.push(`${c.gray(S.bar)}  ${c.dim("Cancelled")}`);
      }

      process.stdout.write(lines.join("\n") + "\n");
      lastRenderHeight = lines.length;
    };

    const cleanup = () => {
      process.stdin.removeListener("keypress", onKeypress);
      if (process.stdin.isTTY) {
        process.stdin.setRawMode(false);
      }
      rl.close();
    };

    const onKeypress = (_str: string, key: import("readline").Key) => {
      if (!key) return;
      const filtered = getFiltered();

      // Enter -> submit
      if (key.name === "return") {
        render("submit");
        cleanup();
        resolve([...selected]);
        return;
      }

      // Escape / Ctrl-C -> cancel
      if (key.name === "escape" || (key.ctrl && key.name === "c")) {
        render("cancel");
        cleanup();
        resolve(null);
        return;
      }

      // Arrow up
      if (key.name === "up") {
        cursor = Math.max(0, cursor - 1);
        render();
        return;
      }

      // Arrow down
      if (key.name === "down") {
        cursor = Math.min(filtered.length - 1, cursor + 1);
        render();
        return;
      }

      // Space -> toggle
      if (key.name === "space") {
        const item = filtered[cursor];
        if (item) {
          if (selected.has(item.value)) selected.delete(item.value);
          else selected.add(item.value);
        }
        render();
        return;
      }

      // Backspace
      if (key.name === "backspace") {
        query = query.slice(0, -1);
        cursor = 0;
        render();
        return;
      }

      // Regular character input (including 'a' and 'n' shortcuts)
      if (key.sequence && !key.ctrl && !key.meta && key.sequence.length === 1) {
        // 'a' with empty query -> select all
        if (key.sequence === "a" && query === "") {
          for (const o of options) selected.add(o.value);
          render();
          return;
        }
        // 'n' with empty query -> select none
        if (key.sequence === "n" && query === "") {
          selected.clear();
          render();
          return;
        }
        query += key.sequence;
        cursor = 0;
        render();
        return;
      }
    };

    process.stdin.on("keypress", onKeypress);
    render();
  });
}

// -- Banner -----------------------------------------------------------------

const BANNER_LINES = [
  "██████╗ ██╗     ██╗   ██╗ ██████╗ ██╗███╗   ██╗███████╗",
  "██╔══██╗██║     ██║   ██║██╔════╝ ██║████╗  ██║██╔════╝",
  "██████╔╝██║     ██║   ██║██║  ███╗██║██╔██╗ ██║███████╗",
  "██╔═══╝ ██║     ██║   ██║██║   ██║██║██║╚██╗██║╚════██║",
  "██║     ███████╗╚██████╔╝╚██████╔╝██║██║ ╚████║███████║",
  "╚═╝     ╚══════╝ ╚═════╝  ╚═════╝ ╚═╝╚═╝  ╚═══╝╚══════╝",
];

// Dark-to-light grey/white gradient (inverted from skills CLI)
const GRADIENT: [number, number, number][] = [
  [60, 60, 60],
  [90, 90, 90],
  [125, 125, 125],
  [160, 160, 160],
  [200, 200, 200],
  [240, 240, 240],
];

function rgb(r: number, g: number, b: number): string {
  return isColorSupported ? `\x1b[38;2;${r};${g};${b}m` : "";
}

/** Print the PLUGINS ASCII art banner with gradient */
export function banner() {
  console.log();
  for (let i = 0; i < BANNER_LINES.length; i++) {
    const [r, g, b] = GRADIENT[i]!;
    console.log(`${rgb(r, g, b)}${BANNER_LINES[i]}${reset}`);
  }
}
