import { useTheme } from "next-themes";

const ThemeToggle = () => {
  const { setTheme, systemTheme, theme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  const toggleTheme = () => {
    if (currentTheme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      id="dark-theme-switch"
      className="absolute right-4 top-4"
    >
      <span className="text-3xl">{currentTheme === "dark" ? "🌙" : "☀️"}</span>
    </button>
  );
};

export default ThemeToggle;
