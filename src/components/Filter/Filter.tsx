import React, {useState, useEffect} from 'react';
import { Checkbox } from 'primereact/checkbox';
import { Dropdown } from 'primereact/dropdown';
import "./index.scss";
import {GET_SELLER_SELECT} from '../../graphql/seller.js';
import {GET_PRODUCTS_SEARCH_SELL, GET_PRODUCTS_SEARCH_RENT} from '../../graphql/product.js';
import {useQuery} from "@apollo/client";

interface FilterProps {
    sendFilterProducts(data: any): void;
    typeFilter: string;
}
const Filter: React.FunctionComponent<FilterProps> = ({
	sendFilterProducts,
    typeFilter
}: FilterProps) => {
    const [checked, setChecked] = useState<boolean>(true);
    const [productName, setProductName] = useState("");
    const [selectSeller, setSelectSeller] = useState<any>(null);
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

      useEffect(() => {
        setProductName("")
        setChecked(true)
        setSelectSeller(null)
      }, [typeFilter]);

    const products_pr  = useQuery(GET_PRODUCTS_SEARCH_SELL, {
        variables: {
            name: productName,
            sellerId: selectSeller?.code || "",
            showInventory: checked
        }
      }
    );

    const products_rt = useQuery(GET_PRODUCTS_SEARCH_RENT, {
        variables: {
            name: productName,
            sellerId: selectSeller?.code || "",
            type: "rent_pr"
        }
      }
    );

    const sendFilterSellPr = async() => {
        const res = await products_pr.refetch()
        if(res !== undefined){
            sendFilterProducts(res.data.product_search)
        }
    }

    const sendFilterSellRT = async() => {
        const res = await products_rt.refetch()
        if(res !== undefined){
            sendFilterProducts(res.data.product_search_rt)
        }
        
    }
    

    return (
        <div className='uey_filter--container'>
            <input type="text" placeholder='Ingrese Nombre de Producto' value={productName} onChange={(e) => setProductName(e.target.value)} />
            <Dropdown 
                value={selectSeller} 
                onChange={(e) => setSelectSeller(e.value)} 
                options={sellersOptions} 
                optionLabel="name" 
                placeholder="Selecciona un vendedor"
                className='uey_filter--container-dpd'
            />
            {typeFilter === "Comprar Productos" && (
                <div className="uey_filter--container-ckb">
                    <Checkbox inputId="value_chb" name="pizza" value="Mostrar Productos con menos de 10 en stock" onChange={e => setChecked(e.checked || false)} checked={checked} />
                    <label htmlFor="value_chb">Mostrar Productos con menos de 10 unidades en stock</label>
                </div>
            )}
            <button 
                className='uey_filter--container-btn'
                onClick={() => typeFilter === "Comprar Productos" ? sendFilterSellPr() : sendFilterSellRT()}
            ><span className="pi pi-search" /></button>
        </div>
    )
}

export default Filter;