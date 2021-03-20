import React, { useState } from "react";
// import { Form, Button } from "react-bootstrap";
import { NFTStorage } from "nft.storage";
import { abis } from "@project/contracts";
import { Formik, Field, Form, ErrorMessage, useField } from "formik";
import * as Yup from "yup";

const Web3 = require("web3");

const Input: FunctionalComponent<any> = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);

  return (
    <div className="input--container">
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="input--input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="input--error">* {meta.error}</div>
      ) : null}
    </div>
  );
};

const NftForm = () => {
  const getNFTStorageClient = () => {
    console.log(process.env.NFT_STORAGE_API_KEY);
    return new NFTStorage({
      // If this token can be turned into an environment var
      // that would be great
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJnaXRodWJ8MTI3MDUxNDYiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYxNjExNTkxNjA1MSwibmFtZSI6ImRlZmF1bHQifQ.kn0H8kEawwLyS0uo_8Nwr-loUu_a-27DxQjdlD41_Hc",
    });
  };

  const web3 = new Web3(window.ethereum);
  const config = {
    erc721: "0x76E195437534620106a2Ef736F8C8491159dC640",
  };

  const [nftMetadata, setNftMetadata] = useState({
    name: null,
    description: "this is our first nft",
  });

  const handleIdChange = (e) => {
    console.log(e);
    e.preventDefault();
    setNftMetadata({ ...nftMetadata, name: e.target.id });
  };
  const handleNameChange = (e) => {
    setNftMetadata({ ...nftMetadata, description: e.target.text });
  };

  const mint = async (id, name, description, file) => {
    const nftCid = await getNFTStorageClient().storeBlob(file);
    console.log(nftCid);
    const metadata = {
      name: name,
      description: description,
      image: `https://ipfs.io/ipfs/${nftCid}`,
    };

    const metadataCid = await getNFTStorageClient().storeBlob(
      new Blob([JSON.stringify(metadata)])
    );
    // console.log(metadataCid);
    console.log(abis.erc721.abi);
    console.log(nftMetadata);
    const c = new web3.eth.Contract(abis.erc721.abi, config.erc721);

    console.log(c.methods);
    const tx = await c.methods
      .mint(id, metadataCid)
      .send({ from: window.ethereum.selectedAddress });
    console.log(tx);
  };

  return (
    <Formik
      initialValues={{ nftId: 0, description: "", nftImage: "" }}
      validationSchema={Yup.object({
        nftId: Yup.number()
          .positive()
          .typeError("Must be a number")
          .required("Required"),
        name: Yup.string()
          .max(20, "Must be 20 characters or less")
          .typeError("Must be a string")
          .required("Required"),
        description: Yup.string()
          .max(200, "Must be 200 characters or less")
          .typeError("Must be a string")
          .required("Required"),
      })}
      // 1. Build contracts based on code
      //   - Going to use mustache
      // 2. Deploy contracts
      // 3. Confirm contracts are deployed
      // 4. There should probably be a loader graphic to help
      onSubmit={async (values, { setSubmitting }) => {
        // I need stacks to deploy the contract
        // makeTemplate(values);

        console.log(values);
        await mint(
          values.nftId,
          values.name,
          values.description,
          values.nftImage
        );
      }}
    >
      {(formProps) => (
        <Form className="createSubscriptionPage--formContainer">
          <Input label="NFT Id" name="nftId" type="text" />
          <Input label="NFT Name" name="name" type="text" />
          <Input label="Description" name="description" type="text" />
          <Input
            type="file"
            name="file"
            onChange={(event) => {
              console.log(formProps);
              console.log(event.target.files[0]);
              formProps.setFieldValue("nftImage", event.target.files[0]);
            }}
          />
          <div className="createSubscriptionPage--submitContainer">
            <button
              className="createSubscriptionPage--submitButton"
              type="submit"
            >
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

// return (
//   <div id="form-content">
//     <Form>
//       <Form.Group>
//         <Form.Label>NFT Id :</Form.Label>
//         <Form.Control
//           onChange={handleIdChange}
//           size="sm"
//           placeholder="Number Id"
//           value={nftMetadata.name}
//         />
//       </Form.Group>
//       <br />
//       <Form.Group
//         onChange={handleNameChange}
//         controlId="exampleForm.ControlInput2"
//       >
//         <Form.Label>NFT Name :</Form.Label>
//         <Form.Control size="sm" type="text" placeholder="Small text" />
//       </Form.Group>
//       <br />
//       <Form.Group controlId="exampleForm.ControlTextarea1">
//         <Form.Label>Discribe Your NFT </Form.Label>
//         <br />
//         <Form.Control as="textarea" rows={4} />
//       </Form.Group>
//     </Form>
//     <Button variant="info" type="submit" onClick={mint}>
//       Mint
//     </Button>
//     <br />
//     <Button variant="secondary"> List For Sale </Button>
//     <br />
//     <Button variant="success">Renting</Button>
//     <br />
//     <Button variant="warning">Getting Back</Button>
//     <br />
//   </div>
// );

export default NftForm;
