import AsyncStorage from "@react-native-async-storage/async-storage";
import {useState,useEffect} from "react";
import axios from "axios";

const fetchCart = async ()=> {
    const [data,setData] = useState([]);
    const [loading,setLoader] = useState(false);
    const [error,setError] = useState(null);

    const fetchData = async() =>{
        setLoader(true);
        const token = await AsyncStorage.getItem('token').toString();

        try {
            const endpoint ='http://10.7.86.217:3000/api/cart/find';

            const headers = {
                'Content-Type' : 'application/json',
                'token' : 'Bearer '+JSON.parse(token)
            };

            const response = await axios.get(endpoint,{headers});
            //yorum
            //const newData = JSON.stringify(response.data);
            //const parsedData = JSON.parse(newData);

            const cartProducts = response.data[0].products;
            //await AsyncStorage.setItem('cartCount',JSON.stringify(products.length));
            setData(cartProducts);

            setLoader(false)
        } catch (error) {
            setError(error)
        }
        finally{
            setLoader(false);
        }
    }

    useEffect(()=> {
        fetchData();
    }, []);

    const refetch = () => {
        setLoader(true);
        fetchData();
    }

    return {data,loading,error,refetch}
};

export default fetchCart;