const Katex = require("katex");
const hljs = require("highlight.js");
import "../type.d.ts";
import { changeHtml } from "./changeHtml";

import "./heading";

export const paragraph = (values: Convert[]) => {
  let text = `<p class="p">\n`;
  for (const key in values) {
    if (values[key].name === "em") {
      text += `<strong>${values[key].value}</strong>`;
    } else if (values[key].name === "strikethrough") {
      text += `<del>${values[key].value}</del>`;
    } else if (values[key].name === "italic") {
      text += `<em>${values[key].value}</em>`;
    } else if (values[key].name === "emitalic") {
      text += `<em><strong>${values[key].value}</strong></em>`;
    } else if (values[key].name === "link") {
      const path = changeHtml(values[key].href);
      text += `<a href="${path}" class="a">${values[key].title}</a>`;
    } else if (values[key].name === "image") {
      text += `<img src="${values[key].src}" alt="${values[key].alt}" class="img" />`;
    } else if (values[key].name === "video") {
      text += `<video controls preload="none" class="video">\n<source src="${values[key].src}" />\nSorry, your browser doesn't support embedded videos.\n</video>`;
    } else if (values[key].name === "code") {
      text += `<code class="inline-code">${values[key].value}</code>`;
    } else if (values[key].name === "katex") {
      const html = Katex.renderToString(String.raw`\displaystyle ${values[key].value}`, {
        throwOnError: false,
      });
      text += html;
    } else {
      if (values[key].value === "\n") {
        text += `<br>`;
      } else {
        text += values[key].value.replace(/\n/g, `<br>`);
      }
    }
  }
  text += `</p>\n`;
  return text;
};

export const blockquote = (values: Convert[][]) => {
  let bq = `<blockquote class="blockquote">\n`;
  for (const key in values) {
    let text = `<p class="p">\n`;
    const data: Convert[] = values[key];
    for (const val in data) {
      if (data[val].name === "em") {
        text += `<strong>${data[val].value}</strong>`;
      } else if (data[val].name === "strikethrough") {
        text += `<del>${data[val].value}</del>`;
      } else if (data[val].name === "italic") {
        text += `<em>${data[val].value}</em>`;
      } else if (data[val].name === "emitalic") {
        text += `<em><strong>${data[val].value}</strong></em>`;
      } else if (data[val].name === "link") {
        const path = changeHtml(data[val].href);
        text += `<a href="${path}" class="a">${data[val].title}</a>`;
      } else if (data[val].name === "image") {
        text += `<img src="${data[val].src}" alt="${data[val].alt}" />`;
      } else if (data[val].name === "code") {
        text += `<code class="inline-code">${data[val].value}</code>`;
      } else {
        if (data[val].value === "\n") {
          text += `<br>`;
        } else {
          text += data[val].value.replace(/\n/g, `<br>`);
        }
      }
    }
    text += `</p>\n`;
    bq += text;
  }
  bq += `</blockquote>\n`;
  return bq;
};

