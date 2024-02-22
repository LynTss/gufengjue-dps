import React from 'react'
import DpsCountModal from '@/components/Dps/DpsCountModal'
import { DpsListData } from '@/components/Dps/guoshi_dps_utils'
import '../../../../index.css'

interface SkillCountModalProps {
  open: boolean
  onCancel: () => void
  dpsList: DpsListData[]
  total: number
}

const SkillCountModal: React.FC<SkillCountModalProps> = (props) => {
  const { open, onCancel, total, dpsList } = props

  return <DpsCountModal total={total} visible={open} onClose={() => onCancel()} dpsList={dpsList} />
}

export default SkillCountModal
