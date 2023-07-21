import fs from 'fs/promises'
import path from 'path'

export async function writeFile(
  nameFile: string,
  content: any,
  pathOutput = 'openapi',
): Promise<void> {
  pathOutput = path.resolve(pathOutput)
  const contentString = JSON.stringify(content, null, 2)
  await fs.writeFile(`${pathOutput}/${nameFile}`, contentString, {
    encoding: 'utf8',
  })
}
