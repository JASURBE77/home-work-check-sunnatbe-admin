import { defineStore } from "pinia";
import { lightTheme, darkTheme } from "../utils/ant/theme";

const useTheme = defineStore("themeStore", {
  state: () => ({
    isDark: false,
    themeConfig: lightTheme,
  }),

  actions: {
    changeTheme() {
      if (this.isDark) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }

      this.themeConfig = this.isDark ? darkTheme : lightTheme;
    },

    setTheme() {
      const storedTheme = localStorage.getItem("theme");

      if (storedTheme) {
        this.isDark = storedTheme === "dark";
      } else {
        this.isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      }

      if (this.isDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }

      this.themeConfig = this.isDark ? darkTheme : lightTheme;
    },
  },
});

export default useTheme;