export const ulist = (values: List[]) => {
  let prev: List | null = null;
  let ulist = `<ul class="ul">\n`;
  for (const key in values) {
    if (prev && values[key].level > prev.level) {
      ulist += `<ul class="ul">\n`;
      ulist += `<li class="li">\n`;
      for (const i in values[key].values) {
        if (values[key].values[i].name === "em") {
          ulist += `<strong>${values[key].values[i].value}</strong>`;
        } else if (values[key].values[i].name === "strikethrough") {
          ulist += `<del>${values[key].values[i].value}</del>`;
        } else if (values[key].values[i].name === "italic") {
          ulist += `<em>${values[key].values[i].value}</em>`;
        } else if (values[key].values[i].name === "emitalic") {
          ulist += `<em><strong>${values[key].values[i].value}</strong></em>`;
        } else if (values[key].values[i].name === "link") {
          const path = changeHtml(values[key].values[i].href);
          ulist += `<a href="${path}" class="a">${values[key].values[i].title}</a>`;
        } else if (values[key].values[i].name === "image") {
          ulist += `<img src="${values[key].values[i].src}" alt="${values[key].values[i].alt}" class="img" />`;
        } else if (values[key].values[i].name === "video") {
          ulist += `<video controls preload="none" class="video">\n<source src="${values[key].values[i].src}" />\nSorry, your browser doesn't support embedded videos.\n</video>`;
        } else if (values[key].values[i].name === "code") {
          ulist += `<code class="inline-code">${values[key].values[i].value}</code>`;
        } else if (values[key].values[i].name === "katex") {
          const html = Katex.renderToString(String.raw`\displaystyle ${values[key].values[i].value}`, {
            throwOnError: false,
          });
          ulist += html;
        } else {
          if (values[key].values[i].value === "\n") {
            ulist += `<br>`;
          } else {
            ulist += values[key].values[i].value;
          }
        }
      }
      ulist += `</li>\n`;
    } else if (prev && values[key].level < prev.level) {
      for (let i = 0; i < prev.level - values[key].level; i++) {
        ulist += `</ul>\n`;
      }
      ulist += `<li class="li">\n`;
      for (const i in values[key].values) {
        if (values[key].values[i].name === "em") {
          ulist += `<strong>${values[key].values[i].value}</strong>`;
        } else if (values[key].values[i].name === "strikethrough") {
          ulist += `<del>${values[key].values[i].value}</del>`;
        } else if (values[key].values[i].name === "italic") {
          ulist += `<em>${values[key].values[i].value}</em>`;
        } else if (values[key].values[i].name === "emitalic") {
          ulist += `<em><strong>${values[key].values[i].value}</strong></em>`;
        } else if (values[key].values[i].name === "link") {
          const path = changeHtml(values[key].values[i].href);
          ulist += `<a href="${path}" class="a">${values[key].values[i].title}</a>`;
        } else if (values[key].values[i].name === "image") {
          ulist += `<img src="${values[key].values[i].src}" alt="${values[key].values[i].alt}" class="img" />`;
        } else if (values[key].values[i].name === "video") {
          ulist += `<video controls preload="none" class="video">\n<source src="${values[key].values[i].src}" />\nSorry, your browser doesn't support embedded videos.\n</video>`;
        } else if (values[key].values[i].name === "code") {
          ulist += `<code class="inline-code">${values[key].values[i].value}</code>`;
        } else if (values[key].values[i].name === "katex") {
          const html = Katex.renderToString(String.raw`\displaystyle ${values[key].values[i].value}`, {
            throwOnError: false,
          });
          ulist += html;
        } else {
          if (values[key].values[i].value === "\n") {
            ulist += `<br>`;
          } else {
            ulist += values[key].values[i].value;
          }
        }
      }
      ulist += `</li>\n`;
    } else if (prev && values[key].level === prev.level) {
      ulist += `<li class="li">\n`;
      for (const i in values[key].values) {
        if (values[key].values[i].name === "em") {
          ulist += `<strong>${values[key].values[i].value}</strong>`;
        } else if (values[key].values[i].name === "strikethrough") {
          ulist += `<del>${values[key].values[i].value}</del>`;
        } else if (values[key].values[i].name === "italic") {
          ulist += `<em>${values[key].values[i].value}</em>`;
        } else if (values[key].values[i].name === "emitalic") {
          ulist += `<em><strong>${values[key].values[i].value}</strong></em>`;
        } else if (values[key].values[i].name === "link") {
          const path = changeHtml(values[key].values[i].href);
          ulist += `<a href="${path}" class="a">${values[key].values[i].title}</a>`;
        } else if (values[key].values[i].name === "image") {
          ulist += `<img src="${values[key].values[i].src}" alt="${values[key].values[i].alt}" class="img" />`;
        } else if (values[key].values[i].name === "video") {
          ulist += `<video controls preload="none" class="video">\n<source src="${values[key].values[i].src}" />\nSorry, your browser doesn't support embedded videos.\n</video>`;
        } else if (values[key].values[i].name === "code") {
          ulist += `<code class="inline-code">${values[key].values[i].value}</code>`;
        } else if (values[key].values[i].name === "katex") {
          const html = Katex.renderToString(String.raw`\displaystyle ${values[key].values[i].value}`, {
            throwOnError: false,
          });
          ulist += html;
        } else {
          if (values[key].values[i].value === "\n") {
            ulist += `<br>`;
          } else {
            ulist += values[key].values[i].value;
          }
        }
      }
      ulist += `</li>\n`;
    } else {
      ulist += `<li class="li">\n`;
      for (const i in values[key].values) {
        if (values[key].values[i].name === "em") {
          ulist += `<strong>${values[key].values[i].value}</strong>`;
        } else if (values[key].values[i].name === "strikethrough") {
          ulist += `<del>${values[key].values[i].value}</del>`;
        } else if (values[key].values[i].name === "italic") {
          ulist += `<em>${values[key].values[i].value}</em>`;
        } else if (values[key].values[i].name === "emitalic") {
          ulist += `<em><strong>${values[key].values[i].value}</strong></em>`;
        } else if (values[key].values[i].name === "link") {
          const path = changeHtml(values[key].values[i].href);
          ulist += `<a href="${path}" class="a">${values[key].values[i].title}</a>`;
        } else if (values[key].values[i].name === "image") {
          ulist += `<img src="${values[key].values[i].src}" alt="${values[key].values[i].alt}" class="img" />`;
        } else if (values[key].values[i].name === "video") {
          ulist += `<video controls preload="none" class="video">\n<source src="${values[key].values[i].src}" />\nSorry, your browser doesn't support embedded videos.\n</video>`;
        } else if (values[key].values[i].name === "code") {
          ulist += `<code class="inline-code">${values[key].values[i].value}</code>`;
        } else if (values[key].values[i].name === "katex") {
          const html = Katex.renderToString(String.raw`\displaystyle ${values[key].values[i].value}`, {
            throwOnError: false,
          });
          ulist += html;
        } else {
          if (values[key].values[i].value === "\n") {
            ulist += `<br>`;
          } else {
            ulist += values[key].values[i].value;
          }
        }
      }
      ulist += `</li>\n`;
    }
    prev = values[key];
  }
  ulist += `</ul>\n`;
  return ulist;
};

