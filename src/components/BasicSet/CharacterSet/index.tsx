import { Button, message } from 'antd'
import React, { useState } from 'react'
// import ShuxingSet from './ShuxingSet'
import CharacterInputSetModal from './CharacterInputSetModal'

import './index.css'

function CharacterSet({ getDpsFunction }) {
  const [characterInputSetModalVisible, setCharacterInputSetModalVisible] = useState<boolean>(false)
  return (
    <div className={'character-set'}>
      <Button onClick={() => setCharacterInputSetModalVisible(true)}>属性录入</Button>
      <Button type="primary" onClick={() => message.success('coming soon')}>
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
    </div>
  )
}

export default CharacterSet
