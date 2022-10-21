import { Button, Drawer } from 'antd'
import React, { useState } from 'react'

function MijiSet({ getDpsFunction }) {
  const [visible, setVisible] = useState<boolean>(false)
  return (
    <>
      <Button onClick={() => setVisible(true)}>秘籍设置</Button>
      <Drawer
        title={'秘籍设置'}
        // height={200}
        visible={visible}
        mask={false}
        placement="left"
        onClose={() => {
          setVisible(false)
          getDpsFunction()
        }}
      >
        123
      </Drawer>
    </>
  )
}

export default MijiSet
