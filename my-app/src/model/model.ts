import { Product } from './Product'

export type CheckingStock = 0 | 1

export type DataFiltered = Product | null | undefined;

export type SetClassToggle = 'toggleLabel' | ''

export interface dataState {
    startingData: Product[],
    isLoading: boolean,
    dataFiltered: Product[],
    valueInput: string,
    toggleData: CheckingStock | null,
    classToggleLeft: SetClassToggle,
    classToggleRight: SetClassToggle
}