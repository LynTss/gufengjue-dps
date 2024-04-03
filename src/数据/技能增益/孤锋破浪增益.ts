import { SkillGainDTO } from '../../@types/skill'
import 通用增益 from './通用增益/通用增益'
import 大橙武技能增益 from './通用增益/大橙武技能增益'
import 破浪三式通用增益 from './通用增益/破浪三式通用增益'
import 门派套装增益 from './通用增益/门派套装增益'

const 孤锋破浪增益: SkillGainDTO[] = [
  ...通用增益,
  ...大橙武技能增益,
  ...破浪三式通用增益,
  ...门派套装增益,
]

export default 孤锋破浪增益
