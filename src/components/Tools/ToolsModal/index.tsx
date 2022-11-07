import { Modal, Tabs } from 'antd'
import React from 'react'
import ZhuangbeiDaoru from './ZhuangbeiDaoru'
import WucaishiDaoru from './WucaishiDaoru'
import './index.css'

function ToolsModal({ visible, onClose }) {
  const items = [
    { label: '装备导入', key: '装备导入', children: <ZhuangbeiDaoru /> },
    { label: '五彩石导入', key: '五彩石导入', children: <WucaishiDaoru /> },
  ]
  return (
    <Modal
      className="tools-modal"
      title={'开发者工具'}
      centered
      width={800}
      open={visible}
      onCancel={() => onClose(false)}
      footer={null}
    >
      <Tabs items={items} />
    </Modal>
  )
}

export default ToolsModal
