import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "Iridescent Finale",
  description: "Our world, your land.",

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
