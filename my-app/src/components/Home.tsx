import '../style/App.css';
import React, { useEffect, useState } from 'react';
import CheckStock from './CheckStock';
import FilterSearch from './FilterSearch';
import ListItem from './ListItem';
import { UserContext } from '../App';

function Home() {

  // type Product = {
  //   UPC: string,
  //   name: string,
  //   availability: {stock: number},
  //   price: {
  //     currency: string,
  //     current: {value: number}
  //   },
  //   variants: any[]
  // }

  const startingArray = React.useContext(UserContext);

  const [objData, setObjData] = useState([] as any[]);
  const [valueInput, setValueInput] = useState<string | undefined>();
  const [toggleData, setToggleData] = useState<number | null>(null);
  const [classToggleLeft, setClassToggleLeft] = useState('');
  const [classToggleRight, setClassToggleRight] = useState('');

  useEffect(() => {
    setObjData(startingArray)
  }, [startingArray]);

  // Funzione per filtrare i prodotti da mostrare in base all'input dell'utente
  const filterProducts = (event: any) => {

    setValueInput(event['target']['value']);

    switch (toggleData) {
      case 0:
        setObjData(startingArray.filter((element: any) => element['availability']['stock'] === 0
                                        && element['name'].toLowerCase().includes(event['target']['value'].toLowerCase())));
        break;
      case 1:
        setObjData(startingArray.filter((element: any) => element['availability']['stock'] > 0 
                                        && element['name'].toLowerCase().includes(event['target']['value'].toLowerCase())))
        break;
      default:
        setObjData(startingArray.filter((element: any) => element['name'].toLowerCase().includes(event['target']['value'].toLowerCase())));
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

  // Funzione per filtrare i prodotti in base alla loro quantità in stock
  const checkIfInStock = (value: number | null) => {
    if (toggleData === value) {
      setObjData(startingArray);
      setToggleData(null);
      setClassToggleLeft('');
      setClassToggleRight('');

    } else {

      if (value === 1) {
        setObjData(startingArray.filter(element => element['availability']['stock'] > 0));
        setToggleData(1);
        setClassToggleLeft('toggleLabel')
        setClassToggleRight('')

      } else if (value === 0) {
        setObjData(startingArray.filter(element => element['availability']['stock'] === 0));
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
              return <ListItem key={element['UPC']} element={element} />
            })}
          </ul>
        }
      </main>

    </div>
  )
}

export default Home;
