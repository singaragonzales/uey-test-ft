import React, { useState, useEffect }  from 'react'
import "./index.scss";
import 'primeicons/primeicons.css';

interface CardProps {
    setVisible(closeCard: boolean): void;
    setData(data: any): void;
    productData:any;
    typeCard:any;
}
const Card: React.FunctionComponent<CardProps> = ({
	setVisible,
    setData,
    productData,
    typeCard
}: CardProps) => {

  return (
    <>
        {productData.map(((prod: any) => (
            <div className="uey_card-container">
                <div className="uey_card-container--body">
                    <div className="uey_card_container--image">
                        <img src={prod.image[0] || ""} alt="" />
                        <div className="uey_card_container--icon" 
                            onClick={() => {
                                setData(prod); 
                                setVisible(true)
                            }}
                        >
                            <span className="pi pi-search"></span>
                        </div>
                    </div>
                    <div className="uey_card-container--product">
                        <span className="product--name">{prod.name}</span>
                        <span className="product--price">${Number.parseFloat(prod.price)}</span>
                        {typeCard !== "sell_pr" && (
                            <span className="product--address">742 Evergreen Terrace</span>
                        )}
                    </div>
                    <div className="uey_card-container--seller">
                        <div className="seller--title">Vendedor</div>
                        <div className="seller--info">
                            <img src={prod.seller.image} alt="" />
                            <div className='seller--info-data'>
                                <span className="seller--name">{prod.seller.name}</span>
                                <span className="seller--phone">{prod.seller.phone}</span>
                            </div>
                        </div>
                    </div>
                    <div className="uey_card-container--buy">
                        <button>Añadir al Carrito</button>
                    </div>
                </div>
            </div>
        )))}
    </>
    
  )
}

export default Card;