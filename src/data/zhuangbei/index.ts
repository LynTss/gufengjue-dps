import ZHUANGBEI_MAOZI from './maozi'
import ZHUANGBEI_YIFU from './yifu'
import ZHUANGBEI_YAODAI from './yaodai'
import ZHUANGBEI_HUWAN from './huwan'
import ZHUANGBEI_XIAZHUANG from './xiazhuang'
import ZHUANGBEI_XIEZI from './xiezi'
import ZHUANGBEI_XIANGLIAN from './xianglian'
import ZHUANGBEI_YAOZHUI from './yaozhui'
import ZHUANGBEI_JIEZHI from './jiezhi'
import ZHUANGBEI_YUANCHENGWUQI from './yuanchengwuqi'
import ZHUANGBEI_JINSHENWUQI from './jinshenwuqi'

// 2件套会心 4件套孤锋10%
export const 套装_1Ids = [91076, 91163, 91134, 91105, 91192]
// 2件套孤锋10% 4件套会心
export const 套装_2Ids = [90763, 90850, 90821, 90792, 90879]
export const 特效_武器Ids = [32989]
export const 特效_腰椎Ids = [34381]
// 切糕套装
export const 切糕套装_1Ids = [91291, 91315, 91309, 91303, 91297, 91321]
// 大CW特效Ids
export const 大CW特效Ids = [33107, 33137, 34373, 34403, 34433]
export const 小CW特效Ids: number[] = [34313]

const ZUANGBEI_DATA = {
  帽子: ZHUANGBEI_MAOZI,
  衣服: ZHUANGBEI_YIFU,
  腰带: ZHUANGBEI_YAODAI,
  护腕: ZHUANGBEI_HUWAN,
  下装: ZHUANGBEI_XIAZHUANG,
  鞋子: ZHUANGBEI_XIEZI,
  项链: ZHUANGBEI_XIANGLIAN,
  腰坠: ZHUANGBEI_YAOZHUI,
  戒指: ZHUANGBEI_JIEZHI,
  暗器: ZHUANGBEI_YUANCHENGWUQI,
  武器: ZHUANGBEI_JINSHENWUQI,
}

export default ZUANGBEI_DATA
