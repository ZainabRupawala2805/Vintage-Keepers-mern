import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios'
import ReactLoading from 'react-loading';
import Item from '../components/Item/Item';
import { BACKEND_URL } from '../config';

const ProductView = (props) => {
    const param = useParams()
    const [ item, setItem ] = useState()
    const [ loading, setLoading ] = useState(true)

    console.log(param, "url data for api")

    useEffect(() => {
        window.scrollTo(0, 0)
        axios.get(`${BACKEND_URL}/items/itemsbyid?id=${param.id}&category=${param.category}`)
            .then(res => {
                setItem(res.data.data)
                setLoading(false)
            })
            .catch(err => console.log(err))

    }, [param.id])// param.category
    
    return (
            <div className="d-flex min-vh-100 w-100 justify-content-center align-items-center m-auto">
                {loading && <ReactLoading type="balls" color='#FFE26E' height={100} width={100} className='m-auto'/>}
                {item && <Item item={item}/>}
            </div>
     );
}
 
export default ProductView;