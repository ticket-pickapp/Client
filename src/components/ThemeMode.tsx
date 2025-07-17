"use client";
import React, { useEffect, useState } from "react";
import { MdLightMode, MdDarkMode } from "react-icons/md";

const ThemeMode = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setIsDark(savedTheme === "dark");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    setIsDark(!isDark);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", newTheme);
  };

  return (
    <button
      type="button"
      aria-label="Cambiar tema"
      onClick={toggleTheme}
      className="p-2 rounded-full border border-border bg-background hover:bg-secondary transition-colors flex items-center justify-center"
    >
      {isDark ? (
        <MdDarkMode data-testid="MdDarkMode" size={20} className="text-white" />
      ) : (
        <MdLightMode data-testid="MdLightMode" size={20} className="text-accent" />
      )}
    </button>
  );
};

export default ThemeMode;
