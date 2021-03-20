/* import Dropzone from "./dropzone/Dropzone";



const Mint = () => {
return (
    
    <>
        <div className="container">
            {unsupportedFiles.length === 0 && validFiles.length ? <button className="file-upload-btn" onClick={{mint}() => uploadFiles()}>Mint</button> : ''} 
            {unsupportedFiles.length ? <p>Please remove all unsupported files.</p> : ''}
            <div className="drop-container"
                onDragOver={dragOver}
                onDragEnter={dragEnter}
                onDragLeave={dragLeave}
                onDrop={fileDrop}
                onClick={fileInputClicked}
            >
                <div className="drop-message">
                    <div className="upload-icon"></div>
                    Drag & Drop files here or click to select file(s)
                </div>
                <input
                    ref={fileInputRef}
                    className="file-input"
                    type="file"
                    multiple
                    onChange={filesSelected}
                />
            </div>
            <div className="file-display-container">
                {
                    validFiles.map((data, i) => 
                        <div className="file-status-bar" key={i}>
                            <div onClick={!data.invalid ? () => openImageModal(data) : () => removeFile(data.name)}>
                                <div className="file-type-logo"></div>
                                <div className="file-type">{fileType(data.name)}</div>
                                <span className={`file-name ${data.invalid ? 'file-error' : ''}`}>{data.name}</span>
                                <span className="file-size">({fileSize(data.size)})</span> {data.invalid && <span className='file-error-message'>({errorMessage})</span>}
                            </div>
                            <div className="file-remove" onClick={() => removeFile(data.name)}>X</div>
                        </div>
                    )
                }
            </div>
        </div>
        <div className="modal" ref={modalRef}>
            <div className="overlay"></div>
            <span className="close" onClick={(() => closeModal())}>X</span>
            <div className="modal-image" ref={modalImageRef}></div>
        </div>

        <div className="upload-modal" ref={uploadModalRef}>
            <div className="overlay"></div>
            <div className="close" onClick={(() => closeUploadModal())}>X</div>
            <div className="progress-container">
                <span ref={uploadRef}></span>
                <div className="progress">
                    <div className="progress-bar" ref={progressRef}></div>
                </div>
            </div>
        </div>
    </>
);

export default Mint; 


    onClick = async event => {
        event.getNFTStorageClient(); // prevent default submission of the form to the backend (the browser does that automatically)
);
    };

    
}

const [nftMetadata, setNftMetadata] = useState({name: "first nft", description: "this is our first nft", image: "https://ipfs.io/ipfs/${cid"}})

const handleIdChange = (e) => {
    setNftMetadata({...nftMetadata, name: e.target.id})
}

  render() {
    return (
        <div id="form-content">
            <Form>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>NFT Id :</Form.Label>
                    <Form.Control onChange={handleIdChange} size="sm" type="id" key={name} placeholder="Number Id" />                            
                    </Form.Group>
                            <br />
                            <Form.Group controlId="exampleForm.ControlInput2">
                    <Form.Label>NFT Name :</Form.Label>
                    <Form.Control size="sm" type="tex" key={description}  placeholder="Small text" />                            
                    </Form.Group>
                            <br />
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Discribe Your NFT </Form.Label>
                        <br />
                    <Form.Control as="textarea" rows={4} />
                </Form.Group>
            </Form>
        </div>
    );
}

*/

 