import { SkillGainDTO } from '../../@types/skill'
import 通用增益 from './通用增益/通用增益'
import 小橙武技能增益 from './通用增益/小橙武技能增益'
import 大橙武技能增益 from './通用增益/大橙武技能增益'
import 破浪三式通用增益 from './通用增益/破浪三式通用增益'

const 沧浪三叠增益: SkillGainDTO[] = [
  ...通用增益,
  ...小橙武技能增益,
  ...大橙武技能增益,
  ...破浪三式通用增益,
]

export default 沧浪三叠增益
