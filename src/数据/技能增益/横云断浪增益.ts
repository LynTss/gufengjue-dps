import { SkillGainDTO } from '../../@types/skill'
import 通用增益 from './通用增益/通用增益'
import 破浪三式通用增益 from './通用增益/破浪三式通用增益'

const 横云断浪增益: SkillGainDTO[] = [...通用增益, ...破浪三式通用增益]

export default 横云断浪增益
