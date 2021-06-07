import React from 'react'
import NftForm from "../NftForm";
import PutForRent from "./Rent"
import RentNft from '../RentNft'
import ReturnNft from '../ReturnNft'
import useWeb3Modal from "../../hooks/useWeb3Modal";
import PutForRentForm from '../PutForRentForm'



export default function Rent() {
    const [provider] = useWeb3Modal();
    return (
        <div>
            <div class="form-container">
                <NftForm />
                <PutForRentForm />
                <RentNft provider={provider} />
                <ReturnNft provider={provider} />
            </div>
        </div>
    )
}
