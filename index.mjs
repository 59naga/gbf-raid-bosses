import YAML from 'js-yaml'
import { readdirSync, readFileSync, writeFileSync } from 'fs'
import changeCase from 'change-case'
import rimraf from 'rimraf'
import mkdirp from 'mkdirp'

const entry = 'src'
const outDir = 'dist'
const outFile = `./${outDir}/gbf-raid-bosses.json`
rimraf.sync(`./${outDir}`)
mkdirp.sync(`./${outDir}`)

buildBosses()
buildIndexes()

function normalize(name = 'unknown') {
  return name.replace('Lvl', 'lv').replace(/[ _]/g, '')
}

function readFileBosses() {
  const bosses = []
  readdirSync(`./${entry}`).forEach(file => {
    const [category, ext] = file.split('.')
    if (ext !== 'yaml') {
      return
    }

    const raids = YAML.safeLoad(readFileSync(`./${entry}/${file}`, 'utf8'))
    raids.forEach(raid => {
      const extra = {}
      extra.alias = changeCase.paramCase(normalize(raid.name_en))
      extra.category = category

      bosses.push(Object.assign({}, extra, raid))
    })
  })
  return bosses
}

function buildBosses() {
  const bosses = readFileBosses()
  writeFileSync(
    `./${outDir}/gbf-raid-bosses.json`,
    JSON.stringify(bosses, null, 2)
  )
}

function buildIndexes() {
  const bosses = readFileBosses()
  const indexes = bosses.reduce((indexes, boss, index) => {
    indexes[boss.name] = index
    indexes[boss.name_en] = index
    return indexes
  }, {})

  writeFileSync(`./${outDir}/indexes.json`, JSON.stringify(indexes, null, 2))
}
