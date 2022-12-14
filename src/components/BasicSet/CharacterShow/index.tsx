import React from 'react'
import { 属性系数 } from '@/data/constant'
import { useAppSelector } from '@/hooks'
import { CharacterFinalDTO } from '@/@types/character'

import './index.css'
import { Tooltip } from 'antd'

function CharacterShow() {
  const characterFinalData = useAppSelector((state) => state?.basic?.characterFinalData)

  const mapKeyList = ['力道', '攻击力', '会心', '会心效果', '破防', '无双', '破招', '加速']

  return (
    <div className={'character-show'}>
      <h1 className={'character-title'}>角色属性</h1>
      {mapKeyList.map((item) => {
        return (
          <div className="character-item" key={item}>
            <h1 className="character-label">{item}</h1>
            <Tooltip placement="topLeft" title={getCharacterDataNumber(item, characterFinalData)}>
              <div className="character-content">{getCharacterData(item, characterFinalData)}</div>
            </Tooltip>
          </div>
        )
      })}
    </div>
  )
}

export default CharacterShow

const getCharacterData = (key: string, characterFinalData: CharacterFinalDTO) => {
  switch (key) {
    case '力道':
      return characterFinalData.力道 || 0
    case '攻击力':
      return characterFinalData.面板攻击 || 0
    case '会心':
      return ((characterFinalData.会心值 / 属性系数.会心) * 100).toFixed(2) + `%`
    case '会心效果':
      return ((characterFinalData.会心效果值 / 属性系数.会效) * 100 + 175).toFixed(2) + `%`
    case '破防':
      return ((characterFinalData.破防值 / 属性系数.破防) * 100).toFixed(2) + `%`
    case '无双':
      return ((characterFinalData.无双值 / 属性系数.无双) * 100).toFixed(2) + `%`
    case '破招':
      return characterFinalData.破招值 || 0
    case '加速':
      return (
        <>
          <span>{(((characterFinalData.加速值 || 0) / 属性系数.急速) * 100).toFixed(2) + `%`}</span>
          <span>
            {(characterFinalData.加速值 || 0) < 95
              ? '零段加速'
              : characterFinalData.加速值 < 4241
              ? '一段加速'
              : characterFinalData.加速值 < 8857
              ? '二段加速'
              : characterFinalData.加速值 < 13851
              ? '三段加速'
              : characterFinalData.加速值 < 19316
              ? '四段加速'
              : '五段加速'}
          </span>
        </>
      )
  }
  return ''
}

const getCharacterDataNumber = (key: string, characterFinalData: CharacterFinalDTO) => {
  switch (key) {
    case '力道':
      return characterFinalData.力道 || 0
    case '攻击力':
      return characterFinalData.面板攻击 || 0
    case '会心':
      return characterFinalData.会心值
    case '会心效果':
      return characterFinalData.会心效果值
    case '破防':
      return characterFinalData.破防值
    case '无双':
      return characterFinalData.无双值
    case '破招':
      return characterFinalData.破招值 || 0
    case '加速':
      return characterFinalData.加速值
  }
  return ''
}
