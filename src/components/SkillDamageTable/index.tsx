import React from 'react'
import { Modal, Table } from 'antd'
import { skillBasicDps, skillFinalDps } from '../../utils/skill-dps'
import { useAppSelector } from '@/hooks'
import './index.css'

function SkillDamageTable({ visible, onClose }) {
  const 角色最终属性 = useAppSelector((state) => state?.basic?.角色最终属性)
  const 当前输出计算目标 = useAppSelector((state) => state?.basic?.当前输出计算目标)
  const 技能基础数据 = useAppSelector((state) => state?.basic?.技能基础数据)

  // const hrefSkill = location.href?.includes('?skill=1')
  // useEffect(() => {
  //   if (hrefSkill) {
  //     setVisible(true)
  //   }
  // }, [hrefSkill])

  const columns = [
    {
      title: '技能名称',
      dataIndex: '技能名称',
      fixed: 'left',
    },
    {
      title: '伤害系数',
      dataIndex: '技能伤害系数',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.技能伤害系数 - b.技能伤害系数,
    },
    {
      title: '武伤系数',
      dataIndex: '武器伤害系数',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.武器伤害系数 - b.武器伤害系数,
    },
    {
      title: '基础-min',
      dataIndex: '技能基础伤害_最小值',
    },
    {
      title: '基础-max',
      dataIndex: '技能基础伤害_最大值',
    },
    {
      title: '层数',
      dataIndex: '伤害计算次数',
    },
    {
      title: '原始伤害-min',
      dataIndex: 'yuanshi_min',
      render: (_, row) => {
        return skillBasicDps(row, 角色最终属性)?.min
      },
    },
    {
      title: '原始伤害-max',
      dataIndex: 'yuanshi_max',
      render: (_, row) => {
        return skillBasicDps(row, 角色最终属性)?.max
      },
    },
    {
      title: '实际伤害-min',
      dataIndex: 'min',
      className: 'keyTable',
      fix: 'right',
      width: 120,
      render: (_, row) => {
        return skillFinalDps(row, 角色最终属性, 当前输出计算目标)?.min
      },
    },
    {
      title: '实际伤害-max',
      dataIndex: 'max',
      className: 'keyTable',
      defaultSortOrder: 'descend',
      sorter: (a, b) => {
        return (
          skillFinalDps(a, 角色最终属性, 当前输出计算目标)?.max -
          skillFinalDps(b, 角色最终属性, 当前输出计算目标)?.max
        )
      },
      fix: 'right',
      width: 120,
      render: (_, row) => {
        return skillFinalDps(row, 角色最终属性, 当前输出计算目标)?.max
      },
    },
  ]

  return (
    <div className='skill-dmage-wrapper'>
      <Modal
        title={'技能详细数据及计算过程数据'}
        centered
        footer={null}
        width={'100%'}
        className={'skillDmageVisible'}
        open={visible}
        onCancel={() => onClose(false)}
      >
        <Table
          rowKey={'技能名称'}
          className={'skillDamageTable'}
          dataSource={技能基础数据}
          pagination={false}
          columns={columns as any}
          scroll={{ x: 'max-content' }}
        />
      </Modal>
    </div>
  )
}

export default SkillDamageTable
