import React from 'react'
import DpsCountModal from '@/components/Dps/DpsCountModal'
import { 技能伤害结果列表类型 } from '@/@types/dps'
import '../../../../index.css'

interface SkillCountModalProps {
  open: boolean
  onCancel: () => void
  dpsList: 技能伤害结果列表类型[]
  total: number
}

const SkillCountModal: React.FC<SkillCountModalProps> = (props) => {
  const { open, onCancel, total, dpsList } = props

  return <DpsCountModal total={total} visible={open} onClose={() => onCancel()} dpsList={dpsList} />
}

export default SkillCountModal
