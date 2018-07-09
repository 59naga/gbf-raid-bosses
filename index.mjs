import YAML from "js-yaml";
import { readdirSync, readFileSync, writeFileSync } from "fs";
import changeCase from "change-case";
import rimraf from "rimraf";
import mkdirp from "mkdirp";

const entry = "src";
const outDir = "dist";
const outFile = `./${outDir}/gbf-raid-bosses.json`;
rimraf.sync(`./${outDir}`);
mkdirp.sync(`./${outDir}`);

function normalize(name = "unknown") {
  return name.replace('Lvl', 'lv').replace(/[ _]/g, "");
}

const bosses = [];
readdirSync(`./${entry}`).forEach(file => {
  const [category, ext] = file.split(".");
  if (ext !== "yaml") {
    return;
  }

  const raids = YAML.safeLoad(readFileSync(`./${entry}/${file}`, "utf8"));
  raids.forEach(raid => {
    const extra = {};
    extra.alias = changeCase.paramCase(normalize(raid.name_en));
    extra.category = category;

    bosses.push(Object.assign({}, extra, raid));
  });
});
writeFileSync(
  `./${outDir}/gbf-raid-bosses.json`,
  JSON.stringify(bosses, null, 2)
);
