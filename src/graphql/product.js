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
        address
        type_rent
        coords
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

export const GET_PRODUCTS_SEARCH_RENT = gql`
query($name: String, $sellerId: String, $type: String,){
    product_search_rt(
        name: $name,
        sellerId: $sellerId,
        type: $type,
    ) {
        _id
        name
        price
        image
        inventory
        sellerId
        address
        coords
        type
        type_rent
        seller{
            _id
            image
            name
            phone
        }
    }
}`;