import { createSlice } from "@reduxjs/toolkit";
import { smartBasket } from "./AllData/smartBasket";
import { bestSeller } from "./AllData/bestSellers";
import { vegetables } from "./AllData/vegetables";
import { useDispatch } from "react-redux";
import { ref,onValue } from "firebase/database";
import { db } from "./firebase";

const slice=createSlice({
    name:'products', 
    initialState:{
        vegetables:smartBasket,
        bestSellers:bestSeller,
        friutsAndVegetables:vegetables,
        addToCart:[],
        loginAuthendication:false,
        users:[]
    },
    reducers:{
        users:(state,action)=>{
            state.users=action.payload;
        },
        login:(state,action)=>{
            state.loginAuthendication=action.payload;
        },
        updatePrice:(state,action)=>{
            state[action.payload.key][action.payload.index].weight=state[action.payload.key][action.payload.index].weightPakages[action.payload.indexNo]
            state[action.payload.key][action.payload.index].price=state[action.payload.key][action.payload.index].rate[action.payload.indexNo]
            state[action.payload.key][action.payload.index].discountedPrice=state[action.payload.key][action.payload.index].dicountedRate[action.payload.indexNo]
            state[action.payload.key][action.payload.index].addTocardAuthendication=action.payload.authendication;
        },
        addToCart:(state,action)=>{ 
            state.addToCart.push(action.payload.object);
            state[action.payload.key][action.payload.index].addTocardAuthendication=true;
            state[action.payload.key][action.payload.index].quantity=1;
        },
        updateQuantity:(state,action)=>{
            state.addToCart[action.payload.index].quantity=action.payload.updatedValue;
            state[action.payload.key][action.payload.mainIndex].quantity=action.payload.updatedValue;
        },
        updateQuantityValue:(state,action)=>{
            state[action.payload.key][action.payload.index].quantity=state.addToCart[action.payload.quantityIndex].quantity
        },
        remove:(state,action)=>{
            var removedBasket=state.addToCart.filter((value,index)=>index!==action.payload.index)
            state.addToCart=removedBasket;
            state[action.payload.key][action.payload.mainIndex].addTocardAuthendication=action.payload.authendication;
        }
    }
})


export const { updatePrice,addToCart,updateQuantity,updateQuantityValue,remove,login,users }=slice.actions;
export default slice.reducer;