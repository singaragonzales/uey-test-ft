import {gql} from "@apollo/client"

export const GET_SELLER_SELECT = gql`
    {
        sellers{
            _id
            name
        }
    }`;