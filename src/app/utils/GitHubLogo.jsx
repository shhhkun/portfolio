export default function GitHubLogo({ className = "w-6 h-6 mr-2" }) {
  const GitHubBlack = "./GitHub_Invertocat_Black.svg";
  const GitHubWhite = "./GitHub_Invertocat_White.svg";

  const color = getComputedStyle(document.documentElement)
    .getPropertyValue("--logo-theme")
    .trim();

  const logo = color === "dark" ? GitHubBlack : GitHubWhite;
  return <img src={logo} alt="GitHub" className={className} />;
}
