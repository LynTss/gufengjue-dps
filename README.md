## 刀宗计算器

搞一个 readme 方便开发者阅读代码，找到对应功能的代码位置。

### 快速启动

```javascript
  // 安装依赖
  yarn // 或 npm install

  // 启动项目
  yarn run dev

  // 访问开发页面
  http://localhost:3000/
```

### 关键文件目录

```javascript
|- public                         // 网页项目所需要的静态资源文件
|- src
|   |- api                        // 调用外部接口的接口声明文件
|   |- components                 // 页面的组件组成
|   |   |- BasicSet               // 奇穴、循环、装备录入
|   |   |   |- CharacterSet       // 配装器
|   |   |   |- CharacterShow      // 属性展示
|   |   |   |- CommonSet          // 奇穴、秘籍设置
|   |   |   |- Zengyi             // 增益设置选项
|   |   |- DPS                    // 计算DPS的模块数据
|   |   |   |- DpsCountModal      // 技能统计弹窗
|   |   |   |- income             // 计算属性收益 - 非郭计算
|   |   |   |- guoshi_dps_utils   // 郭氏算法的dps计算类
|   |   |   |- wu_guoshi_dps_utils// 非郭氏算法的dps计算类
|   |   |   |- index              // dps计算的入口
|   |   |- Log                    // 计算器更新日志
|   |- data                       // 计算器所需要的各种数据文件
|   |   |- constant               // 计算基础常量
|   |   |- enchantGain            // 装备附魔数据
|   |   |- income                 // 计算增益所需的附魔数值
|   |   |- miji                   // 各技能秘籍数据
|   |   |- qixue                  // 本门派奇穴声明
|   |   |- skillCycle             // 计算器用于计算的循环数据
|   |   |   |- index              // 引用循环的入口
|   |   |- skillGain              // 各技能能吃到的增益集合
|   |   |- tuanduizengyi          // 团队增益（buff等）
|   |   |- wucaishi               // 五彩石数据
|   |   |- xiangqian              // 镶嵌孔数据
|   |   |- xiaochi                // 小药数据
|   |   |- zhenyan                // 各职业阵眼数据
|   |   |- zhuangbei              // 装备数据，来源于魔盒接口获取
|   |   |- skill                  // 各技能的伤害系数
|   |- utils                      // 各种工具类
|   |   |- dps-kernel-optimizer   // 优化算法
|   |   |- help                   // 项目内使用的辅助函数
|   |   |- skill-dps              // dps基础计算公式
|   |   |- tools                  // 装备导入所需的工具函数
```

### 其他说明

开发者可以通过自行修改 skillCycle 内的技能数和引用循环的入口自定义自己的循环，需要注意的是对于技能帧数和数量的输入会影响最终 dps 计算时间。
打开控制台可以看到当前战斗时间为多少，计算单位为秒。
