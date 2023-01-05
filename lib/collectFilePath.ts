import fs from 'graceful-fs'
import path from 'node:path'
import { promisify } from 'node:util'

const readdir = promisify(fs.readdir)
const readFile = promisify(fs.readFile)

export default async function collectFilePath(
  dir: string,
) {
  let slugArrs = []
  const files = await readdir(dir, { withFileTypes: true } )
  for(const f of files) {
    const isDirectory = f.isDirectory()
    const filePath = isDirectory ? path.join(dir, f.name) : path.join(dir, path.parse(f.name).name)
    if(isDirectory) {
      slugArrs = [
        ...slugArrs,
        ...(await collectFilePath(filePath))
      ]
    } else {
      slugArrs.push(filePath)
    }
  }
  return slugArrs
}