export const checklist = (values: List[]) => {
  let prev: List | null = null;
  let clist = `<ul class="ul checklist">\n`;
  for (const key in values) {
    if (prev && values[key].level > prev.level) {
      clist += `<ul class="ul">\n`;
      clist += `<li class="li checklist">\n`;
      if (values[key].checked) {
        clist += `<input type="checkbox" checked="checked">${values[key].values[0].value}\n`;
      } else {
        clist += `<input type="checkbox">${values[key].values[0].value}\n`;
      }
      clist += `</li>\n`;
    } else if (prev && values[key].level < prev.level) {
      for (let i = 0; i < prev.level - values[key].level; i++) {
        clist += `</ul>\n`;
      }
      clist += `<li class="li checklist">\n`;
      if (values[key].checked) {
        clist += `<input type="checkbox" checked="checked">${values[key].values[0].value}\n`;
      } else {
        clist += `<input type="checkbox">${values[key].values[0].value}\n`;
      }
      clist += `</li>\n`;
    } else if (prev && values[key].level === prev.level) {
      clist += `<li class="li checklist">\n`;
      if (values[key].checked) {
        clist += `<input type="checkbox" checked="checked">${values[key].values[0].value}\n`;
      } else {
        clist += `<input type="checkbox">${values[key].values[0].value}\n`;
      }
      clist += `</li>\n`;
    } else {
      clist += `<li class="li checklist">\n`;
      if (values[key].checked) {
        clist += `<input type="checkbox" checked="checked">${values[key].values[0].value}\n`;
      } else {
        clist += `<input type="checkbox">${values[key].values[0].value}\n`;
      }
      clist += `</li>\n`;
    }
    prev = values[key];
  }
  clist += `</ul>\n`;
  return clist;
};

export const orderedlist = (values: Convert[][]) => {
  let olist = `<ol class="ol">\n`;
  for (const key in values) {
    const data = values[key]
    for (const key in data) {
      olist += `<li class="li">${data[key].value}</li>\n`;
    }
  }
  olist += `</ol>\n`;
  return olist;
};

