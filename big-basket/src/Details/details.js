import React, { useEffect, useState } from "react";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updatePrice,addToCart,updateQuantity,updateQuantityValue,remove } from "../slice";
import './details.scss'

const Details = () =>{
    
    const state = useSelector(({ products }) => products);
    const params=useParams();
    const dispatch=useDispatch();
    console.log('Detailsstate', state[params.key][params.index]);
    console.log('detailBasket',state.addToCart);

    const [detail,changeDetail]=useState(state[params.key][params.index])

    useEffect(()=>{
        changeDetail(state[params.key][params.index])
    },[state[params.key],params])

    const addCart = (id,productName,price,discountedPrice,weight,imageUrl,brandName,key) =>{

        var object={id,productName,price,discountedPrice,weight,imageUrl,quantity:1,brandName,category:key}  
        var index=state[key].findIndex(value=>value.id===id)
    
        dispatch(addToCart({object,key,index})) 
    }

    const update = (index,id,key) =>{

        var mainIndex=state[key].findIndex(value=>value.id===id);

        var authendication;
        if(state.addToCart.length){

            var values=state.addToCart.filter(value=>value.id===id);
            var find=values.some(value=>value.weight===detail.weightPakages[index]);
            
            if(find){
                authendication=true

                var quantityIndex=state.addToCart.findIndex(value=>value.weight===detail.weightPakages[index])
                dispatch(updateQuantityValue({index:mainIndex,quantityIndex,key}))
            }
            else authendication=false
        }
        else authendication=false;

        dispatch(updatePrice({index:mainIndex,key,indexNo:index,authendication}))

    }

    const updateValues = (event,weight,id,key) =>{
           
        var index=state.addToCart.findIndex(value=>value.weight===weight)
        var mainIndex=state[key].findIndex(value=>value.id===id);
        
        var updatedValue;
        if(event.target.name==='plus'){
          updatedValue=state.addToCart[index].quantity+1
        }
        else{
          updatedValue=state.addToCart[index].quantity-1
        }
    
        if(updatedValue===0){
          dispatch(remove({index,id,key,mainIndex}))
        }
        else{
          dispatch(updateQuantity({index,key,mainIndex,updatedValue}))
        }  
      }

    return(
        <>
            <div className="details-container">
                <div className="details">
                    <div className="details-image">
                        <img src={detail.imageUrl} alt='no image'/>
                    </div>
                    <div className="details-image-content">
                        <span className="name">{detail.brandName}</span>
                        <h3>{detail.productName}, {detail.weight.slice(0,detail.weight.indexOf('-'))}</h3>
                        <p>MRP:<strike>Rs {detail.price}</strike></p>
                        <h4>Price: Rs {detail.discountedPrice}<span className="price">(Rs.0.06/g)</span></h4>
                        <span className="savings">You Save:{detail.offer}%</span>
                        <p>(Inclusive of all taxes)</p>

                        {detail.addTocardAuthendication ?

                            (
                                <div className="details-btn">
                                    <button onClick={(event)=>updateValues(event,detail.weight,detail.id,detail.category)}>-</button>
                                    <span>{detail.quantity}</span>
                                    <button name='plus' onClick={(event)=>updateValues(event,detail.weight,detail.id,detail.category)}>+</button>
                                </div>
                            )

                            :    
                            
                            (
                                <div className="details-button">
                                <div>
                                    <button className="quantity">1</button>
                                </div>
                                <div>
                                    <button className="add" onClick={()=>addCart(detail.id,detail.productName,detail.price,detail.discountedPrice,detail.weight,detail.imageUrl,detail.brandName,detail.category)}>ADD TO BASKET</button>
                                </div>
                                <div>
                                    <button className="save">SAVE</button>
                                </div>
                            </div>
                            )

                        }
                        <p><LocalShippingIcon/>Standard: 14 Mar, 7:30AM - 10:30AM</p>
                        <h5>Pack Sizes</h5>
                        <div className="details-boxes">
                            {
                                detail.weightPakages.length ?          

                                <>
                                    {
                                        detail.weightPakages.map((value,index)=>{
                                            return(
                                                <div className="details-box" key={index} onClick={(event)=>update(index,detail.id,detail.category)} style={detail.weight===detail.weightPakages[index] ? {background:'#84c22533'}:null}>
                                                    <div className="details-weight">
                                                        <span className="weight">{value.slice(0,detail.weight.indexOf('-'))}</span>
                                                    </div>
                                                    <div className="details-box-content">
                                                        <p className='details-rates'>
                                                            <span className="rate">RS {detail.dicountedRate[index]}</span>
                                                            MRP:<strike className='strike'>Rs {detail.rate[index]}</strike>
                                                            <span className="savings">{detail.offer}% off</span>
                                                        </p>
                                                    </div>
                                                    <div className="details-box-icon" style={detail.weight===detail.weightPakages[index] ? {background:'#9cc63d'}:null}>
                                                        <i className="bi bi-check-lg" style={detail.weight===detail.weightPakages[index] ? {color:'white'}:null}></i>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    }
                                </>
                                :
                                <p>{detail.weight}</p>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Details;