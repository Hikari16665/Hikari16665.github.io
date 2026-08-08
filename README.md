# Personal Astro Blog

一个面向长期视觉定制的 Astro 博客骨架。

## 开发

```bash
pnpm install
pnpm dev
```

部署前请修改 `astro.config.mjs` 中的 `site`，并在 `src/config/site.ts` 更新站点资料。

## 播放列表

把 MP3 文件放入 `src/content/playlist/`，文件名使用 `歌名-作曲家.mp3`：

```text
src/content/playlist/月光-德彪西.mp3
```

构建时播放器会自动读取文件，无需维护额外清单。文件名中的最后一个 `-` 用于分隔歌名与作曲家；添加或删除音乐后需要重新构建网站。

## 视觉入口

- `src/styles/tokens.css`：颜色、字体、间距、圆角、阴影与动效令牌
- `src/styles/themes.css`：主题覆盖层
- `src/styles/global.css`：全局基础样式与排版
- `src/components/`：可替换的视觉组件
- `src/layouts/`：页面骨架与元信息

## 特殊文字块

在文章 Markdown 中使用“数据删除”块：

```md
> [!数据删除]
> 这一段记录已从公开档案中移除。
>
> 块内仍然支持 **强调**、`行内代码` 与[链接](https://example.com)。
```

英文标记 `[!DATA-DELETED]` 也可使用。

行内“数据删除”使用下面的写法：

```md
这份记录中的 [[数据删除: 关键坐标]] 已无法恢复。
```

英文形式 `[[DATA-DELETED: deleted text]]` 也可使用。

荧光信号高亮使用成对的等号：`==需要高亮的内容==`。

为图片添加标题时，标题会自动显示为档案式图片说明：

```md
![替代文字](/images/example.webp "图片说明")
```

文章中的链接、强调、斜体、行内代码、删除线、列表、分隔线、表格、脚注与 `<kbd>` 标签会自动使用阅读页的信号档案样式。

## iframe 嵌入

使用下面的 Markdown 写法嵌入一个响应式 `16:9` iframe：

```md
@[iframe](https://example.com/embed "嵌入内容标题")
```

在 `iframe` 后写入 `宽x高` 可以自定义尺寸，单位为像素：

```md
@[iframe 480x270](https://example.com/embed "较小的嵌入窗口")
```

未声明时默认使用 `720x405`，窄屏会保持比例自动缩小。标题会同时用作 iframe 的无障碍标题与下方图注。地址只允许 `http`、`https` 或站内绝对路径，iframe 默认延迟加载并启用沙箱权限限制。
