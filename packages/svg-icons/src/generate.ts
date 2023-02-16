import { readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { ensureDirSync, emptyDirSync } from 'fs-extra'
import consola from 'consola'
import chalk from 'chalk'
import glob from 'fast-glob'
import camelcase from 'camelcase'
import type { Entry } from 'fast-glob'

import { format } from 'prettier'
import type { BuiltInParserName } from 'prettier'
import { pathComponent, pathIcons } from './path'

/**
 * 获取 svg 文件
 * @param iconDirs 
 * @returns 
 */
const getSvgFiles = (iconDirs: string[]): string[] => {
  const svgFiles:Entry[] = []

  for(const dir of iconDirs) {
    const entry = glob.sync('**/*.svg', {
      cwd: dir, // 查找目录
      stats: true, // 结果使用对象类型
      absolute: true // 返回绝对路径
    })
    svgFiles.push(...entry)
  }

  return svgFiles.map(svgFile => svgFile.path)
}

/**
 * 获取生成的 vue 组件名
 * @param file 
 * @returns 
 */
const getName = (file: string) => {
  const fileName = path.basename(file).replace('.svg', '')
  const componentName = camelcase(fileName, { pascalCase: true })

  return {
    fileName,
    componentName
  }
}

/**
 * 修改 svg 标签中的 fill 和 stroke 属性值
 * @param svgFile 
 * @returns 
 */
const enhanceSvgFile = (svgFile: string): string => {
  let content = svgFile
  content = content.replace(/stroke="[^"]*?"/g, 'stroke="currentColor"')
  content = content.replace(/fill="[^"]*?"/g, 'fill="currentColor"')
  content = content.replace(/(<[^<>/]*?)><\/[a-zA-Z0-9]*?>/g, '$1 />')
  return content
}

/**
 * prettier 格式化代码
 * @param code 
 * @param parser 
 * @returns 
 */
const formatCode = (code: string, parser: BuiltInParserName = 'typescript') => 
  format(code, {
    parser, // 使用的解析器
    semi: false,  // 不使用分号
    singleQuote: true // 单引号
  })

/**
 * 转换 svg 文件为 vue 组件
 * @param svgFile 
 */
function transformToVueComponent(svgFile: string) {
  const rawContent = readFileSync(svgFile, 'utf-8')
  const content = enhanceSvgFile(rawContent)

  const { fileName, componentName } = getName(svgFile)
  const vueCode = formatCode(`
<template>
${content}
</template>
<script lang="ts">
export default({
  name: "${componentName}",
})
</script>`, 
  'vue'
  )

  writeFileSync(
    path.resolve(pathComponent, `${fileName}.vue`), // 写入文件路径
    vueCode,  // 写入内容
    'utf-8'   // 编码格式
  )
}

/**
 * 生成入口文件 index.ts
 * @param files 
 */
function generateEntry(files: string[]) {
  const code = formatCode(
    files
      .map(file => {
        const { fileName, componentName } = getName(file)
        return `export { default as ${componentName} } from './${fileName}.vue'`
      })
      .join('\n')
  )

  writeFileSync(path.resolve(pathComponent, 'index.ts'), code, 'utf-8')
}

consola.log(chalk.bgCyan(' CHECK '), chalk.cyan('ensure output dir exist...'))
ensureDirSync(pathComponent)
emptyDirSync(pathComponent)

consola.log(chalk.bgCyan(' GENERATE '), chalk.cyan('transform svg icons to vue component...'))

const svgFiles = getSvgFiles(pathIcons)
svgFiles.forEach(svgFile => transformToVueComponent(svgFile))
generateEntry(svgFiles)

/* ensureDir & emptyDir
function ensureDir(dir: string):void {
  const isExist = existsSync(dir)
  console.log('目录是否存在：', isExist)
  if(!isExist) mkdirSync(dir)
}

function emptyDir(dir: string): void {
  const dirents = readdirSync(dir, { withFileTypes: true, encoding: 'utf-8' })
  for(const dirent of dirents) {
    const filePath = `${dir}\\${dirent.name}`
    console.log('清空文件', filePath)
    if(dirent.isDirectory()) {
      emptyDir(filePath)
      rmdirSync(filePath)
    } else unlinkSync(filePath)
  }
}
*/

/*
  // const dirItems = readdirSync(dir, {
  //   withFileTypes: true,
  //   encoding: 'utf-8',
  // })
  // // withFileTypes 转换为对象类型
  // for(const dirItem of dirItems) {
  //   if(dirItem.isDirectory()) {
  //     svgFiles.push(...getSvgFiles(dir + dirItem.name + '/'))
  //   } else {
  //     const matchRes = dirItem.name.match(svgFileNamePattern) ?? []
  //     const matches = matchRes.map((match) => `${dir}${match}`)
  //     svgFiles.push(...matches)
  //   }
  // }
*/

/* 
{
  name: 'checkmark.svg',
  path: 'E:/js/SundayUI/IceblinkUI/packages/svg-icons/svg/checkmark.svg',
  dirent: DirentFromStats {
    name: 'checkmark.svg',
    isBlockDevice: [Function: bound ],
    isCharacterDevice: [Function: bound ],
    isDirectory: [Function: bound ],
    isFIFO: [Function: bound ],
    isFile: [Function: bound ],
    isSocket: [Function: bound ],
    isSymbolicLink: [Function: bound ]
  },
  stats: Stats {
    dev: 2014715389,
    mode: 33206,
    nlink: 1,
    uid: 0,
    gid: 0,
    rdev: 0,
    blksize: 4096,
    ino: 10696049115745788,
    size: 423,
    blocks: 0,
    atimeMs: 1676448681021.04,
    mtimeMs: 1676448681007.4172,
    ctimeMs: 1676448681007.4172,
    birthtimeMs: 1676448678834.6704,
    atime: 2023-02-15T08:11:21.021Z,
    mtime: 2023-02-15T08:11:21.007Z,
    ctime: 2023-02-15T08:11:21.007Z,
    birthtime: 2023-02-15T08:11:18.835Z
  }
} */