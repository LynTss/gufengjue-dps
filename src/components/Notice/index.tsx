import React from 'react'
import './index.css'

function Notice() {
  return (
    <div className="notice">
      <h1>声明</h1>
      <p>1、由于当前刀宗没几个技能数值描述正确，所以存在大量的计算误差，数值仅提供参考。</p>
      <p>2、由于没加很多pve群，目前只内置了两种输出循环。如果有大佬有更好的循环可以联系我。</p>
      <p>3、没有内置流岚循环，暂时无完整的技能循环，2改后视情况更新</p>
      <p>4、刀宗循环还会存在大量变动，本计算器后期不定时更新。</p>
      <p>5、目前技能数按期望计算，其中截辕、避实击虚的数量仅为理论值。</p>
      <p>6、本计算器代码开源，有问题可以随时提交issue。或联系QQ：372103645</p>
      <h1>特别感谢</h1>
      <p>
        感谢
        <span> 777 </span>、<span> 七海 </span>大佬的帮助，感谢唐简大佬的理论支持
      </p>
      <p>由于本人完全没有制作计算器的经验，在学习过程中</p>
      <p>
        <span> 777 </span>大佬给了很多知识上的指导
      </p>
      <p>
        <span> 七海 </span>大佬提供了大量数据支持及循环数据
      </p>
      <p>
        文章中大量算法参考唐简：
        <a href="https://www.jx3box.com/bps/12752" target="_blank" rel="noreferrer">
          《精确伤害算法—郭氏理论》
        </a>
      </p>
    </div>
  )
}

export default Notice
