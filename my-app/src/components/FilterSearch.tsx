import TextField from '@mui/material/TextField';
import React, { ChangeEventHandler } from 'react';

const FilterSearch: React.FC<{  filterProducts: ChangeEventHandler<HTMLInputElement>, 
                                resetSearch: ()=>void, 
                                valueInput?: string}> 
    = ({ filterProducts, resetSearch, valueInput }) => {
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