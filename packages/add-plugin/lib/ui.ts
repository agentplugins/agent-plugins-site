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
