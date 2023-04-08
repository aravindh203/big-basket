import React from "react";
import Header from "./Hedaer/header";
import Footer from "./Footer/footer";
import Home from "./Home/home";
import Basket from "./basket/basket";
import Products from "./Products/products";
import Details from "./Details/details";
import AllProducts from "./AllProducts/allproducts";
import Login from "./Login/login";
import SignUp from "./signUp/signup";
import { BrowserRouter,Routes,Route,Navigate } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
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

    const state=useSelector(({products})=>products);

    return(
        <>
            <BrowserRouter>
                {state.loginAuthendication ?

                <>
                    <Header/>
                    <Routes>
                        <Route path='/' element={<Main/>} />
                        <Route path='/details/:key/:index' element={<Details/>} />
                        <Route path='/allProducts/:key' element={<AllProducts/>} />
                        <Route path='*' element={<Navigate to={'/'} />}/>
                    </Routes>
                    <Footer/>
                </>
                :
                <>
                    <Routes>
                        <Route path="*" element={<Login/>}/>
                        <Route path="/signup" element={<SignUp/>}/>
                        <Route path='*' element={<Navigate to={'/'} />}/>
                    </Routes>
                </>

                }
            </BrowserRouter>
        </>
    );
}

export default Redux;

