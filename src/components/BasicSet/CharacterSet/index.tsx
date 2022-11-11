import { Button } from 'antd'
import React, { useState } from 'react'
import ZhuangbeiSetModal from './ZhuangbeiSetModal'

import './index.css'

function CharacterSet({ getDpsFunction }) {
  const [zhuangbeiSetModalVisible, setZhuangbeiSetModalVisible] = useState<boolean>(false)

  return (
    <div className={'character-set'}>
      <Button onClick={() => setZhuangbeiSetModalVisible(true)}>配装器</Button>
      <ZhuangbeiSetModal
        visible={zhuangbeiSetModalVisible}
        getDpsFunction={getDpsFunction}
        onClose={(refreshDps) => {
          setZhuangbeiSetModalVisible(false)
          if (refreshDps) {
            getDpsFunction()
          }
        }}
      />
    </div>
  )
}

export default CharacterSet