export const olist = (values: List[]) => {
  let prev: List | null = null;
  const type = (level: number) => {
    if (level === 1) {
      return "1";
    } else if (level % 2 === 0) {
      return "i";
    } else if (level % 3 === 0) {
      return "a";
    } else {
      return "1";
    }
  };
  let olist = `<ol class="ol" type="1">\n`;
  for (const key in values) {
    if (prev && values[key].level > prev.level) {
      olist += `<ol class="ol" type="${type(values[key].level)}">\n`;
      olist += `<li class="li">\n`;
      for (const i in values[key].values) {
        if (values[key].values[i].name === "em") {
          olist += `<strong>${values[key].values[i].value}</strong>`;
        } else if (values[key].values[i].name === "strikethrough") {
          olist += `<del>${values[key].values[i].value}</del>`;
        } else if (values[key].values[i].name === "italic") {
          olist += `<em>${values[key].values[i].value}</em>`;
        } else if (values[key].values[i].name === "emitalic") {
          olist += `<em><strong>${values[key].values[i].value}</strong></em>`;
        } else if (values[key].values[i].name === "link") {
          const path = changeHtml(values[key].values[i].href);
          olist += `<a href="${path}" class="a">${values[key].values[i].title}</a>`;
        } else if (values[key].values[i].name === "image") {
          olist += `<img src="${values[key].values[i].src}" alt="${values[key].values[i].alt}" class="img" />`;
        } else if (values[key].values[i].name === "video") {
          olist += `<video controls preload="none" class="video">\n<source src="${values[key].values[i].src}" />\nSorry, your browser doesn't support embedded videos.\n</video>`;
        } else if (values[key].values[i].name === "code") {
          olist += `<code class="inline-code">${values[key].values[i].value}</code>`;
        } else if (values[key].values[i].name === "katex") {
          const html = Katex.renderToString(String.raw`\displaystyle ${values[key].values[i].value}`, {
            throwOnError: false,
          });
          olist += html;
        } else {
          if (values[key].values[i].value === "\n") {
            olist += `<br>`;
          } else {
            olist += values[key].values[i].value;
          }
        }
      }
      olist += `</li>\n`;
    } else if (prev && values[key].level < prev.level) {
      for (let i = 0; i < prev.level - values[key].level; i++) {
        olist += `</ol>\n`;
      }
      olist += `<li class="li">\n`;
      for (const i in values[key].values) {
        if (values[key].values[i].name === "em") {
          olist += `<strong>${values[key].values[i].value}</strong>`;
        } else if (values[key].values[i].name === "strikethrough") {
          olist += `<del>${values[key].values[i].value}</del>`;
        } else if (values[key].values[i].name === "italic") {
          olist += `<em>${values[key].values[i].value}</em>`;
        } else if (values[key].values[i].name === "emitalic") {
          olist += `<em><strong>${values[key].values[i].value}</strong></em>`;
        } else if (values[key].values[i].name === "link") {
          const path = changeHtml(values[key].values[i].href);
          olist += `<a href="${path}" class="a">${values[key].values[i].title}</a>`;
        } else if (values[key].values[i].name === "image") {
          olist += `<img src="${values[key].values[i].src}" alt="${values[key].values[i].alt}" class="img" />`;
        } else if (values[key].values[i].name === "video") {
          olist += `<video controls preload="none" class="video">\n<source src="${values[key].values[i].src}" />\nSorry, your browser doesn't support embedded videos.\n</video>`;
        } else if (values[key].values[i].name === "code") {
          olist += `<code class="inline-code">${values[key].values[i].value}</code>`;
        } else if (values[key].values[i].name === "katex") {
          const html = Katex.renderToString(String.raw`\displaystyle ${values[key].values[i].value}`, {
            throwOnError: false,
          });
          olist += html;
        } else {
          if (values[key].values[i].value === "\n") {
            olist += `<br>`;
          } else {
            olist += values[key].values[i].value;
          }
        }
      }
      olist += `</li>\n`;
    } else if (prev && values[key].level === prev.level) {
      olist += `<li class="li">\n`;
      for (const i in values[key].values) {
        if (values[key].values[i].name === "em") {
          olist += `<strong>${values[key].values[i].value}</strong>`;
        } else if (values[key].values[i].name === "strikethrough") {
          olist += `<del>${values[key].values[i].value}</del>`;
        } else if (values[key].values[i].name === "italic") {
          olist += `<em>${values[key].values[i].value}</em>`;
        } else if (values[key].values[i].name === "emitalic") {
          olist += `<em><strong>${values[key].values[i].value}</strong></em>`;
        } else if (values[key].values[i].name === "link") {
          const path = changeHtml(values[key].values[i].href);
          olist += `<a href="${path}" class="a">${values[key].values[i].title}</a>`;
        } else if (values[key].values[i].name === "image") {
          olist += `<img src="${values[key].values[i].src}" alt="${values[key].values[i].alt}" class="img" />`;
        } else if (values[key].values[i].name === "video") {
          olist += `<video controls preload="none" class="video">\n<source src="${values[key].values[i].src}" />\nSorry, your browser doesn't support embedded videos.\n</video>`;
        } else if (values[key].values[i].name === "code") {
          olist += `<code class="inline-code">${values[key].values[i].value}</code>`;
        } else if (values[key].values[i].name === "katex") {
          const html = Katex.renderToString(String.raw`\displaystyle ${values[key].values[i].value}`, {
            throwOnError: false,
          });
          olist += html;
        } else {
          if (values[key].values[i].value === "\n") {
            olist += `<br>`;
          } else {
            olist += values[key].values[i].value;
          }
        }
      }
      olist += `</li>\n`;
    } else {
      olist += `<li class="li">\n`;
      for (const i in values[key].values) {
        if (values[key].values[i].name === "em") {
          olist += `<strong>${values[key].values[i].value}</strong>`;
        } else if (values[key].values[i].name === "strikethrough") {
          olist += `<del>${values[key].values[i].value}</del>`;
        } else if (values[key].values[i].name === "italic") {
          olist += `<em>${values[key].values[i].value}</em>`;
        } else if (values[key].values[i].name === "emitalic") {
          olist += `<em><strong>${values[key].values[i].value}</strong></em>`;
        } else if (values[key].values[i].name === "link") {
          const path = changeHtml(values[key].values[i].href);
          olist += `<a href="${path}" class="a">${values[key].values[i].title}</a>`;
        } else if (values[key].values[i].name === "image") {
          olist += `<img src="${values[key].values[i].src}" alt="${values[key].values[i].alt}" class="img" />`;
        } else if (values[key].values[i].name === "video") {
          olist += `<video controls preload="none" class="video">\n<source src="${values[key].values[i].src}" />\nSorry, your browser doesn't support embedded videos.\n</video>`;
        } else if (values[key].values[i].name === "code") {
          olist += `<code class="inline-code">${values[key].values[i].value}</code>`;
        } else if (values[key].values[i].name === "katex") {
          const html = Katex.renderToString(String.raw`\displaystyle ${values[key].values[i].value}`, {
            throwOnError: false,
          });
          olist += html;
        } else {
          if (values[key].values[i].value === "\n") {
            olist += `<br>`;
          } else {
            olist += values[key].values[i].value;
          }
        }
      }
      olist += `</li>\n`;
    }
    prev = values[key];
  }
  olist += `</ol>\n`;
  return olist;
};

