import '../style/App.css';
import React, { useEffect, useState } from 'react';
import CheckStock from './CheckStock';
import FilterSearch from './FilterSearch';
import ListItem from './ListItem';
import { UserContext } from '../App';
import { Product } from '../model/Product';
import { CheckingStock, SetClassToggle } from '../model/model';

const Home: React.FC = () => {

  const startingArray = React.useContext<Product[]>(UserContext);

  const [objData, setObjData] = useState([] as Product[]);
  const [valueInput, setValueInput] = useState<string | undefined>();
  const [toggleData, setToggleData] = useState<CheckingStock | null>(null);
  const [classToggleLeft, setClassToggleLeft] = useState<SetClassToggle>('');
  const [classToggleRight, setClassToggleRight] = useState<SetClassToggle>('');

  useEffect(() => {
    setObjData(startingArray)
  }, [startingArray]);

  // Funzione per filtrare i prodotti da mostrare in base all'input dell'utente
  const filterProducts = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

    setValueInput(event.target.value);

    switch (toggleData) {
      case 0:
        setObjData(startingArray.filter((element) => element.availability.stock === 0
                                        && element.name.toLowerCase().includes(event.target.value.toLowerCase())));
        break;
      case 1:
        setObjData(startingArray.filter((element) => element.availability.stock > 0 
                                        && element.name.toLowerCase().includes(event.target.value.toLowerCase())))
        break;
      default:
        setObjData(startingArray.filter((element) => element.name.toLowerCase().includes(event.target.value.toLowerCase())));
    }
  }

  // Funzione per resettare i valori nell'input di filtraggio e mostrare tutti i prodotti
  const resetSearch = () => {
    setToggleData(null);
    setClassToggleLeft('');
    setClassToggleRight('');
    setValueInput('');
    setObjData(startingArray);
  }

  // Funzione per filtrare i prodotti in base alla loro quantit?? in stock
  const checkIfInStock = (value: CheckingStock | null) => {
    if (toggleData === value) {
      setObjData(startingArray);
      setToggleData(null);
      setClassToggleLeft('');
      setClassToggleRight('');

    } else {

      if (value === 1) {
        setObjData(startingArray.filter(element => element.availability.stock > 0));
        setToggleData(1);
        setClassToggleLeft('toggleLabel')
        setClassToggleRight('')

      } else if (value === 0) {
        setObjData(startingArray.filter(element => element.availability.stock === 0));
        setToggleData(0);
        setClassToggleRight('toggleLabel')
        setClassToggleLeft('')
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
        {objData.length === 0 ? <h1>No products found</h1> :
          <ul>
            {objData.map((element) => {
              return <ListItem key={element.UPC} element={element} />
            })}
          </ul>
        }
      </main>

    </div>
  )
}

export default Home;
