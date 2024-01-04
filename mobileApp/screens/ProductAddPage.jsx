import styles from "./login.style";
import { View,Text,TextInput, ScrollView, SafeAreaView,Image,Alert } from "react-native";
import React,{useState} from "react";
import axios from "axios";
import * as Yup from 'yup';
import { BackBtn,Button } from "../components";
import { Formik } from "formik";
import { COLORS } from "../constants";
import {MaterialCommunityIcons,Ionicons} from "@expo/vector-icons";

const validationSchema= Yup.object().shape({
    title: Yup.string()
        .min(3,"Provide a valid title.")
        .required("Required"),
    supplier: Yup.string()
        .min(3,"Provide a valid supplier.")
        .required("Required"),
    price: Yup.string()
        .min(3,"Provide a valid price.")
        .required("Required"),
    imageUrl: Yup.string()
        .min(3,"Provide a valid imageUrl.")
        .required("Required"),
    description: Yup.string()
        .min(3,"Provide a valid description.")
        .required("Required"),
    product_location: Yup.string()
        .min(3,"Provide a valid location.")
        .required("Required"),
  });


const ProductAddPage= ({navigation}) => {

    const [loader,setLoader]=useState(false);

    const addPro = async(values)=>{
        setLoader(true);
        try {
            const endpoint='http://10.7.86.217:3000/api/products';
            const data=values;

            const response =await axios.post(endpoint,data);
            if(response.status === 201){
                navigation.replace('Login')
            }
        }catch (error) {
            console.log(error)
        }
    };

    const inValidForm=()=>{
        Alert.alert(
            "Invalid Form",
            "Please provide all required fields",
            [
                {
                    text:"Cancel", onPress:()=>console.log(""),
                },
                {
                    text:"Continue", onPress:()=>console.log(""),
                },
                {defaultIndex: 1}

            ]
        )
    };

    
    return(
        <ScrollView>
            <SafeAreaView style ={{marginHorizontal:20}}>
                <View>
                    <BackBtn onPress={()=> navigation.goBack()}/>
                    <Image
                        source={require('../assets/images/bk.png')}
                        style={styles.cover}
                    />
                    <Text style={styles.title}>Adding Product</Text>
                        <Formik
                        initialValues={{title:"",supplier:"",price:"",imageUrl:"",description:"",product_location:""}}
                        validationSchema={validationSchema}
                        onSubmit={values=> addPro(values)}
                        >
                            {({handleChange,handleBlur,touched,handleSubmit,values,errors,isValid,setFieldTouched})=>(
                                <View>
                                    <View style ={styles.wrapper}>
                                        <Text style={styles.label}>Title</Text>
                                        <View style={styles.inputWrapper(touched.title ? COLORS.secondary: COLORS.offwhite)}>
                                        <MaterialCommunityIcons
                                            name='face-man-profile'
                                            size={20}
                                            color={COLORS.gray}
                                            style={styles.iconStyle}
                                        />
                                        <TextInput
                                            placeholder="Title"
                                            onFocus={()=> {setFieldTouched('title')}}
                                            onBlur={()=> {setFieldTouched('title','')}}
                                            value={values.title}
                                            onChangeText={handleChange('title')}
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                            style={{flex:1}}
                                        />
                                        </View>
                                        {touched.title && errors.title&&(
                                            <Text style={styles.errorMessage}>{errors.title}</Text>
                                        )}
                                    </View>
                                    
                                    <View style ={styles.wrapper}>
                                        <Text style={styles.label}>Supplier</Text>
                                        <View style={styles.inputWrapper(touched.supplier ? COLORS.secondary: COLORS.offwhite)}>
                                        <MaterialCommunityIcons
                                            name='face-man-profile'
                                            size={20}
                                            color={COLORS.gray}
                                            style={styles.iconStyle}
                                        />
                                        <TextInput
                                            placeholder="Supplier"
                                            onFocus={()=> {setFieldTouched('supplier')}}
                                            onBlur={()=> {setFieldTouched('supplier','')}}
                                            value={values.supplier}
                                            onChangeText={handleChange('supplier')}
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                            style={{flex:1}}
                                        />
                                        </View>
                                        {touched.supplier && errors.supplier&&(
                                            <Text style={styles.errorMessage}>{errors.supplier}</Text>
                                        )}
                                    </View>
                                    
                                    <View style ={styles.wrapper}>
                                        <Text style={styles.label}>Price</Text>
                                        <View style={styles.inputWrapper(touched.price ? COLORS.secondary: COLORS.offwhite)}>
                                        <MaterialCommunityIcons
                                            name='face-man-profile'
                                            size={20}
                                            color={COLORS.gray}
                                            style={styles.iconStyle}
                                        />
                                        <TextInput
                                            placeholder="Price"
                                            onFocus={()=> {setFieldTouched('price')}}
                                            onBlur={()=> {setFieldTouched('price','')}}
                                            value={values.price}
                                            onChangeText={handleChange('price')}
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                            style={{flex:1}}
                                        />
                                        </View>
                                        {touched.price && errors.price&&(
                                            <Text style={styles.errorMessage}>{errors.price}</Text>
                                        )}
                                    </View>

                                    <View style ={styles.wrapper}>
                                        <Text style={styles.label}>Image Url</Text>
                                        <View style={styles.inputWrapper(touched.imageUrl ? COLORS.secondary: COLORS.offwhite)}>
                                        <MaterialCommunityIcons
                                            name='face-man-profile'
                                            size={20}
                                            color={COLORS.gray}
                                            style={styles.iconStyle}
                                        />
                                        <TextInput
                                            placeholder="ImageUrl"
                                            onFocus={()=> {setFieldTouched('imageUrl')}}
                                            onBlur={()=> {setFieldTouched('imageUrl','')}}
                                            value={values.imageUrl}
                                            onChangeText={handleChange('imageUrl')}
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                            style={{flex:1}}
                                        />
                                        </View>
                                        {touched.imageUrl && errors.imageUrl&&(
                                            <Text style={styles.errorMessage}>{errors.imageUrl}</Text>
                                        )}
                                    </View>

                                    <View style ={styles.wrapper}>
                                        <Text style={styles.label}>Description</Text>
                                        <View style={styles.inputWrapper(touched.description ? COLORS.secondary: COLORS.offwhite)}>
                                        <MaterialCommunityIcons
                                            name='face-man-profile'
                                            size={20}
                                            color={COLORS.gray}
                                            style={styles.iconStyle}
                                        />
                                        <TextInput
                                            placeholder="Description"
                                            onFocus={()=> {setFieldTouched('description')}}
                                            onBlur={()=> {setFieldTouched('description','')}}
                                            value={values.description}
                                            onChangeText={handleChange('description')}
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                            style={{flex:1}}
                                        />
                                        </View>
                                        {touched.description && errors.description&&(
                                            <Text style={styles.errorMessage}>{errors.description}</Text>
                                        )}
                                    </View>

                                    <View style ={styles.wrapper}>
                                        <Text style={styles.label}>Location</Text>
                                        <View style={styles.inputWrapper(touched.product_location ? COLORS.secondary: COLORS.offwhite)}>
                                        <Ionicons
                                            name='location-outline'
                                            size={20}
                                            color={COLORS.gray}
                                            style={styles.iconStyle}
                                        />
                                        <TextInput
                                            placeholder="Product_location"
                                            onFocus={()=> {setFieldTouched('product_location')}}
                                            onBlur={()=> {setFieldTouched('product_location','')}}
                                            value={values.product_location}
                                            onChangeText={handleChange('product_location')}
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                            style={{flex:1}}
                                        />
                                        </View>
                                        {touched.product_location && errors.product_location&&(
                                            <Text style={styles.errorMessage}>{errors.product_location}</Text>
                                        )}
                                    </View>
                                    
                                    <Button title={"ADD PRODUCT"} 
                                        onPress={isValid ? handleSubmit:inValidForm} 
                                        loader={loader}
                                        isValid={isValid}/>

                                </View>
                            )}
                    </Formik>
                </View>
            </SafeAreaView>
        </ScrollView>
    );
};

export default ProductAddPage;