import { useState, useEffect } from 'react'
import ueyLogo from './assets/logo.jpg'
import ipanIcon from './assets/ipad.png'
import Card from './components/Card/Card'
import MainButton from './components/MainButton/MainButton'
import './App.scss'
import { NO_TYPE_SELECT } from './assets/data'
import Modal from './components/Modal/Modal'
import Filter from './components/Filter/Filter'
import { ApolloClient, InMemoryCache, useQuery } from "@apollo/client";
import { ApolloProvider } from '@apollo/react-hooks';

const client = new ApolloClient({
  uri: import.meta.env.VITE_URL_BK,
  cache: new InMemoryCache(),
  credentials: 'same-origin',
})

function App() {
    const [pageButton, setPageButton] = useState("")
    const [visibleModal, setVisibleModal] = useState(false)
    const [productData, setProductData] = useState([])
    const [productModal, setProductModal] = useState({})
    const [typeCard, setTypeCard] = useState("")

  return (
    <ApolloProvider client={client}>
      <div className="uey_main-page">
        <div className='uey_main-header'>
          <img alt="uey_logo" src={ueyLogo}/>
          <h1 className='uey_main-header-title'>{' '}</h1>
        </div>
        <div className="uey_container">
          <MainButton sendFilterProducts={(data:any, type:string) => {setProductData(data); setPageButton(type)}}/>
          {pageButton === "" ? (
            <div className='uey_container-noselect'>
                <p>{NO_TYPE_SELECT}</p>
                <img src={ipanIcon} alt="no select option" />
            </div>
          ) : (
            <div className='uey_container-products'>
              {pageButton === "Comprar Productos" ? (
                <div className='uey_container-buypr'>
                  <div className="uey_container-buypr-filter">
                      <Filter typeFilter={pageButton} sendFilterProducts={(data: any) => setProductData(data)}/>
                  </div>
                  <div className="uey_container-buypr-data">
                      <Card 
                        setVisible={setVisibleModal}
                        setData={(prod) => setProductModal(prod)}
                        productData={productData}
                        typeCard={pageButton}
                      />
                  </div>
                </div>
              ) : (
                <div className='uey_container-rentpr'>
                    <div className="uey_container-rentpr-filter">
                      <Filter typeFilter={pageButton} sendFilterProducts={(data: any) => setProductData(data)}/>
                    </div>
                    <div className="uey_container-rentpr-data">
                        <Card 
                          setVisible={setVisibleModal}
                          setData={(prod) => setProductModal(prod)}
                          productData={productData}
                          typeCard={pageButton}
                        />
                    </div>
                </div>
              )}
            </div>
          )}
          
        </div>

        <Modal 
            visible={visibleModal}
            setVisible={setVisibleModal}
            productData={productModal}
        />
      </div>
    </ApolloProvider>
  )
}

export default App
