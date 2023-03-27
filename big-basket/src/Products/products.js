import React from "react";
import { useNavigate } from "react-router-dom";
import './products.scss'



const Products = () =>{

    const fruitsAndVegetables=['//www.bigbasket.com/media/customPage/77880b23-0233-4fad-b54a-a93c998e0d20/eed60a97-9621-4c4e-8f87-6053da9b7a72/bca76c6f-6791-4257-a49f-50a99f7a08ac/hp_organic-fnc-fnv_Storefront_m_250223_01.jpg','//www.bigbasket.com/media/customPage/77880b23-0233-4fad-b54a-a93c998e0d20/eed60a97-9621-4c4e-8f87-6053da9b7a72/bca76c6f-6791-4257-a49f-50a99f7a08ac/hp_fresh-fruits-fnv_Storefront_m_250223_02.jpg','//www.bigbasket.com/media/customPage/77880b23-0233-4fad-b54a-a93c998e0d20/eed60a97-9621-4c4e-8f87-6053da9b7a72/bca76c6f-6791-4257-a49f-50a99f7a08ac/hp_fresh-vegetables-fnv_Storefront_m_250223_03.jpg','//www.bigbasket.com/media/customPage/77880b23-0233-4fad-b54a-a93c998e0d20/eed60a97-9621-4c4e-8f87-6053da9b7a72/bca76c6f-6791-4257-a49f-50a99f7a08ac/hp_cuts-sprouts-fnv_Storefront_m_250223_04.jpg','//www.bigbasket.com/media/customPage/77880b23-0233-4fad-b54a-a93c998e0d20/eed60a97-9621-4c4e-8f87-6053da9b7a72/bca76c6f-6791-4257-a49f-50a99f7a08ac/hp_exotic-fruits-fnv_Storefront_m_250223_05.jpg','//www.bigbasket.com/media/customPage/77880b23-0233-4fad-b54a-a93c998e0d20/eed60a97-9621-4c4e-8f87-6053da9b7a72/bca76c6f-6791-4257-a49f-50a99f7a08ac/hp_herbs-seasonings-fnv_Storefront_m_250223_06.jpg']
    const beverages=['//www.bigbasket.com/media/customPage/77880b23-0233-4fad-b54a-a93c998e0d20/eed60a97-9621-4c4e-8f87-6053da9b7a72/5c0f594f-6679-4ed9-b160-8075f76b543d/hp_bev-health-deink_m_250223_01.jpg','//www.bigbasket.com/media/customPage/77880b23-0233-4fad-b54a-a93c998e0d20/eed60a97-9621-4c4e-8f87-6053da9b7a72/5c0f594f-6679-4ed9-b160-8075f76b543d/hp_beverages-tea-coffee_m_250223_02.jpg','//www.bigbasket.com/media/customPage/77880b23-0233-4fad-b54a-a93c998e0d20/eed60a97-9621-4c4e-8f87-6053da9b7a72/5c0f594f-6679-4ed9-b160-8075f76b543d/hp_bev-flavoured-milk_m_250223_03.jpg','//www.bigbasket.com/media/customPage/77880b23-0233-4fad-b54a-a93c998e0d20/eed60a97-9621-4c4e-8f87-6053da9b7a72/5c0f594f-6679-4ed9-b160-8075f76b543d/hp_bevfrulty-indulg_m_250223_04.jpg','//www.bigbasket.com/media/customPage/77880b23-0233-4fad-b54a-a93c998e0d20/eed60a97-9621-4c4e-8f87-6053da9b7a72/5c0f594f-6679-4ed9-b160-8075f76b543d/hp_bev-power-boosters_m_250223_05.jpg','//www.bigbasket.com/media/customPage/77880b23-0233-4fad-b54a-a93c998e0d20/eed60a97-9621-4c4e-8f87-6053da9b7a72/5c0f594f-6679-4ed9-b160-8075f76b543d/hp_bevecrick-it_m_250223_06.jpg']
    const snackStore=['//www.bigbasket.com/media/customPage/77880b23-0233-4fad-b54a-a93c998e0d20/eed60a97-9621-4c4e-8f87-6053da9b7a72/c7d608b9-2034-4972-9c4b-51f43a6c859e/hp_Daily-chai-time_m_480_250223_01.jpg','//www.bigbasket.com/media/customPage/77880b23-0233-4fad-b54a-a93c998e0d20/eed60a97-9621-4c4e-8f87-6053da9b7a72/c7d608b9-2034-4972-9c4b-51f43a6c859e/hp_Daily-morning-starters_m_480_250223_02.jpg','//www.bigbasket.com/media/customPage/77880b23-0233-4fad-b54a-a93c998e0d20/eed60a97-9621-4c4e-8f87-6053da9b7a72/c7d608b9-2034-4972-9c4b-51f43a6c859e/hp_Daily-satisfy-your-hubg_m_480_250223_03.jpg','//www.bigbasket.com/media/customPage/77880b23-0233-4fad-b54a-a93c998e0d20/eed60a97-9621-4c4e-8f87-6053da9b7a72/c7d608b9-2034-4972-9c4b-51f43a6c859e/hp_Daily-sweet-craving_m_480_250223_04.jpg']
    
    const navigate=useNavigate()


    const goToAllProducts = (key) =>{
        navigate('/allProducts/'+key)
    }


    return(
        <>
            <div className="product-container">
                <div className="fruits-and-vegetables">
                    <div className='heading'>
                        <h2>My Smart Basket</h2>
                    </div>
                    <div onClick={()=>goToAllProducts('vegetables')} className="product-card">

                        {
                            fruitsAndVegetables.map((value,index)=>{
                                return(
                                    <div className="product-cards" key={index}>
                                        <div className="product-card">
                                            <button className="product-button">
                                                <div className="product-image">
                                                    <img src={value}/>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                );
                            })
                        }

                    </div>
                </div>
                <div className="beverages">
                    <div className='heading'>
                        <h2>Beverages</h2>
                    </div>
                    <div className="product-card" onClick={()=>goToAllProducts('vegetables')}>

                        {
                            beverages.map((value,index)=>{
                                return(
                                    <div className="product-cards" key={index}>
                                        <div className="product-card">
                                            <button className="product-button">
                                                <div className="product-image">
                                                    <img src={value}/>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                );
                            })
                        }

                    </div>
                </div>
                <div className="snack-store">
                    <div className='heading'>
                        <h2>Snack Store</h2>
                    </div>
                    <div className="product-card" onClick={()=>goToAllProducts('vegetables')}>

                        {
                            snackStore.map((value,index)=>{
                                return(
                                    <div className="product-cards" key={index}>
                                        <div className="product-card">
                                            <button className="product-button">
                                                <div className="product-image">
                                                    <img src={value}/>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                );
                            })
                        }

                    </div>
                </div>




            </div>
        </>
    );
}

export default Products;