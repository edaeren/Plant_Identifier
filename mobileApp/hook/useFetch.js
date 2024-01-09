import {View,Text} from 'react-native'
import {useState,useEffect} from 'react'
import axios from 'axios';
import getIp from './getIp';
const useFetch =()=>{

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null)

    const fetchData = async () =>{
        setIsLoading(true)
        try {
            const response = await axios.get(getIp().ip +'products/')
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