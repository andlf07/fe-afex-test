export function getCountryFlag(countryCode: string): string {
  const flags: Record<string, string> = {
    US: "🇺🇸",
    CA: "🇨🇦",
    GB: "🇬🇧",
    DE: "🇩🇪",
    FR: "🇫🇷",
    JP: "🇯🇵",
    AU: "🇦🇺",
    BR: "🇧🇷",
    IN: "🇮🇳",
    MX: "🇲🇽",
    ES: "🇪🇸",
    IT: "🇮🇹",
    NL: "🇳🇱",
    PL: "🇵🇱",
    RO: "🇷🇴",
    RU: "🇷🇺",
  };
  return flags[countryCode] || "🌍";
}
