import assert from 'assert'

import bosses from '../dist/gbf-raid-bosses.json'
import indexes from '../dist/indexes.json'

it('和名からbossesの該当オブジェクトの参照を取得できるべき(#1)', () => {
  assert(bosses[indexes['Lv60 青竜']])
})

it('HARD+を取得できるべき(#2)', () => {
  assert(bosses[indexes['Lv60 ティアマト']])
})
