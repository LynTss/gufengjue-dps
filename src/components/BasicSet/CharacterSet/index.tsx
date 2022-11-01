import { Button } from 'antd'
import React, { useState } from 'react'
import CharacterInputSetModal from './CharacterInputSetModal'
import ZhuangbeiSetModal from './ZhuangbeiSetModal'

import './index.css'

function CharacterSet({ getDpsFunction }) {
  const [characterInputSetModalVisible, setCharacterInputSetModalVisible] = useState<boolean>(false)
  const [zhuangbeiSetModalVisible, setZhuangbeiSetModalVisible] = useState<boolean>(false)

  return (
    <div className={'character-set'}>
      <Button onClick={() => setCharacterInputSetModalVisible(true)}>属性录入</Button>
      <Button type="primary" onClick={() => setZhuangbeiSetModalVisible(true)}>
        配装器
      </Button>
      <CharacterInputSetModal
        visible={characterInputSetModalVisible}
        onClose={(refreshDps) => {
          setCharacterInputSetModalVisible(false)
          if (refreshDps) {
            getDpsFunction()
          }
        }}
      />
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
