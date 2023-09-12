/**
 * @name 奇穴数据
 */

export interface QixueListDTO {
  /**
   * @name 是否不可编辑
   */
  是否不可编辑?: boolean
  /**
   * @name 奇穴详情
   */
  奇穴列表: QixueDataDTO[]
}

/**
 * @name 奇穴数据内容
 */
export interface QixueDataDTO {
  /**
   * @name 奇穴名称
   */
  奇穴名称: string
  /**
   * @name 是否不可编辑
   */
  是否不可编辑?: boolean
  /**
   * @name 奇穴图片
   */
  奇穴图片: string
  /**
   * @name 奇穴加成技能
   */
  奇穴加成技能?: string[] | '通用'
  /**
   * @name 奇穴加成对应关系
   * @description 特殊需要说明的奇穴加成，例如放浩
   * @放浩 奇穴加成对应关系: {
          '沧浪三叠·一': '放皓·沧浪一',
          '沧浪三叠·二': '放皓·沧浪二',
          '沧浪三叠·三': '放皓·沧浪三',
        },
   */
  奇穴加成对应关系?: { [key: string]: string }
}
