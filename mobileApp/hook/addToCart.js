import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const AddToCart = async(productId,quantity) => {
    try {
        const token  =  await AsyncStorage.getItem('token');
        const endpoint ='http://10.7.86.217:3000/api/cart';

        console.log("Buraya gelen token :"+token);
        
        const data ={
            cartItem : productId,
            quantity : quantity
        }

        const headers = {
            'Content-Type' : 'application/json',
            'token' : 'Bearer '+JSON.parse(token)
        };
        console.log("gönderilern bilgiler: " + data.cartItem + " quantity: "+data.quantity + " headers : " + {headers})
        await axios.post(endpoint,data,{headers})
    } catch (error) {
        throw new Error(error.message)
    }
};

export default AddToCart;