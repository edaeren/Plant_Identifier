import {View,Text} from 'react-native'
import {useState,useEffect} from 'react'
import axios from 'axios';

const useFetch =()=>{

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null)

    const fetchData = async () =>{
        setIsLoading(true)
        try {
            //const response = await axios.get('http://172.16.0.109:3000/api/products/')
            const response = await axios.get('http://10.7.86.217:3000/api/products/')
            setData(response.data)
            setIsLoading(false)

        } catch (error) {
            setError(error)
        }
        finally{
            setIsLoading(false)
        }
    }

    useEffect(()=> {
        fetchData();
    },[]);

    const refecth = () => {
        setIsLoading(true);
        fetchData();
    }

    return{data,isLoading,error,refecth}
}


export default useFetch