import { Outlet } from "react-router-dom";
import Footer from './components/Footer';
import { useEffect } from "react";
import Loading from "./components/redirect/Loading";
//redux:
import type { RootState } from './redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { dataAction } from './redux/createSlice';

const App = () => {

    const {isLoading} = useSelector((state: RootState) => state.data)
    const dispatch = useDispatch()

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
                dispatch(dataAction.setStartingData(json))
                dispatch(dataAction.setLoading(false))
            })
            .catch((error) => {
                console.log(error)
            });
            // eslint-disable-next-line
    }, [])

    if (isLoading) {
        return <Loading />
    }

    return (
        <div id="container">

            <Outlet />

            <footer>
                <Footer />
            </footer>

        </div>
    )
};

export default App;