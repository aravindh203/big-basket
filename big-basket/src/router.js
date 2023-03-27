import React from "react";
import Header from "./Hedaer/header";
import Footer from "./Footer/footer";
import Home from "./Home/home";
import Basket from "./basket/basket";
import Products from "./Products/products";
import Details from "./Details/details";
import AllProducts from "./AllProducts/allproducts";
import { BrowserRouter,Routes,Route,Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { stores } from "./store";

const Redux = () =>{
    return(
        <>
           <Provider store={stores}>
                <Routing/>
           </Provider> 
        </>
    );
}

const Main = () =>{
    return(
        <>
            <Home/>
            <Basket/>
            <Products/>
        </>
    );
}

const Routing = () =>{
    return(
        <>
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route path='/' element={<Main/>} />
                    <Route path='/details/:key/:index' element={<Details/>} />
                    <Route path='/allProducts/:key' element={<AllProducts/>} />
                    <Route path='*' element={<Navigate to={'/'} />}/>
                </Routes>
                <Footer/>
            </BrowserRouter>
        </>
    );
}

export default Redux;

