import React, { useEffect, useState } from "react";
import './header.scss'
import { useSelector,useDispatch } from "react-redux";
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { updateQuantity,remove } from "../slice";

const Header = () =>{

    const state = useSelector(({ products }) => products);
    const dispatch=useDispatch()

    const [totalPrice,updateTotalPrice]=useState(0)

    useEffect(()=>{
        if(state.addToCart.length){
            const total=state.addToCart.reduce((total,value)=>{
                total+=value.quantity*value.discountedPrice
        
                return total;
            },0)
            updateTotalPrice(total)
        }
    },[state.addToCart])

    const [basketAuthendication,changeBasketAuthendication]=useState(false)

    const updateValues = (event,weight,id,key) =>{
    
        var index=state.addToCart.findIndex(value=>value.weight===weight)
        var mainIndex=state[key].findIndex(value=>value.id===id);
        
        var updatedValue;
        if(event.target.innerText==='+'){
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


      const removeProduct = (weight,id,key) =>{

        var index=state.addToCart.findIndex(value=>value.weight===weight);
        var mainIndex=state[key].findIndex(value=>value.id===id)
        var newWeight=state[key][mainIndex].weight;

        var authendication=state[key][mainIndex].addTocardAuthendication;
        if(weight===newWeight){
            authendication=false;
        }

        dispatch(remove({index,id,key,mainIndex,authendication}))
      }

    return(
        <>
           <div className="header-container">
                <div className="header">
                    <div className="header-image">   
                        <img src={require('../Asserts/images/bb_logo.png')} alt='ni image'/>
                    </div>
                    <div className="header-content">
                        <div className="header-contact">
                            <div className="header-contact-content">
                                <div className="heaer-contact-icon">
                                    <i className="bi bi-telephone"></i>
                                    <span>1860 123 1000</span>
                                </div>
                                <div className="heaer-contact-icon">
                                    <i className="bi bi-geo-alt"></i>
                                    <span>560004,Bangalore</span>
                                </div>
                                <div className="heaer-contact-icon">
                                    <i className="fa fa-user"></i>
                                    <span>Login/Sign Up</span>
                                </div>
                            </div>
                        </div>
                        <div className="header-search">
                            <div className="header-input">
                                <input type={'text'} placeholder={'Serach for Products...'}/>
                                <button><i className="fa fa-search"></i></button>
                            </div>
                        </div>
                        <div className="header-buy" onMouseOver={()=>changeBasketAuthendication(true)} onMouseLeave={()=>changeBasketAuthendication(false)}>
                            <div>
                                <i className="fa fa-basket-shopping"></i>
                            </div>
                            <div className="header-icon-content">
                                <p>my Basket</p>
                                <p>{state.addToCart.length} items</p>
                            </div>
                            {
                                basketAuthendication ? 

                                    (
                                    <div className="basket" onMouseOver={()=>changeBasketAuthendication(true)} onMouseLeave={()=>changeBasketAuthendication(false)}>
                                        {
                                            state.addToCart.length ? (
                                                <>
                                                    <div className="basket-content">
                                                        {
                                                            state.addToCart.map((value,index)=>{
                                                                return(
                                                                    <div className="basket-items" key={index}>
                                                                        <div className="basket-item">
                                                                            <div className="basket-image">
                                                                                <img src={value.imageUrl} alt={value.productName}/>
                                                                            </div>
                                                                            <div className="basket-item-info">
                                                                                <h6>{value.brandName}</h6>
                                                                                <p>{value.weight}</p>
                                                                                <span>{value.quantity} x {value.discountedPrice}</span>
                                                                            </div>
                                                                            <div className="basket-content-info">
                                                                                <div className="basket-item-count">
                                                                                    <div className="basket-item-button" onClick={(event)=>updateValues(event,value.weight,value.id,value.category)}>-</div>
                                                                                    <div>
                                                                                        <p>{value.quantity}</p>
                                                                                    </div>
                                                                                    <div className="basket-item-button" onClick={(event)=>updateValues(event,value.weight,value.id,value.category)}>+</div>
                                                                                </div>
                                                                                <div className="baske-rate">
                                                                                    <p>Rs {value.quantity*value.discountedPrice}</p>
                                                                                    <span>saved Rs.{((value.quantity*value.price)-(value.quantity*value.discountedPrice)).toFixed(2)}</span>
                                                                                </div>
                                                                                <div className="basket-remove">
                                                                                    <p onClick={()=>removeProduct(value.weight,value.id,value.category)}>x</p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                    <div className="basket-bill">
                                                        <div className="basket-bill-left">
                                                            <p>**Actual Delivery Charges computed at checkout <i className="fa fa-question-circle"></i></p>
                                                        </div>
                                                        <div className="basket-bill-right">
                                                            <div className="basket-bill-content">
                                                                <div>
                                                                    <p>Sub Total:</p>
                                                                    <p>Rs {totalPrice}</p>
                                                                </div>
                                                                <div>
                                                                    <p>Delivery Charge:</p>
                                                                    <p>**</p>
                                                                </div>
                                                            </div>
                                                            <div className="basket-bill-button">
                                                                <button>view Basket & Checkout</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            ):<div className="no-products">Your basket is empty. Start shopping now!</div>
                                        }
                                    </div>
                                    )
                                    :null
                            }
                        </div>
                        
                    </div>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-dropdwon">
                        <p>SHOP BY CATEGORY</p>
                    </div>
                    <div className="header-bottom-offer">
                        <LocalOfferIcon/><p>OFFERS</p>
                    </div>
                </div>
           </div>                 
        </>
    );
}

export default Header;