export const code = (data: OptionalConvert) => {
  let language = null;
  let codeblock = `<pre class="code-block">\n`;
  if (data.file !== undefined) {
    codeblock += `<span class="filename"><span>${data.file}</span></span>\n`;
  }
  if (!data.syntax) {
    codeblock += `<div class="code"><code class="codefont txt">\n`;
  } else if (data.syntax === "txt") {
    codeblock += `<div class="code"><code class="codefont txt">\n`;
  } else {
    codeblock += `<div class="code"><code class="codefont language-${data.syntax}">\n`;
    language = hljs.getLanguage(data.syntax)
  }
  
  const code_data = data.values[0].value.split(/\r?\n{2,}/g)
  for(const key in code_data) {
    
    if (language !== undefined) {
      codeblock += language && data.syntax !== "txt" ? `${hljs.highlight(code_data[key], {language: language.name}).value}\n` : `${code_data[key]}\n`
      if (Number(key) !== code_data.length - 1) {
        codeblock += '<br />\n'
      }
    }
  }
  codeblock += `</code></div>\n`;
  codeblock += `</pre>\n`;
  return codeblock;
};

export const katex = (data: OptionalConvert) => {
  const html = Katex.renderToString(String.raw`\displaystyle ${data.values[0].value}`, {
    throwOnError: false,
  });
  return `<pre class="math katex-center">\n${html}\n</pre>\n`;
};

export const horizontal = () => {
  return `<hr />\n`;
};

