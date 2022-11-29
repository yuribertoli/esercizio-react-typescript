import '../style/App.css';
import React, { useEffect } from 'react';
import CheckStock from './CheckStock';
import FilterSearch from './FilterSearch';
import ListItem from './ListItem';
import { CheckingStock } from '../model/model';
//redux:
import type { RootState } from '../redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { setDataFiltered, setValueInput, setToggleData, setClassToggleLeft, setClassToggleRight } from '../redux/createSlice';

const Home: React.FC = () => {

  const dispatch = useDispatch()

  const {startingData, dataFiltered, valueInput, toggleData, classToggleLeft, classToggleRight} = useSelector((state: RootState) => state.data)

  useEffect(() => {
    dispatch(setDataFiltered(startingData))
    // eslint-disable-next-line
  }, []);

  // Funzione per filtrare i prodotti da mostrare in base all'input dell'utente
  const filterProducts = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

    dispatch(setValueInput(event.target.value));

    switch (toggleData) {
      case 0:
        dispatch(setDataFiltered(startingData.filter((element) => element.availability.stock === 0
                                 && element.name.toLowerCase().includes(event.target.value.toLowerCase()))))
        break;
      case 1:
        dispatch(setDataFiltered(startingData.filter((element) => element.availability.stock > 0 
                                 && element.name.toLowerCase().includes(event.target.value.toLowerCase()))))
        break;
      default:
        dispatch(setDataFiltered(startingData.filter((element) => element.name.toLowerCase().includes(event.target.value.toLowerCase()))))
    }
  }

  // Funzione per resettare i valori nell'input di filtraggio e mostrare tutti i prodotti
  const resetSearch = () => {
    dispatch(setToggleData(null));
    dispatch(setClassToggleLeft(''));
    dispatch(setClassToggleRight(''));
    dispatch(setValueInput(''));
    dispatch(setDataFiltered(startingData));
  }

  // Funzione per filtrare i prodotti in base alla loro quantità in stock
  const checkIfInStock = (value: CheckingStock | null) => {
    if (toggleData === value) {
      dispatch(setDataFiltered(startingData));
      dispatch(setToggleData(null));
      dispatch(setClassToggleLeft(''));
      dispatch(setClassToggleRight(''));

    } else {

      if (value === 1) {
        dispatch(setDataFiltered(startingData.filter(element => element.availability.stock > 0)));
        dispatch(setToggleData(1));
        dispatch(setClassToggleLeft('toggleLabel'))
        dispatch(setClassToggleRight(''))

      } else if (value === 0) {
        dispatch(setDataFiltered(startingData.filter(element => element.availability.stock === 0)));
        dispatch(setToggleData(0));
        dispatch(setClassToggleRight('toggleLabel'))
        dispatch(setClassToggleLeft(''))
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
