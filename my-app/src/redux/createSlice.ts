import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Product } from '../model/Product'
import { SetClassToggle, CheckingStock, dataState } from '../model/model'

const initialState: dataState = {
    startingData: [],
    isLoading: true,
    dataFiltered: [],
    valueInput: '',
    toggleData: null,
    classToggleLeft: '',
    classToggleRight: ''
}

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setStartingData: (state, action: PayloadAction<Product[]>) => {
            if(state.startingData.length === 0){
                state.startingData = action.payload
            } else {
                throw new Error('Initial data cannot be changed')
            }
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        },
        setDataFiltered: (state, action: PayloadAction<Product[]>) => {
            state.dataFiltered = action.payload
        },
        setValueInput: (state, action: PayloadAction<string>) => {
            state.valueInput = action.payload
        },
        setToggleData: (state, action: PayloadAction<CheckingStock | null>) => {
            state.toggleData = action.payload
        },
        setClassToggleLeft: (state, action: PayloadAction<SetClassToggle>) => {
            state.classToggleLeft = action.payload
        },
        setClassToggleRight: (state, action: PayloadAction<SetClassToggle>) => {
            state.classToggleRight = action.payload
        }
    }
})

export const dataAction = dataSlice.actions

export default dataSlice.reducer