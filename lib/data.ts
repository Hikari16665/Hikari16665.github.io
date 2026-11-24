/**
 * 站点内容全部来自公开信息：
 * GitHub 用户 @Hikari16665（https://github.com/Hikari16665）
 * 位置：中国 · 辽宁 · 大连
 */

export const profile = {
  handle: "Hikari16665",
  alias: "Hikari",
  name: "Nyankolunii",
  tagline: "LIVE WITH QUESTIONING EVERYTHING",
  bio: "此等毫无意义之事啊，诚然",
  role: ["插件模组开发", "全栈工具"],
  location: "“辽宁-大连”",
  city: "大连",
  timeZone: "Asia/Shanghai",
  coords: "38.91°N / 121.61°E",
  joined: 2023,
  repos: 34,
  github: "https://github.com/Hikari16665",
  blog: "https://hikari.bond",
  email: "contact@hikari.bond",
  company: "HikariRevivalProject",
} as const;

export type Category = "plugin" | "app" | "experiment";

/** 封面图的种类。每一种对应一张和项目本身有关的印刷示意图。 */
export type CoverId =
  | "launcher"
  | "yaml"
  | "proc"
  | "baritone"
  | "lyrics"
  | "library"
  | "forceload"
  | "union"
  | "site";

export type Project = {
  name: string;
  year: string;
  category: Category;
  summary: string;
  stack: string;
  stars: number;
  href: string;
  cover: {
    id: CoverId;
    tag: string;
  };
};

export const projects: Project[] = [
  {
    name: "HikariServerLauncher 2",
    year: "2026",
    category: "app",
    summary: "多实例 Minecraft 服务器启动器，但是由于PCL炸缸了我暂时不敢做。",
    stack: "Python + Tauri + React",
    stars: 10,
    href: "https://github.com/Hikari16665/HikariServerLauncher2",
    cover: { id: "launcher", tag: "app/tools" },
  },
  {
    name: "mc-yaml-translator",
    year: "2026",
    category: "app",
    summary: "把插件的 YAML 丢给模型翻，占位符和结构都留着，能拖文件也能走命令行",
    stack: "Python · MIT",
    stars: 2,
    href: "https://github.com/Hikari16665/mc-yaml-translator",
    cover: { id: "yaml", tag: "app/yaml" },
  },
  {
    name: "proc-indicator",
    year: "2026",
    category: "app",
    summary: "KDE 右下角弹半透明的卡片，进程起来是青的，退出是橙的，鼠标放上去就让开",
    stack: "Python · MIT",
    stars: 1,
    href: "https://github.com/Hikari16665/proc-indicator",
    cover: { id: "proc", tag: "app/kde" },
  },
  {
    name: "CarpetBaritoneIntegration",
    year: "2026",
    category: "plugin",
    summary: "把Baritone移植到Fabric Carpet服务端，为红石服务器加了专用指令",
    stack: "Java",
    stars: 10,
    href: "https://github.com/Hikari16665/CarpetBaritoneIntegration",
    cover: { id: "baritone", tag: "mod/fabric" },
  },
  {
    name: "dsh-netease-lyrics",
    year: "2026",
    category: "app",
    summary: "把网易云桌面歌词渲染成聊天背后的动态歌词层",
    stack: "JavaScript · MIT",
    stars: 3,
    href: "https://github.com/Hikari16665/dsh-netease-lyrics",
    cover: { id: "lyrics", tag: "app/dsh" },
  },
  {
    name: "HikariLib",
    year: "2026",
    category: "plugin",
    summary: "我自己那几个插件共用的基础库",
    stack: "Java",
    stars: 6,
    href: "https://github.com/Hikari16665/HikariLib",
    cover: { id: "library", tag: "library" },
  },
  {
    name: "ValuableForceload",
    year: "2026",
    category: "plugin",
    summary: "可以让玩家购买与管理的强加载区块，兼容多种经济插件",
    stack: "Java",
    stars: 2,
    href: "https://github.com/Hikari16665/ValuableForceload",
    cover: { id: "forceload", tag: "plugin/bukkit" },
  },
  {
    name: "UnionBan",
    year: "2025",
    category: "app",
    summary: "联合封禁平台，前端与后端两个仓库一起写",
    stack: "TypeScript · Python",
    stars: 2,
    href: "https://github.com/Hikari16665/UnionBan-Frontend",
    cover: { id: "union", tag: "app/web" },
  },
  {
    name: "Hikari16665.github.io",
    year: "2026",
    category: "experiment",
    summary: "这个站改用 Next.js 了，还是墨色轨道那一套",
    stack: "Next.js",
    stars: 1,
    href: "https://github.com/Hikari16665/Hikari16665.github.io",
    cover: { id: "site", tag: "life/site" },
  },
];

export const categories: { id: "all" | Category; label: string }[] = [
  { id: "all", label: "全部" },
  { id: "plugin", label: "插件" },
  { id: "app", label: "应用" },
  { id: "experiment", label: "实验作" },
];

export const links = {
  github: profile.github,
  blog: profile.blog,
};
