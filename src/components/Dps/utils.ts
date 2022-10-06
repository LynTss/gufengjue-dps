import { CharacterFinalDTO } from '@/@types/character'
import { CycleDTO } from '@/@types/cycle'

interface GetDpsTotalParams {
  currentCycle: CycleDTO[]
  characterDTO: CharacterFinalDTO[]
}
export const getDpsTotal = (props: GetDpsTotalParams) => {
  return props
}
