const markerPattern = /^\s*\[!(?:数据删除|DATA[ -]DELETED)\]\s*/i;

/**
 * Turns a Markdown blockquote beginning with `[!数据删除]` into a styled
 * data-deleted block while keeping the rest of the block valid Markdown.
 */
export default function remarkDataDeleted() {
  return (tree) => {
    const visit = (node) => {
      if (node?.type === 'blockquote') transformBlockquote(node);
      if (node?.type === 'paragraph') {
        transformIframe(node);
        transformFigure(node);
      }
      if (node?.children && node.type !== 'code' && node.type !== 'inlineCode' && node.type !== 'html') {
        transformInlineDeleted(node);
        transformMarks(node);
        node.children.forEach(visit);
      }
    };

    visit(tree);
  };
}

function transformIframe(node) {
  const [prefix, link] = node.children ?? [];
  const marker = link?.type === 'link' && link.children?.length === 1 && link.children[0].type === 'text'
    ? /^iframe(?:\s+(\d{2,4})x(\d{2,4}))?$/i.exec(link.children[0].value.trim())
    : null;
  const isIframeMarker = node.children?.length === 2
    && prefix?.type === 'text'
    && prefix.value.trim() === '@'
    && link?.type === 'link'
    && link.children?.length === 1
    && link.children[0].type === 'text'
    && marker;
  if (!isIframeMarker || !isSafeEmbedUrl(link.url)) return;

  const width = clampEmbedSize(marker[1], 720, 240, 1920);
  const height = clampEmbedSize(marker[2], 405, 120, 1080);
  const title = link.title?.trim() || '嵌入内容';
  node.data ??= {};
  node.data.hName = 'figure';
  node.data.hProperties = {
    className: ['iframe-embed'],
    'data-iframe-embed': '',
    style: `--embed-width:${width}px;--embed-ratio:${width}/${height}`,
  };
  node.children = [
    {
      type: 'text',
      value: `无法载入：${title}`,
      data: {
        hName: 'iframe',
        hProperties: {
          src: link.url,
          title,
          loading: 'lazy',
          referrerPolicy: 'strict-origin-when-cross-origin',
          sandbox: 'allow-scripts allow-same-origin allow-forms allow-popups allow-presentation',
          allow: 'fullscreen; autoplay; encrypted-media; picture-in-picture',
          allowFullScreen: true,
        },
      },
    },
    {
      type: 'paragraph',
      children: [{ type: 'text', value: title }],
      data: { hName: 'figcaption' },
    },
  ];
}

function clampEmbedSize(value, fallback, minimum, maximum) {
  if (!value) return fallback;
  return Math.min(maximum, Math.max(minimum, Number.parseInt(value, 10)));
}

function isSafeEmbedUrl(value) {
  if (typeof value !== 'string') return false;
  if (value.startsWith('/') && !value.startsWith('//')) return true;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch {
    return false;
  }
}

function transformInlineDeleted(parent) {
  parent.children = parent.children.flatMap((child) => {
    if (child.type !== 'text' || !child.value.includes('[[')) return child;

    const pieces = [];
    const pattern = /\[\[(?:数据删除|DATA[ -]DELETED)\s*:\s*([^\]\n]+?)\s*\]\]/gi;
    let cursor = 0;
    let match;
    while ((match = pattern.exec(child.value)) !== null) {
      if (match.index > cursor) pieces.push({ type: 'text', value: child.value.slice(cursor, match.index) });
      pieces.push({
        type: 'text',
        value: match[1],
        data: {
          hName: 'span',
          hProperties: { className: ['data-deleted-inline'], 'data-data-deleted-inline': '' },
        },
      });
      cursor = pattern.lastIndex;
    }
    if (cursor === 0) return child;
    if (cursor < child.value.length) pieces.push({ type: 'text', value: child.value.slice(cursor) });
    return pieces;
  });
}

function transformMarks(parent) {
  parent.children = parent.children.flatMap((child) => {
    if (child.type !== 'text' || !child.value.includes('==')) return child;

    const pieces = [];
    const pattern = /==([^=\n](?:.*?[^=\n])?)==/g;
    let cursor = 0;
    let match;
    while ((match = pattern.exec(child.value)) !== null) {
      if (match.index > cursor) pieces.push({ type: 'text', value: child.value.slice(cursor, match.index) });
      pieces.push({
        type: 'text',
        value: match[1],
        data: { hName: 'mark', hProperties: { className: ['signal-mark'] } },
      });
      cursor = pattern.lastIndex;
    }
    if (cursor === 0) return child;
    if (cursor < child.value.length) pieces.push({ type: 'text', value: child.value.slice(cursor) });
    return pieces;
  });
}

function transformFigure(node) {
  if (node.children?.length !== 1 || node.children[0].type !== 'image') return;
  const image = node.children[0];
  if (!image.title) return;

  node.data ??= {};
  node.data.hName = 'figure';
  node.data.hProperties = { className: ['signal-figure'] };
  node.children.push({
    type: 'paragraph',
    children: [{ type: 'text', value: image.title }],
    data: { hName: 'figcaption' },
  });
}

function transformBlockquote(node) {
  const firstParagraph = node.children?.[0];
  const firstText = firstParagraph?.type === 'paragraph' ? firstParagraph.children?.[0] : undefined;
  if (firstText?.type !== 'text' || !markerPattern.test(firstText.value)) return;

  firstText.value = firstText.value.replace(markerPattern, '');
  if (firstText.value === '') firstParagraph.children.shift();
  if (firstParagraph.children.length === 0) node.children.shift();

  node.data ??= {};
  node.data.hProperties ??= {};
  node.data.hProperties.className = [
    ...normalizeClassNames(node.data.hProperties.className),
    'data-deleted',
  ];
  node.data.hProperties['data-data-deleted'] = '';
}

function normalizeClassNames(value) {
  if (Array.isArray(value)) return value;
  if (typeof value === 'string') return value.split(/\s+/).filter(Boolean);
  return [];
}
