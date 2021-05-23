import React from 'react'
import Dropzone from "./dropzone/Dropzone";
import NftForm from "./nft/NftForm";
import putForRent from "./Rent"


export default function Rent() {
    return (
        <div>
            <div class="form-container">
                <Dropzone />
                <NftForm />
                <PutForRentForm />
                <RentNft provider={provider} />
                <ReturnNft provider={provider} />
            </div>
        </div>
    )
}
