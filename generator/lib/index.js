const fs = require('fs');
const path = require('path');

const outputPath = path.resolve('./app');
const templateName = 'comment';       // 资源名称
let pluralTemplateName = '';       // 资源名称的复数形式
const tableName = 'tt_comment'

//首字母大写
const firstToUpperCase = str => {
    if (!str) return false;
    return str
        .split('')
        .map((char, index) => index === 0 ? char.toUpperCase() : char)
        .join('')
}

pluralTemplateName = pluralTemplateName || `${templateName}s`;
const firseUpperTemplateName = firstToUpperCase(templateName); // 首字母大写的资源名称

// 将文件模板信息读取带内存中
const loopRead = (templateBasePath, currentBasename) => {
    let result = undefined;
    const templatePath = `${templateBasePath}/${currentBasename}`;
    const stats = fs.statSync(templatePath);
    if (stats.isDirectory()) {
        const filenames = fs.readdirSync(templatePath);
        return {
            [currentBasename]: filenames
                .map(filename => loopRead(templatePath, filename))
                .reduce((a, b) => Object.assign(a, b), {})
        }
    } else {
        const data = fs.readFileSync(templatePath);
        return {
            [currentBasename]: data.toString()
        };
    }
}

// 根据内存中的文件信息生成文件
const loopWrite = (outputPath, key, data) => {
    const hasChildren = data => typeof data === 'object';
    const targetOutputPath = `${outputPath}/${key}`;
    if (hasChildren(data)) {
        const exists = fs.existsSync(targetOutputPath);
        if (!exists) {
            fs.mkdirSync(targetOutputPath)
            console.log(`created dir  ${targetOutputPath}`)
        }
        Object
            .keys(data)
            .forEach(key => loopWrite(targetOutputPath, key, data[key]))
    } else {
        fs.writeFileSync(targetOutputPath, data);
        console.log(`created file ${targetOutputPath}`)
    }
}

// 替换模板变量
const replaceTemplate = data => {
    return JSON.parse(
        JSON.stringify(data)
            .replace(/{{tableName}}/g, tableName)
            .replace(/{{templateName}}/g, templateName)
            .replace(/{{pluralTemplateName}}/g, pluralTemplateName)
            .replace(/{{firseUpperTemplateName}}/g, firseUpperTemplateName)
    )
}

const templateBasePath = path.resolve('./generator');
const currentBasename = 'templates';

const result = loopRead(templateBasePath, currentBasename);
const targetData = replaceTemplate(result[currentBasename]);
Object
    .keys(targetData)
    .map(key => loopWrite(outputPath, key, targetData[key]))


