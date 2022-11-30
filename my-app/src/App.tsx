import { Outlet } from "react-router-dom"
import Footer from './components/Footer'
import { useEffect } from "react"
import Loading from "./components/redirect/Loading"
//redux:
import type { RootState } from './redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { dataAction } from './redux/createSlice'

const App = () => {

    const {isLoading} = useSelector((state: RootState) => state.data)
    const dispatch = useDispatch()

    useEffect(() => {
        fetch('https://assets.fc-dev.instore.oakley.com/assets/products/products.json')
            .then((response) => {
                if (response.ok) {
                    return response.json()
                }
                return Promise.reject(response) //reject and return the object response for seeing errors
            })
            .then(json => {
                dispatch(dataAction.setStartingData(json))
                dispatch(dataAction.setDataFiltered(json))
                dispatch(dataAction.setLoading(false))
            })
            .catch((error) => {
                console.log(error)
            })
    }, [dispatch])

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
}

export default App