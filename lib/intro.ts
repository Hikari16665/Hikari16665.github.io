/**
 * 开场序列的全部时间轴。
 *
 * 原始计圈是倒序的，这里已经翻正为「编号 · 相对上一圈 · 绝对」，
 * 并把绝对时间统一减掉 4.01s —— 下面这些秒数就是最终结果，
 * 直接量在音乐上：音乐从 0:00 开始放，时间轴也从 0:00 开始走。
 *
 * 16 圈之后是最后四敲（间隔很短）：不出现单颗星，只把中间的文字
 * 瞬换成四句 bio，同时前两敲点亮中间三颗、后两敲点亮全部五颗，
 * 然后 +100ms 进入主页的「顺序搭建」动画。
 */

export const AUDIO_SRC =
  "https://hcwoss.oss-cn-beijing.aliyuncs.com/Porter%20Robinson%20-%20Knock%20Yourself%20Out%20XD.mp3";

/** 屏幕中央的名字：换掉哥特体，用站内的衬线字体 */
export const NAME = "Nyankolunii!!🌠";

/** 计圈 01–16：星星出现的顺序（秒，音乐从 0:00 计时）
 *  第 3 颗起整体前移 0.05s */
export const STAR_TIMES = [
  0.0, 0.44, 0.79, 0.94, 1.15, 1.46, 1.83, 2.18, 2.54, 2.91, 3.26, 3.61, 3.94, 4.3, 4.63,
];

/**
 * 计圈 17–20：最后四敲。这里不出现星星，只把中间的文字瞬换成一句 bio。
 * ↓ 这四句留给你后面配置（等长一点会好看，但短句更有「一闪而过」的感觉）。
 */
export const BIOS = [
  "Under the stars we EMBRACE",
  "Never say GOODBYE",
  "Beside REALITY",
  "Still called NYANKOLUNI",
];

/** 最后四敲的时刻（秒，已减去 4.01） */
export const BIO_TIMES = [ 4.95,5.13, 5.30, 5.46];

/** 序列结束 → 等 100ms → 主页开始搭建 */
export const EXIT_DELAY = 0.02;

/** 最后一个事件 + 100ms */
export const END_TIME = BIO_TIMES[BIO_TIMES.length - 1] + EXIT_DELAY;

/** 星星的位置：六分位的五条竖线，在偏上方排成一行 */
export const STAR_LINES = [16.667, 33.333, 50, 66.667, 83.333];
export const STAR_Y = 25;

/**
 * 点亮顺序：0→1→2→3→4→3→2→1→0…
 * 先从左点到右，再从右点回左。
 */
const LIT_CYCLE = [0, 1, 2, 3, 4, 3, 2, 1];

/** 第 step 次（从 0 起）点亮哪一颗，返回 0–4 */
export function litIndexFor(step: number): number {
  if (step < 0) return -1;
  return LIT_CYCLE[step % LIT_CYCLE.length];
}

/**
 * 最后四敲时同时点亮哪几颗（下标 0–4）：
 * 前两敲点亮中间三颗，后两敲点亮全部五颗。
 */
export const BIO_LIT: number[][] = [
  [1, 2, 3],
  [1, 2, 3],
  [0, 1, 2, 3, 4],
  [0, 1, 2, 3, 4],
];
