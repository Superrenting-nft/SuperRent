import React from "react";
// import { Form, Button } from "react-bootstrap";
import { abis } from "@project/contracts";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import { getSuperClient } from "../utils";

const Web3 = require("web3");

const Input: FunctionalComponent<any> = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);

  return (
    <div className="input--container">
    <h1>Return NFT</h1>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="input--input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="input--error">* {meta.error}</div>
      ) : null}
    </div>
  );
};

const ReturnNft = ({ provider }) => {
  const config = {
    erc721: "0x76E195437534620106a2Ef736F8C8491159dC640",
  };
  // How does this know the NFT
  const returnNft = async () => {
    const superClient = await getSuperClient(provider);

    const flowTx = await superClient.cfa.deleteFlow({
      superToken: superClient.tokens.fDAIx.address,
      sender: window.ethereum.selectedAddress,
      receiver: config.erc721,
      by: window.ethereum.selectedAddress,
    });
    console.log(flowTx);
  };

  return <button class="return-button" onClick={returnNft}>Return NFT</button>;
};
export default ReturnNft;
