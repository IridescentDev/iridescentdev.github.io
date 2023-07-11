import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text: "故事",
    icon: "book",
    link: "story.md",
  },
  {
    text: "玩家文档",
    icon: "lightbulb",
    prefix: "/player-guide/",
    children: [
      "README.md",
      "rules.md",
      {
        text: "教程",
        prefix: "tutorials/",
        children: ["essentials", "lands", "aurelium-skills"],
      },
    ],
  },
  {
    text: "管理文档",
    icon: "lightbulb",
    prefix: "/admin-guide/",
    children: [
      "README.md",
      "rules.md",
      {
        text: "工作流",
        prefix: "workflows/",
        children: ["translation", "operations", "planning"],
      },
    ],
  },
  {
    text: "技术文档",
    icon: "lightbulb",
    prefix: "/tech-guide/",
    children: [
      "README.md",
      {
        text: "设置项",
        prefix: "settings/",
        children: ["properties", "bukkit", "spigot", "paper", "purpur"],
      },
      {
        text: "备份",
        prefix: "backup/",
        children: ["eBackup", "manual"],
      },
      {
        text: "更新",
        prefix: "update/",
        children: ["core", "plugin"],
      },
    ],
  },
]);
