// Íconos del sitio: 24x24, trazo 1.5, terminaciones cuadradas, currentColor (antes _includes/mm-icon.html).
const PATHS: Record<string, string> = {
  chat: "<path d=\"M3 4h18v12H10l-5 4v-4H3z\"/><path d=\"M7 8.5h10M7 11.5h6\"/>",
  launch: "<path d=\"M12 3l6 8h-4v7h-4v-7H6z\"/><path d=\"M6 21h12\"/>",
  shop: "<path d=\"M2 10l2-6h16l2 6z\"/><path d=\"M4 10v10h16V10\"/><path d=\"M9 20v-6h6v6\"/>",
  flow: "<path d=\"M4 5h6v5H4z\"/><path d=\"M14 14h6v5h-6z\"/><path d=\"M10 7.5h7V14\"/>",
  game: "<path d=\"M3 8h18v9H3z\"/><path d=\"M7 10.5v4M5 12.5h4\"/><path d=\"M15 11h2M17 14h2\"/>",
  package: "<path d=\"M3 7l9-4 9 4v10l-9 4-9-4z\"/><path d=\"M3 7l9 4 9-4M12 11v10\"/>",
  card: "<path d=\"M2 5h20v14H2z\"/><path d=\"M2 9.5h20M6 15h5\"/>",
  globe: "<circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M3 12h18M12 3v18\"/><path d=\"M7 5.5c3 3.500 3 9.500 0 13M17 5.500c-3 3.500-3 9.500 0 13\"/>",
  cap: "<path d=\"M2 9l10-5 10 5-10 5z\"/><path d=\"M6 11.500V16l6 3 6-3v-4.500\"/><path d=\"M22 9v6\"/>",
  mail: "<path d=\"M3 5h18v14H3z\"/><path d=\"M3 5l9 8 9-8\"/>",
  phone: "<path d=\"M7 2h10v20H7z\"/><path d=\"M11 18.500h2\"/>",
  menu: "<path d=\"M4 7h16M4 12h16M4 17h16\"/>",
  arrow: "<path d=\"M3 12h17M14 6l6 6-6 6\"/>",
  close: "<path d=\"M5 5l14 14M19 5L5 19\"/>",
};

export function Icon({ name, className = "mm__icon" }: { name: string; className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
      focusable="false"
      dangerouslySetInnerHTML={{ __html: PATHS[name] ?? "" }}
    />
  );
}
