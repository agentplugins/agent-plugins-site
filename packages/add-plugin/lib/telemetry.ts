const TELEMETRY_URL = 'https://plugins-telemetry.labs.vercel.dev/t';

// ─── Event types ───

interface InstallTelemetryData {
  event: 'install';
  source: string;
  plugins: string;
  pluginCount: string;
  targets: string;
  scope: string;
}

type TelemetryData = InstallTelemetryData;

// ─── State ───

let cliVersion: string | null = null;

// ─── Helpers ───

function isCI(): boolean {
  return !!(
    process.env.CI ||
    process.env.GITHUB_ACTIONS ||
    process.env.GITLAB_CI ||
    process.env.CIRCLECI ||
    process.env.TRAVIS ||
    process.env.BUILDKITE ||
    process.env.JENKINS_URL ||
    process.env.TEAMCITY_VERSION
  );
}

function isEnabled(): boolean {
  return !process.env.DISABLE_TELEMETRY && !process.env.DO_NOT_TRACK;
}

// ─── Public API ───

export function setVersion(version: string): void {
  cliVersion = version;
}

export function track(data: TelemetryData): void {
  if (!isEnabled()) return;

  try {
    const params = new URLSearchParams();

    if (cliVersion) {
      params.set('v', cliVersion);
    }

    if (isCI()) {
      params.set('ci', '1');
    }

    for (const [key, value] of Object.entries(data)) {
      if (value !== undefined && value !== null) {
        params.set(key, String(value));
      }
    }

    // Fire and forget - don't await, silently ignore errors
    fetch(`${TELEMETRY_URL}?${params.toString()}`).catch(() => {});
  } catch {
    // Silently fail - telemetry should never break the CLI
  }
}
