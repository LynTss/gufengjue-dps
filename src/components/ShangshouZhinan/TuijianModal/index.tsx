import { Divider, Modal, Tabs } from 'antd'
import React from 'react'
import './index.css'

function TuijianModal({ visible, onClose }) {
  const items = [
    {
      label: '新手上路',
      key: '新手上路',
      children: (
        <div className="tuijian-content">
          <p>
            入门推荐： 先使用
            <a
              style={{ padding: '0 8px' }}
              href="https://www.jx3box.com/macro/45077"
              target="_blank"
              rel="noreferrer"
            >
              驭耀一键宏
            </a>
            熟悉刀宗循环，熟悉锐意及开游的位置
          </p>
          <p>
            如何起手快速的上破绽参考：
            <a
              href="https://www.bilibili.com/video/BV1Ke4y1U7rr"
              target={'_blank'}
              rel="noreferrer"
            >
              起手4破
            </a>
          </p>
          <p>合格标准：5分钟可以打完121孤锋</p>
        </div>
      ),
    },
    {
      label: '进阶之路',
      key: '进阶之路',
      children: (
        <div className="tuijian-content">
          <p>那么大家都说的周流如何去打呢，可以先看一下两个视频加深对周流的理解</p>
          <p>
            周流开游原则：
            <p>
              <span className="tuijian-important">
                不要在灭影快好的时候放。不要在70以上锐意时候放。不要在自身带识破的时候放。
              </span>
              <span className="tuijian-very-important">黑鬼在boss快要点名的时候不要放。</span>
            </p>
          </p>
          <Divider />
          <p>
            周流讲解视频1：
            <a href="https://www.bilibili.com/video/BV1nR4y1Q7wu/" target="_blank" rel="noreferrer">
              老天一驭耀、周流讲解视频
            </a>
          </p>
          <p>
            周流讲解视频2：
            <a
              href="https://www.bilibili.com/video/BV1Ud4y1c7m8/"
              target={'_blank'}
              rel="noreferrer"
            >
              周流全面讲解视频
            </a>
          </p>
          <Divider />
          <p>周流辅助宏可以暂时先使用老天一的辅助宏，结合自己的实际情况修改</p>
          <p className="tuijian-important">
            宏只有结合自己的实际使用修改才最佳，切勿盲目照搬他人的宏
          </p>
          <p>练习周流建议尽量在副本中练习，不然很可能导致木桩熟手副本懵逼的情况</p>
          <p>如果练习周流的过程中，5分钟无法打到137孤以上，请继续实战多多练习</p>
          <Divider />
          <h4>标准</h4>
          <p>5分钟打完141孤锋</p>
        </div>
      ),
    },
    {
      label: '高手进阶',
      key: '高手进阶',
      children: (
        <div className="tuijian-content">
          <p>在对周流有一定的了解以后，追求极限的周流应该追求什么样的循环呢</p>
          <p>
            仅做参考视频：
            <a href="https://www.bilibili.com/video/BV1YW4y1j7sR/" target="_blank" rel="noreferrer">
              横刀断浪9300刀宗周流循环木桩练习 - 七海
            </a>
          </p>
          <p className="tuijian-important">期待众位大佬继续勇攀高峰，发现更好的打法</p>
        </div>
      ),
    },
  ]
  return (
    <Modal
      className="tuijian-modal"
      title={
        <span>
          如何快速上手刀宗PVE
          <span className="tuijian-important" style={{ marginLeft: 16 }}>
            请在保证已经对刀宗的技能、奇穴有基础了解的前提下开始
          </span>
        </span>
      }
      centered
      width={800}
      open={visible}
      onCancel={() => onClose(false)}
      footer={null}
    >
      <h3>核心思路</h3>
      <ul style={{ marginBottom: 24 }}>
        <li className="tuijian-important">在不浪费锐意、灭CD的情况下更快的切双刀以打出更多的孤</li>
        <li>尽快的叠满破绽和保证破绽不断以保证避实击虚的数量</li>
      </ul>
      <Tabs items={items} />
    </Modal>
  )
}

export default TuijianModal
