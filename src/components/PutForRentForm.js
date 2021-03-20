import React, { useState } from "react";
// import { Form, Button } from "react-bootstrap";
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

const PutForRentForm = () => {
  const web3 = new Web3(window.ethereum);
  const config = {
    erc721: "0x76E195437534620106a2Ef736F8C8491159dC640",
  };
  const putForRent = async (id, price) => {
    // const nftCid = await getNFTStorageClient().storeBlob(file);
    console.log("hi");
    const c = new web3.eth.Contract(abis.erc721.abi, config.erc721);

    const tx = await c.methods
      .putForRent(id, price)
      .send({ from: window.ethereum.selectedAddress });

    console.log(tx);
  };

  return (
    <Formik
      initialValues={{ nftId: 0 }}
      validationSchema={Yup.object({
        nftId: Yup.number()
          .positive()
          .typeError("Must be a number")
          .required("Required"),
        price: Yup.number()
          .positive()
          .typeError("Must be a number")
          .required("Required"),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        console.log(values);
        await putForRent(values.nftId, values.price);
      }}
    >
      {(formProps) => (
        <Form className="createSubscriptionPage--formContainer">
          <Input label="NFT Id" name="nftId" type="text" />
          <Input label="Price" name="price" type="text" />
          <div className="createSubscriptionPage--submitContainer">
            <button
              className="createSubscriptionPage--submitButton"
              type="submit"
            >
              Submit For Rent
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
export default PutForRentForm;
