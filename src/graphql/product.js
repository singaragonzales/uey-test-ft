import {gql} from "@apollo/client"

export const GET_PRODUCTS = gql`
query($type: String){
    product_filter(
        type: $type,
    ) {
        _id
        name
        price
        image
        inventory
        sellerId
        type
        seller{
            _id
            image
            name
            phone
        }
    }
}`;

export const GET_PRODUCTS_SEARCH_SELL = gql`
query($name: String, $sellerId: String, $showInventory: Boolean){
    product_search(
        name: $name,
        sellerId: $sellerId,
        showInventory: $showInventory,
    ) {
        _id
        name
        price
        image
        inventory
        sellerId
        type
        seller{
            _id
            image
            name
            phone
        }
    }
}`;