import { SkillMijiBasicDataDTO } from '@/@types/miji'
import Miji_Xingyunshi from './xingyunshi'
import Miji_Tingyunshi from './tingyunshi'
import Miji_Liukeyu from './liukeyu'
import Miji_Jueyunshi from './jueyunshi'
import Miji_Gufengpolang from './gufengpolang'
import Miji_Canglangsandie from './canglangsandie'
import Miji_Hengyunduanlang from './hengyunduanlang'
import Miji_Duanyunshi from './duanyunshi'
import Miji_Chushiyu from './chushiyu'

const skillMijiBasicData: SkillMijiBasicDataDTO[] = [
  {
    描述技能名称: '孤锋破浪',
    生效技能: ['孤锋破浪'],
    秘籍列表: Miji_Gufengpolang,
  },
  {
    描述技能名称: '沧浪三叠',
    生效技能: ['沧浪三叠·一', '沧浪三叠·二', '沧浪三叠·三'],
    秘籍列表: Miji_Canglangsandie,
  },
  {
    描述技能名称: '横云断浪',
    生效技能: ['横云断浪'],
    秘籍列表: Miji_Hengyunduanlang,
  },
  {
    描述技能名称: '行云势',
    生效技能: ['行云势·一', '行云势·二', '行云势·三'],
    秘籍列表: Miji_Xingyunshi,
  },
  {
    描述技能名称: '停云势',
    生效技能: ['停云势'],
    秘籍列表: Miji_Tingyunshi,
  },
  {
    描述技能名称: '留客雨',
    生效技能: ['留客雨'],
    秘籍列表: Miji_Liukeyu,
  },
  {
    描述技能名称: '断云势',
    生效技能: ['断云势', '断云势·额外伤害'],
    秘籍列表: Miji_Duanyunshi,
  },
  {
    描述技能名称: '决云势',
    生效技能: ['决云势'],
    秘籍列表: Miji_Jueyunshi,
  },
  {
    描述技能名称: '触石雨',
    生效技能: ['触石雨'],
    秘籍列表: Miji_Chushiyu,
  },
]

export default skillMijiBasicData
