import React, {useState, useEffect} from 'react';
import { Checkbox } from 'primereact/checkbox';
import { Dropdown } from 'primereact/dropdown';
import "./index.scss";
import {GET_SELLER_SELECT} from '../../graphql/seller.js';
import {GET_PRODUCTS_SEARCH_SELL} from '../../graphql/product.js';
import {useQuery} from "@apollo/client";

interface FilterProps {
    sendFilterProducts(data: any): void;
}
const Filter: React.FunctionComponent<FilterProps> = ({
	sendFilterProducts
}: FilterProps) => {
    const [checked, setChecked] = useState<boolean>(true);
    const [productName, setProductName] = useState("");
    const [selectedCity, setSelectedCity] = useState<any>(null);
    const [sellersOptions, setSellersOptions] = useState([]);
    const { data } = useQuery(GET_SELLER_SELECT)
 
    useEffect(() => {
        let array:any = [
            {name: "Seleciona un Vendedor", code: ""}
        ]
        if(data !== undefined){
            data.sellers.forEach((e: any) => {
                array.push({
                    name: e.name, code: e._id
                })
            });
            setSellersOptions(array)
        }
      }, [data]);

    const { refetch } = useQuery(GET_PRODUCTS_SEARCH_SELL, {
        variables: {
            name: productName,
            sellerId: selectedCity?.code || "",
            showInventory: checked
        }
      }
    );

    const sendFilterSellPr = async() => {
        const res = await refetch()
        if(res !== undefined){
            sendFilterProducts(res.data.product_search)
        }
    }
    

    return (
        <div className='uey_filter--container'>
            <input type="text" placeholder='Ingrese Nombre de Producto' value={productName} onChange={(e) => setProductName(e.target.value)} />
            <Dropdown 
                value={selectedCity} 
                onChange={(e) => setSelectedCity(e.value)} 
                options={sellersOptions} 
                optionLabel="name" 
                placeholder="Selecciona un vendedor"
                className='uey_filter--container-dpd'
            />
            <div className="uey_filter--container-ckb">
                <Checkbox inputId="value_chb" name="pizza" value="Mostrar Productos con menos de 10 en stock" onChange={e => setChecked(e.checked || false)} checked={checked} />
                <label htmlFor="value_chb">Mostrar Productos con menos de 10 en stock</label>
            </div>
            <button 
                className='uey_filter--container-btn'
                onClick={() => sendFilterSellPr()}
            ><span className="pi pi-search" /></button>
        </div>
    )
}

export default Filter;