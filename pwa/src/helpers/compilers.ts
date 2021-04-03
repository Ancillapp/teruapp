const htmlTokensMap: Record<string, string> = {
  '&': '&amp;',
  '"': '&quot;',
  "'": '&apos;',
  '<': '&lt;',
  '>': '&gt;',
};

const markdownTokensMap: Record<string, string> = {
  '*': 'strong',
  _: 'em',
  '~': 'del',
  '`': 'code',
};

export type DefaultSongClassName = 'chorus' | 'bridge' | 'ending' | 'verse';

const getParagraphClass = (
  paragraph: string,
  classes: Partial<Record<DefaultSongClassName, string>> = {},
) => {
  if (/^(?:rit\.|refrain:)/i.test(paragraph)) {
    return classes.chorus || 'chorus';
  }
  if (/^bridge/i.test(paragraph)) {
    return classes.bridge || 'bridge';
  }
  if (/^(?:finale|fin\.|ende:)/i.test(paragraph)) {
    return classes.ending || 'ending';
  }
  return classes.verse || 'verse';
};

export interface CompileSongOptions {
  classes?: Partial<Record<DefaultSongClassName, string>>;
  wrap?: boolean;
}

export const compileSong = (
  rawText: string,
  { classes, wrap = true }: CompileSongOptions = {},
) =>
  rawText
    // Sanitize HTML
    .replace(
      /[&"'<>]/g,
      (char) => htmlTokensMap[char as '&' | '"' | "'" | '<' | '>'],
    )
    // Compile WhatsApp-like markdown
    .replace(
      /(?:(_)(.+?)_|(\*)(.+?)\*)/g,
      (_, type, text) =>
        `<${markdownTokensMap[type]}>${text}</${markdownTokensMap}>`,
    )
    // Add fancy decorations
    .split('\n\n')
    .map((paragraph) => {
      const compiledParagraph = paragraph
        .replace(/\n/g, '<br>')
        .replace(
          /^((?:rit\.|ritornello|refrain|bridge|finale|fin\.|ende|ending|\d+\.):?)/i,
          '<strong>$1</strong>',
        );

      return wrap
        ? `<p class="${getParagraphClass(
            paragraph,
            classes,
          )}">${compiledParagraph}</p>`
        : compiledParagraph;
    })
    .join('');
