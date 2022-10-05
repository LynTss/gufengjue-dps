import React from 'react'
import { Table } from 'antd'
import { skillBasicDps, skillFinalDps, skillStandardDps } from '../../utils/skill-dps'
import GuFengJueSkillDataDTO from '../../data/skill'
import CharacterDTO from '../../data/character'
import styles from './index.less'

function SkillDamageTable() {
  const data = GuFengJueSkillDataDTO

  const columns = [
    {
      title: '技能名称',
      dataIndex: '技能名称',
      fix: 'left',
    },
    {
      title: '伤害系数',
      dataIndex: '技能伤害系数',
    },
    // {
    //   title: '实测系数',
    //   dataIndex: 'category',
    // },
    {
      title: '基础-min',
      dataIndex: '技能基础伤害_最小值',
    },
    {
      title: '基础-max',
      dataIndex: '技能基础伤害_最大值',
    },
    {
      title: '武伤系数',
      dataIndex: '武器伤害系数',
    },
    // {
    //   title: '系数实测',
    //   dataIndex: 'action',
    // },
    {
      title: '层数',
      dataIndex: '伤害计算次数',
    },
    {
      title: '原始伤害-min',
      dataIndex: 'yuanshi_min',
      render: (_, row) => {
        return skillBasicDps(row, CharacterDTO)?.min
      },
    },
    {
      title: '原始伤害-max',
      dataIndex: 'yuanshi_max',
      render: (_, row) => {
        return skillBasicDps(row, CharacterDTO)?.max
      },
    },
    {
      title: '基准伤害-min',
      dataIndex: 'jizhun_min',
      render: (_, row) => {
        const damage = skillBasicDps(row, CharacterDTO)?.min
        return skillStandardDps(damage, CharacterDTO)
      },
    },
    {
      title: '基准伤害-min',
      dataIndex: 'jizhun_max',
      render: (_, row) => {
        const damage = skillBasicDps(row, CharacterDTO)?.max
        return skillStandardDps(damage, CharacterDTO)
      },
    },
    {
      title: '最终伤害-min',
      dataIndex: 'min',
      className: 'keyTable',
      fix: 'right',
      width: 120,
      render: (_, row) => {
        return skillFinalDps(row, CharacterDTO)?.min
      },
    },
    {
      title: '最终伤害-max',
      dataIndex: 'max',
      className: 'keyTable',
      fix: 'right',
      width: 120,
      render: (_, row) => {
        return skillFinalDps(row, CharacterDTO)?.max
      },
    },
  ]

  return (
    <div>
      <Table
        className={styles.skillDamageTable}
        dataSource={data}
        pagination={false}
        columns={columns}
        scroll={{ x: 1300 }}
      />
    </div>
  )
}

export default SkillDamageTable
