import { useParams, Link } from "react-router-dom";
import React from 'react';
import { UserContext } from "../App";
import Loading from './Loading';

const ProductDetails = () => {

    const { idCode } = useParams<{idCode: string}>();

    if(!idCode){
        throw new Error('missing id code')
    }

    const startingArray = React.useContext(UserContext);

    let objectFiltered = startingArray.find(product => parseInt(product['UPC']) === parseInt(idCode)) //con ! significa dichiarare che il valore non può essere null o undefined

    if(objectFiltered === null){
        return <Loading/>
    }

    if(objectFiltered === undefined){
        return <h1>No elements to display</h1>
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
                            <li className='element-name'>{objectFiltered['name']}</li>
                            <li className='element-price'>$ {objectFiltered['price']['current']['value']}</li>
                            {objectFiltered['availability']['stock'] > 0 ? <li className='element-stock'><span>in stock</span></li> : <li className='d-none'></li>}
                        </ul>
                    </div>
                </div>

            </div>

            <Link to={`/`}>Back to Home Page</Link>
        </>
    )
}

export default ProductDetails;