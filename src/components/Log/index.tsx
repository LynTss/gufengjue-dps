import { Button, Modal, Timeline } from 'antd'
import React, { useEffect, useState } from 'react'
import './index.css'
import log_data from './log_data'

function Log() {
  const [visible, setVisible] = useState(false)
  const [newVersionModalVisible, setNewVersionModalVisible] = useState(false)

  useEffect(() => {
    checkLogVersion()
  }, [])

  const checkLogVersion = () => {
    const storageVersion = localStorage.getItem('new_log_version')
    if (!storageVersion || storageVersion !== log_data?.[0]?.version) {
      setNewVersionModalVisible(true)
    }
  }

  const handleCloseNew = () => {
    localStorage?.setItem('new_log_version', log_data?.[0]?.version)
    setNewVersionModalVisible(false)
  }

  return (
    <div className='log-wrap'>
      <span>当前版本: {log_data?.[0]?.version}</span>
      <span className='log' onClick={() => setVisible(true)}>
        更新日志
      </span>
      <Modal
        width={800}
        title='新版本公告'
        centered
        open={newVersionModalVisible}
        onCancel={handleCloseNew}
        footer={
          <Button onClick={handleCloseNew} type='primary'>
            知道了
          </Button>
        }
      >
        <Timeline className={'log-line'}>
          <Timeline.Item style={{ padding: 0 }}>
            <div className='log-content-text'>
              {Array.isArray(log_data?.[0].content)
                ? log_data?.[0].content.map((a, index) => {
                    return <div key={index}>{a}</div>
                  })
                : log_data?.[0].content}
            </div>
            <div className='log-right'>
              <p className='log-version'>{log_data?.[0].version}</p>
              <p className='log-date'>{log_data?.[0].date || '-'}</p>
            </div>
          </Timeline.Item>
        </Timeline>
      </Modal>
      <Modal
        width={800}
        title='更新日志'
        centered
        className='log-modal'
        open={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <Timeline className={'log-line'}>
          {log_data.map((item) => {
            return (
              <Timeline.Item key={item.version}>
                <div className='log-content-text'>
                  {Array.isArray(item.content)
                    ? item.content.map((a) => {
                        return <div key={a}>{a}</div>
                      })
                    : item.content}
                </div>
                <div className='log-right'>
                  <p className='log-version'>{item.version}</p>
                  <p className='log-date'>{item.date || '-'}</p>
                </div>
              </Timeline.Item>
            )
          })}
        </Timeline>
      </Modal>
    </div>
  )
}

export default Log