export const table = (data: Convert) => {
  let tableblock = `<table class="table">\n`;
  tableblock += `<thead>\n<tr>\n`;
  for (const heading of data.headings) {
    tableblock += `<th>${heading}</th>\n`;
  }
  tableblock += `</thead>\n</tr>\n`;
  tableblock += `<tbody>\n`;
  for (const row of data.rows) {
    tableblock += `<tr>\n`;
    for (const column of row) {
      tableblock += `<td>`;
      for (const key in column) {
        if (column[key].name === "em") {
          tableblock += `<strong>${column[key].value}</strong>`;
        } else if (column[key].name === "strikethrough") {
          tableblock += `<del>${column[key].value}</del>`;
        } else if (column[key].name === "italic") {
          tableblock += `<em>${column[key].value}</em>`;
        } else if (column[key].name === "emitalic") {
          tableblock += `<em><strong>${column[key].value}</strong></em>`;
        } else if (column[key].name === "link") {
          const path = changeHtml(column[key].href);
          tableblock += `<a href="${path}" class="a">${column[key].title}</a>`;
        } else if (column[key].name === "image") {
          tableblock += `<img src="${column[key].src}" alt="${column[key].alt}" class="img" />`;
        } else if (column[key].name === "video") {
          tableblock += `<video controls preload="none" class="video">\n<source src="${column[key].src}" />\nSorry, your browser doesn't support embedded videos.\n</video>`;
        } else if (column[key].name === "code") {
          tableblock += `<code class="inline-code">${column[key].value}</code>`;
        } else if (column[key].name === "katex") {
          const html = Katex.renderToString(String.raw`\displaystyle ${column[key].value}`, {
            throwOnError: false,
          });
          tableblock += html;
        } else {
          tableblock += column[key].value;
        }
      }
      tableblock += `</td>\n`;
    }
    tableblock += `</tr>\n`;
  }
  tableblock += `</tbody>\n`;
  tableblock += `</table>\n`;
  return tableblock;
};

export const br = () => {
  return `<br class="br" />\n`;
};

export const colorBlock = (datas: Convert) => {
  let text = `<div class="message message-${datas.style}"><div class="message-icon-${datas.style}"></div>`;
  text += `<pre class="message-box">`;
  const data = datas.values;
  text += `<span>`;
  for (const key in data) {
    if (data[key].name === "em") {
      text += `<strong>${data[key].value}</strong>`;
    } else if (data[key].name === "strikethrough") {
      text += `<del>${data[key].value}</del>`;
    } else if (data[key].name === "italic") {
      text += `<em>${data[key].value}</em>`;
    } else if (data[key].name === "emitalic") {
      text += `<em><strong>${data[key].value}</strong></em>`;
    } else if (data[key].name === "link") {
      const path = changeHtml(data[key].href);
      text += `<a href="${path}" class="a">${data[key].title}</a>`;
    } else if (data[key].name === "image") {
      text += `<img src="${data[key].src}" alt="${data[key].alt}" />`;
    } else if (data[key].name === "code") {
      text += `<code class="inline-code">${data[key].value}</code>`;
    } else {
      if (data[key].value === "\n") {
        text += `<br>`;
      } else {
        text += data[key].value.replace(/\n/g, `\n`);
      }
    }
  }
  text += `</span>`;
  text += `</pre></div>\n`;
  return text;
};

export const Import = (data: string) => {
  return `<link rel="stylesheet" href="${data}">\n`;
};

export const startDetails = (data: string) => {
  return `<details class="details"><summary class="summary">${data}</summary>\n`;
};

export const endDetails = () => {
  return `</details>\n`;
};

export const startTag = (data: Convert) => {
  const tags = ["div", "menu", "main", "section", "article", "header", "aside", "nav", "footer"];

  if (!data.tag) {
    if (!data.style) {
      return `<div>\n`;
    } else {
      return `<div class="${data.style}">\n`;
    }
  } else {
    if (tags.includes(data.tag)) {
      if (!data.style) {
        return `<${data.tag}>\n`;
      } else {
        return `<${data.tag} class="${data.style}">\n`;
      }
    } else {
      return `<div>\n`;
    }
  }
};

export const endTag = (data: Convert) => {
  const tags = ["div", "menu", "main", "section", "article", "header", "aside", "nav", "footer"];

  if (!data.tag) {
    return `</div>\n`;
  }
  if (tags.includes(data.tag)) {
    return `</${data.tag}>\n`;
  } else {
    return `</div>\n`;
  }
};
