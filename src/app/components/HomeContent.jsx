import { useAudioPlayer } from "./AudioPlayer";
import MuteButton from "./MuteButton";
import ThemeButton from "./ThemeButton";
import Waves from "./Waves";

const HomeContent = ({ children, theme, setTheme }) => {
  const { playAudio1 } = useAudioPlayer();

  return (
    <div
      className="min-h-dvh relative"
      style={{
        backgroundColor: "var(--bg)",
        overflow: "hidden",
      }}
    >
      <div className="absolute flex flex-row top-4 left-4 z-10">
        <ThemeButton theme={theme} setTheme={setTheme} />
        <MuteButton />
      </div>

      <div
        className="absolute flex w-full justify-center bottom-0 font-light mb-2 z-11"
        style={{ fontSize: "0.875rem" }}
      >
        <div className="flex flex-col items-center gap-2">
          <div
            className="flex flex-row gap-4"
            style={{ color: "var(--accent)" }}
          >
            <a
              href="https://linkedin.com/in/serjobarron"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
              onClick={() => playAudio1(0.2)}
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/shhhkun"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
              onClick={() => playAudio1(0.2)}
            >
              GitHub
            </a>
            <a
              href="mailto:serjobarron@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
              onClick={() => playAudio1(0.2)}
            >
              Email
            </a>
          </div>
          <p>© {new Date().getFullYear()} Serjo Barron</p>
        </div>
      </div>

      <Waves style={theme === "dark" ? "sunset" : "starryNight"} />
      {/* <FloatingObject /> */}

      {children}
    </div>
  );
};

export default HomeContent;
