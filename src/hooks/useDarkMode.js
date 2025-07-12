import { useEffect, useState } from "react";

export const useDarkMode = () => {
  const [enabled, setEnabled] = useState(() => {
    return (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });

  useEffect(() => {
    const className = "dark";
    const bodyClass = window.document.documentElement.classList;
    enabled ? bodyClass.add(className) : bodyClass.remove(className);
    localStorage.theme = enabled ? "dark" : "light";
  }, [enabled]);

  return [enabled, setEnabled];
};
