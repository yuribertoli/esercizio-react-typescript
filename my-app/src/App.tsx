import { Outlet } from "react-router-dom";
import React from 'react';
import Footer from './components/Footer';
import { useEffect, useState } from "react";
import Loading from "./components/redirect/Loading";
import { Product } from "./model/Product";

export const UserContext = React.createContext([] as Product[]);

const App = () => {

    const [startingArray, setStartingArray] = useState<Product[]>([]);
    const [isLoading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetch('https://assets.fc-dev.instore.oakley.com/assets/products/products.json')
            .then((response) => {
                if (response.ok) {
                    return response.json()
                }
                //throw new Error('Something went wrong');
                return Promise.reject(response); //reject instead of throw Error
            })
            .then(json => {
                setStartingArray(json)
                setLoading(false)
            })
            .catch((error) => {
                console.log(error)
            });
    }, [])

    if (isLoading) {
        return <Loading />
    }

    return (
        <div id="container">

            <UserContext.Provider value={startingArray}>
                <Outlet />
            </UserContext.Provider>

            <footer>
                <Footer />
            </footer>

        </div>
    )
};

export default App;