# hikari16665.github.io

Nyankolunii（Hikari）的个人站：一个跟音乐节拍同步的开场，加四个「房间」。

- **Next.js 16**（App Router · Turbopack · 静态导出）
- **React 19** · **TypeScript**
- **Tailwind CSS v4**（`@theme` 里定义 token，没有 tailwind.config）
- **next/font** 自托管 Playfair Display / Roboto
- 部署：**GitHub Pages**（Actions 构建 `out/` 后发布）

## 本地

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # 静态导出到 out/
```

`next.config.ts` 里是 `output: "export"` + `trailingSlash: true`，
所以产物是一堆 `index.html`，GitHub Pages 直接就能发。

## 部署

`.github/workflows/deploy.yml`：push 到 `main` → `npm ci` → `npm run build` →
上传 `out/` → `actions/deploy-pages` 发布。

仓库 Settings → Pages 的 Source 需要选 **GitHub Actions**（已配置过一次）。

## 开场（首次访问）

一段跟音乐节拍同步的入场，播完再「搭建」出主页。

1. **加载页**：一条 1px 的进度条。音频走远端 OSS（github.io 太慢），
   那个桶没开 CORS，读不到字节，所以进度按 `<audio>` 自己的 `buffered / duration`
   估（0–96%），`canplaythrough` 之后补到 100%；显示值用缓动追。
2. **尝试播放**：加载完直接 `audio.play()`。
   - 成功 → 名字画面。
   - 被浏览器拦住 → 进度条**摇两下**、从左往右擦掉，换成「点击进入」。
3. **名字画面**：`Nyankolunii!!🌠`，Playfair；偏上方六分位的五条竖线上排五颗浅色星，
   按鼓点从左到右点亮，再从右到左点回来。
4. **最后四敲**：前两敲点亮中间三颗、后两敲点亮全部五颗，中间文字瞬换成四句 bio。
5. **+100ms**：覆层淡出，主页元素从左往右依次「搭」出来。

时间轴都在 `lib/intro.ts`：

```ts
STAR_TIMES = [0, 0.44, 0.79, …4.63]   // 计圈 01–16
BIO_TIMES  = [4.95, 5.13, 5.30, 5.46] // 计圈 17–20
BIOS       = ["…", "…", "…", "…"]     // ← 四句 bio
EXIT_DELAY = 0.02
```

想再看一次：控制台 `sessionStorage.removeItem("intro-done")` 再刷新。
页脚右下角有 `♪ SOUND ON / OFF`。

> 音乐地址在 `lib/intro.ts` 的 `AUDIO_SRC`，指向那个阿里云 OSS。
> 因为跨源且没 CORS，背景的「音频呼吸」在线上会自动跳过（本地同源时才有）。

## 结构

```
app/
  layout.tsx        字体、背景、页头页脚、metadata
  page.tsx          首页：名字 + 一句话 + 印象图案
  about/page.tsx    关于：自述 + 头像 + 三条事实
  work/page.tsx     作品：筛选 + 封面网格
  contact/page.tsx  联系：邮箱 CTA + 复制 + 大连时间
  not-found.tsx     404
  globals.css       设计 token、背景、图案、动画

components/
  backdrop.tsx      极光 / 星野 / 音频呼吸
  cursor-aura.tsx   跟随指针的柔光
  cursor-blob.tsx   拉伸的小扁球 + 粒子
  intro-overlay.tsx 开场：加载 → 播放 → 星光 → bio
  pattern.tsx       占位用的「印象图案」SVG（8 种）
  room.tsx          一屏一段的容器
  site-header.tsx   导航
  site-footer.tsx   版权 + 图标 + 声音开关
  work-section.tsx  作品网格（客户端筛选）
  portrait.tsx      头像框
  local-clock.tsx   大连时间
  copy-button.tsx   复制邮箱
  sound-toggle.tsx  播放 / 暂停
  route-reset.tsx   切页归零滚动

lib/
  data.ts           文案、项目、链接（改内容只动这里）
  intro.ts          开场时间轴
  intro-boot.ts     音频加载与进度
  sound.ts          音频单例
  audio-level.ts    低频 → --audio-level
```

## 内容

名字、一句话、项目列表都在 `lib/data.ts`；项目数据来自 GitHub 公开仓库
（星标、语言、简介都是真实的），封面是自己画的「印象图案」而不是截图。

## 已知取舍

- 中文用系统字体（苹方 / 雅黑）兜底，没打包中文字体。
- 作品封面是程序生成的几何图案，之后可以换成真实截图。
- 跨源音乐没法接 AnalyserNode，所以线上没有「音频呼吸」这一层。
- 没有 OG 图、sitemap、robots。
