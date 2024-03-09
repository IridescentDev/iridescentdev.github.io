import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text: "玩家文档",
    icon: "lightbulb",
    prefix: "/player-guide/",
    children: [
      "",
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
      "",
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
      "",
      "settings/README.md",
      "backup/README.md",
      "update/README.md",
    ],
  },
  "status.md"
]);
