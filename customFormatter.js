const {  htmlAdapterWithHighlight } = require('@elog/cli');
const jsYaml = require('js-yaml');
/**
 * 自定义文档插件
 * @param {DocDetail} doc doc的类型定义为 DocDetail
 * @return {Promise<DocDetail>} 返回处理后的文档对象
 */

const format = async (doc, imageClient) => {
  // 将文档内容按换行符分割为数组
  const lines = doc.body.split('\n');

  // 识别第一个 ```yaml 代码块的开始和结束位置
  let yamlStart = -1;
  let yamlEnd = -1;

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() === '```yaml') {
      yamlStart = i; // 找到开始
    } else if (lines[i].trim() === '```' && yamlStart !== -1) {
      yamlEnd = i; // 找到结束
      break;
    }
  }

  // 如果找到 YAML 代码块
  if (yamlStart !== -1 && yamlEnd !== -1) {
    // 提取 YAML 代码块并解析成对象
    const yamlContent = lines.slice(yamlStart + 1, yamlEnd).join('\n');
    const yamlData = jsYaml.load(yamlContent);

    // 将 YAML 属性添加到 doc 对象的 properties 属性中
    doc.properties = { ...doc.properties, ...yamlData };

    // 删除 YAML 代码块
    doc.body = lines.slice(0, yamlStart).concat(lines.slice(yamlEnd + 1)).join('\n');
  }

  // 去除内容前后的空白符并确保每段之间有统一的空行
  const cleanedContent = doc.body
    .trim() // 去除前后空白
    .replace(/\n\s*\n/g, '\n\n') // 去除多余的空行，确保段落之间只有一个空行
    .replace(/[ \t]+$/gm, ''); // 去除行末尾的空格或制表符

  doc.body = cleanedContent;
  // doc.body_original = cleanedContent;

  doc.body_html = htmlAdapterWithHighlight(doc);
  return doc;
};


module.exports = {
  format,
};