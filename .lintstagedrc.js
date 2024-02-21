import { ESLint } from 'eslint'

const removeIgnoredFiles = async files => {
  const eslint = new ESLint()
  const isIgnored = await Promise.all(
    files.map(file => {
      return eslint.isPathIgnored(file)
    })
  )
  const filteredFiles = files.filter((_, i) => !isIgnored[i])
  return filteredFiles.join(' ')
}

export default {
  'src/**/*.ts{,x}': async files => {
    const filesToLint = await removeIgnoredFiles(files)
    return [`npx eslint --max-warnings=0 ${filesToLint}`]
  },
  'src/**/*.{js,jsx,ts,tsx,json,css,scss,md}': ['prettier --write'],
  '*.js': 'npx eslint --cache --fix',
  '*.{js,css,md}': 'prettier --write'
}
