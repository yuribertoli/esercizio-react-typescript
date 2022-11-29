import { useParams, Link } from "react-router-dom";
import React from 'react';
import Loading from './redirect/Loading';
import NotFound from "./redirect/NotFound";
import { DataFiltered } from "../model/model";
//redux:
import type { RootState } from '../redux/store'
import { useSelector } from 'react-redux'

const ProductDetails: React.FC = () => {

    const { idCode } = useParams<{idCode: string}>();

    if(!idCode){
        throw new Error('missing id code')
    }

    const {startingData} = useSelector((state: RootState) => state.data)

    let objectFiltered: DataFiltered = startingData.find(product => parseInt(product.UPC) === parseInt(idCode)) //mettendo ! subito dopo idCode significa dichiarare che il valore non può essere null o undefined

    if(objectFiltered === null){
        return <Loading/>
    }

    if(objectFiltered === undefined){
        return <NotFound/>
    }

    return (
        <>
            <div className='listProduct'>

                <div className='containerProduct'>
                    <div className='topCard'>
                        <div className='noImage'>350x350</div>
                        <span>Powered by HTML.COM</span>
                    </div>
                    <div className='bottomCard'>
                        <ul>
                            <li className='element-name'>{objectFiltered.name}</li>
                            <li className='element-price'>$ {objectFiltered.price.current.value}</li>
                            {objectFiltered.availability.stock > 0 ? <li className='element-stock'><span>in stock</span></li> : <li className='d-none'></li>}
                        </ul>
                    </div>
                </div>

            </div>

            <Link to={`/`}>Back to Home Page</Link>
        </>
    )
}

export default ProductDetails;