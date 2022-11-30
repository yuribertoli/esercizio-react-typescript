import TextField from '@mui/material/TextField';
import React, { ChangeEventHandler } from 'react';
import { useSelector } from "react-redux"
import type { RootState } from '../redux/store'

const FilterSearch: React.FC<{ filterProducts: ChangeEventHandler<HTMLInputElement>, 
                               resetSearch: ()=>void }> 
    = ({ filterProducts, resetSearch }) => {

    const {valueInput} = useSelector((state: RootState) => state.data)

    return (
        <div className="searchingBar">
            <TextField  value={valueInput || ''} 
                        id='outlined-basic' 
                        variant='outlined' 
                        label="Search" 
                        onChange={filterProducts}
            />
            <button className='resetBtn' onClick={resetSearch}>RESET</button>
        </div>
    )
}

export default FilterSearch; 