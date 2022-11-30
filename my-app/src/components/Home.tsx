import '../style/App.css';
import React, { useEffect } from 'react';
import CheckStock from './CheckStock';
import FilterSearch from './FilterSearch';
import ListItem from './ListItem';
import { CheckingStock } from '../model/model';
//redux:
import type { RootState } from '../redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { dataAction } from '../redux/createSlice';

const Home: React.FC = () => {

  const dispatch = useDispatch()

  const {startingData, dataFiltered, valueInput, toggleData, classToggleLeft, classToggleRight} = useSelector((state: RootState) => state.data)

  useEffect(() => {
    dispatch(dataAction.setDataFiltered(startingData))
    // eslint-disable-next-line
  }, []);

  // Funzione per filtrare i prodotti da mostrare in base all'input dell'utente
  const filterProducts = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

    dispatch(dataAction.setValueInput(event.target.value));

    switch (toggleData) {
      case 0:
        dispatch(dataAction.setDataFiltered(startingData.filter((element) => element.availability.stock === 0
                                 && element.name.toLowerCase().includes(event.target.value.toLowerCase()))))
        break;
      case 1:
        dispatch(dataAction.setDataFiltered(startingData.filter((element) => element.availability.stock > 0 
                                 && element.name.toLowerCase().includes(event.target.value.toLowerCase()))))
        break;
      default:
        dispatch(dataAction.setDataFiltered(startingData.filter((element) => element.name.toLowerCase().includes(event.target.value.toLowerCase()))))
    }
  }

  // Funzione per resettare i valori nell'input di filtraggio e mostrare tutti i prodotti
  const resetSearch = () => {
    dispatch(dataAction.setToggleData(null));
    dispatch(dataAction.setClassToggleLeft(''));
    dispatch(dataAction.setClassToggleRight(''));
    dispatch(dataAction.setValueInput(''));
    dispatch(dataAction.setDataFiltered(startingData));
  }

  // Funzione per filtrare i prodotti in base alla loro quantità in stock
  const checkIfInStock = (value: CheckingStock | null) => {
    if (toggleData === value) {
      dispatch(dataAction.setDataFiltered(startingData.filter(el => el.name.toLowerCase().includes(valueInput.toLowerCase()))));
      dispatch(dataAction.setToggleData(null));
      dispatch(dataAction.setClassToggleLeft(''));
      dispatch(dataAction.setClassToggleRight(''));

    } else {

      if (value === 1) {
        dispatch(dataAction.setDataFiltered(startingData.filter(element => element.availability.stock > 0
                                                     && element.name.toLowerCase().includes(valueInput.toLowerCase()))));
        dispatch(dataAction.setToggleData(1));
        dispatch(dataAction.setClassToggleLeft('toggleLabel'))
        dispatch(dataAction.setClassToggleRight(''))

      } else if (value === 0) {
        dispatch(dataAction.setDataFiltered(startingData.filter(element => element.availability.stock === 0
                                                     && element.name.toLowerCase().includes(valueInput.toLowerCase()))));
        dispatch(dataAction.setToggleData(0));
        dispatch(dataAction.setClassToggleRight('toggleLabel'))
        dispatch(dataAction.setClassToggleLeft(''))
      }
    }
  }

  return (
    <div>

      <header>

        <div id='logo'>150x80</div>

        <CheckStock checkIfInStock={checkIfInStock} classToggleLeft={classToggleLeft} classToggleRight={classToggleRight} />

        <FilterSearch filterProducts={filterProducts} resetSearch={resetSearch} valueInput={valueInput} />

      </header>

      <main>
        {dataFiltered.length === 0 ? <h1>No products found</h1> :
          <ul>
            {dataFiltered.map((element) => {
              return <ListItem key={element.UPC} element={element} />
            })}
          </ul>
        }
      </main>

    </div>
  )
}

export default Home;
