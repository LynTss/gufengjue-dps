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

export const 龙门_武器Ids: number[] = [36910]
// 特效武器
export const 特效_武器Ids: number[] = [34765]
export const 特效_武器_2Ids: number[] = [35780]
// 特效腰坠
export const 特效_腰椎Ids: number[] = [37719]
export const 特效_腰椎_2Ids: number[] = [38790]
// 切糕套装
export const 切糕套装_1Ids: number[] = [94463, 94487, 94481, 94475, 94469, 94493]

export const 切糕套装_2Ids: number[] = [96366, 96390, 96384, 96378, 96372, 96396]
// 大CW特效Ids
export const 大CW特效Ids: number[] = [33107, 33137, 34373, 34403, 34433, 35597, 35627, 36568, 36598]
export const 小CW特效Ids: number[] = [34313, 37072]

// 2022冬至套装
export const 冬至套装_1Ids: number[] = [36858, 39790, 98126, 98156]

// 2件套会心 4件套孤锋10%
export const 套装_1Ids: number[] = [96134, 96224, 96194, 96164, 96254]
export const 套装_3Ids: number[] = []
// 2件套孤锋10% 4件套会心
export const 套装_2Ids: number[] = [94248, 94335, 94306, 94277, 94364]

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
