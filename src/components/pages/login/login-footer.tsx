import { idAuth } from "#/locales";

export function LoginFooter() {
  return (
    <footer className="font-sans text-xs font-medium leading-4 text-neutral-500 flex items-center gap-2 select-none animate-footer-enter pt-4">
      <span>{idAuth.login.footerCopyright}</span>
      <span>·</span>
      <a
        href="https://berbagibitesjogja.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-bondi-700 hover:text-bondi-800 hover:underline transition-colors cursor-pointer"
      >
        berbagibitesjogja.com
      </a>
    </footer>
  );
}
