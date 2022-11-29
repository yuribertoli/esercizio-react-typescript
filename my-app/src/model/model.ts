import { Product } from './Product'

export type CheckingStock = 0 | 1

export type SetClassToggle = 'toggleLabel' | ''

export interface dataState {
    startingData: Product[],
    isLoading: boolean,
    dataFiltered: Product[],
    valueInput: string | undefined,
    toggleData: CheckingStock | null,
    classToggleLeft: SetClassToggle,
    classToggleRight: SetClassToggle
}