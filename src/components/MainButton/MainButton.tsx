import { useState, useEffect } from 'react';
import { PAGE_BUTTON } from '../../assets/data';
import {GET_PRODUCTS} from '../../graphql/product.js';
import { useQuery } from "@apollo/client";

interface MainButtonProps {
    sendFilterProducts(data: any, type:string): void;
}
const MainButton: React.FunctionComponent<MainButtonProps> = ({
	sendFilterProducts,
}: MainButtonProps) => {
    const [pageButton, setPageButton] = useState("")

    const { refetch } = useQuery(GET_PRODUCTS, {
      variables: {
        type: pageButton === "Comprar Productos" ? "sell_pr" : "rent_pr"
      }
    })

    const sendFilterSellPr = async(btn: string) => {
        const res = await refetch()
        return sendFilterProducts(res.data.product_filter, btn)
    }

  return (
    <div>
        <div className='uey_container-select'>
            {PAGE_BUTTON.map((btn:any, i: number) => (
                <button 
                    key={`page-btn-${i}`}
                    onClick={async() => {
                        await setPageButton(btn)
                        await sendFilterSellPr(btn)
                    }} 
                    className={`uey_container-${pageButton === btn ? "selected-button" : "not-selected-button"}`}
                >
                    {btn}
                </button>
            ))}
        </div>
    </div>
  )
}

export default MainButton
