import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

// E:\js\SundayUI\IceblinkUI\packages\svg-icons\src
const dir = dirname(fileURLToPath(import.meta.url))

export const pathRoot = resolve(dir, '..')
export const pathSrc = resolve(pathRoot, 'src')
export const pathIcons = [resolve(pathRoot, 'svg')]
export const pathComponent = resolve(pathSrc, 'components')
// export const pathComponents = resolve(pathIcons, 'component')
