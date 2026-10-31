import type { PatternVariant } from "@/components/pattern";

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

export type Project = {
  name: string;
  year: string;
  category: Category;
  summary: string;
  stack: string;
  stars: number;
  href: string;
  cover: {
    from: string;
    to: string;
    tone: "light" | "dark";
    /** 封面上的印象图案 */
    pattern: PatternVariant;
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
    cover: {
      from: "#0d1424",
      to: "#33416b",
      tone: "dark",
      pattern: "stack",
      tag: "app/tools",
    },
  },
  {
    name: "CarpetBaritoneIntegration",
    year: "2026",
    category: "plugin",
    summary: "把Baritone移植到Fabric Carpet服务端，为红石服务器加了专用指令",
    stack: "Java",
    stars: 9,
    href: "https://github.com/Hikari16665/CarpetBaritoneIntegration",
    cover: {
      from: "#e9ecfd",
      to: "#aab6f2",
      tone: "light",
      pattern: "route",
      tag: "mod/fabric",
    },
  },
  {
    name: "dsh-netease-lyrics",
    year: "2026",
    category: "app",
    summary: "把网易云桌面歌词渲染成聊天背后的动态歌词层",
    stack: "JavaScript · MIT",
    stars: 3,
    href: "https://github.com/Hikari16665/dsh-netease-lyrics",
    cover: {
      from: "#f2f4fd",
      to: "#cbd3f5",
      tone: "light",
      pattern: "wave",
      tag: "app/dsh",
    },
  },
  {
    name: "HikariLib",
    year: "2026",
    category: "plugin",
    summary: "我自己那几个插件共用的基础库",
    stack: "Java",
    stars: 5,
    href: "https://github.com/Hikari16665/HikariLib",
    cover: {
      from: "#11182a",
      to: "#3a4468",
      tone: "dark",
      pattern: "blocks",
      tag: "library",
    },
  },
  {
    name: "ValuableForceload",
    year: "2026",
    category: "plugin",
    summary: "可以让玩家购买与管理的强加载区块，兼容多种经济插件",
    stack: "Java",
    stars: 2,
    href: "https://github.com/Hikari16665/ValuableForceload",
    cover: {
      from: "#f7f8fc",
      to: "#bdc6e9",
      tone: "light",
      pattern: "chunks",
      tag: "plugin/bukkit",
    },
  },
  {
    name: "UnionBan",
    year: "2025",
    category: "app",
    summary: "联合封禁平台，前端与后端两个仓库一起写",
    stack: "TypeScript · Python",
    stars: 2,
    href: "https://github.com/Hikari16665/UnionBan-Frontend",
    cover: {
      from: "#141b2c",
      to: "#2f3d61",
      tone: "dark",
      pattern: "orbit",
      tag: "app/web",
    },
  },
  {
    name: "Hikari16665.github.io",
    year: "2026",
    category: "experiment",
    summary: "带全息视觉效果的 Astro 个人博客",
    stack: "Astro",
    stars: 1,
    href: "https://github.com/Hikari16665/Hikari16665.github.io",
    cover: {
      from: "#eef1ff",
      to: "#cdd5f6",
      tone: "light",
      pattern: "stars",
      tag: "life/blog",
    },
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
