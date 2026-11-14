const TIME_ZONE = "Europe/Stockholm";

const dateFormatter = new Intl.DateTimeFormat("sv-SE", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: TIME_ZONE,
});

const dayFormatter = new Intl.DateTimeFormat("sv-SE", {
  weekday: "long",
  day: "numeric",
  month: "long",
  timeZone: TIME_ZONE,
});

const timeFormatter = new Intl.DateTimeFormat("sv-SE", {
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
  timeZone: TIME_ZONE,
});

export function formatHubDate(value: string): string {
  return dateFormatter.format(new Date(value));
}

export function formatHubDay(value: string): string {
  return dayFormatter.format(new Date(value));
}

export function formatHubTime(value: string): string {
  return timeFormatter.format(new Date(value)).replace(":", ".");
}

export function formatHubPublished(value: string): string {
  return `Publicerad ${formatHubDate(value)} kl. ${formatHubTime(value)}`;
}
