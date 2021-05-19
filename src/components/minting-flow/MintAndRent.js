import React from 'react'

export default function MintAndRent() {




    
    return (
        <div className="main-container">
        <div class="form-container">
          <Dropzone />
          <NftForm />
          <PutForRentForm />
          <RentNft provider={provider} />
          <ReturnNft provider={provider} />
        </div>
    )
}
