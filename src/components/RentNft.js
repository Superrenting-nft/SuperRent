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
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="input--input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="input--error">* {meta.error}</div>
      ) : null}
    </div>
  );
};

const RentNft = ({ provider }) => {
  const web3 = new Web3(window.ethereum);
  const config = {
    erc721: "0x76E195437534620106a2Ef736F8C8491159dC640",
  };
  const rentNft = async (id, flowRate) => {
    console.log(provider);
    const superClient = await getSuperClient(provider);
    console.log(superClient);
    console.log("Client");

    console.log(id, web3.utils.toWei("1"));
    console.log(
      "ENCODE PARAMETERS: ",
      web3.eth.abi.encodeParameters(
        ["uint256", "uint256"],
        [id, web3.utils.toWei("1")]
      )
    );

    console.log("SENDER: ", window.ethereum.selectedAddress);
    console.log("SUPERTOKEN: ", superClient.tokens.fDAIx.address);
    // function getRentList() external view returns (RentInfo[] memory)
    const c = new web3.eth.Contract(abis.erc721.abi, config.erc721);
    const rentList = await c.methods
      .getRentList()
      .call({ from: window.ethereum.selectedAddress });
    const correctNFT = rentList.filter((i, element) => {
      console.log(i);
      console.log(element);
      console.log(id);
      console.log(i[0]);
      console.log(i[2]);
      console.log(i[0] === `${id}`);
      if (i[0] === `${id}`) {
        return element;
      }
    });
    console.log("Correct");
    console.log(correctNFT);

    const price = correctNFT[0][0];
    console.log(price);
    const flowPrice = 277777777777778 * price;
    console.log(flowPrice);
    console.log("Flow Price");
    const flowTx = await superClient.cfa.createFlow({
      superToken: superClient.tokens.fDAIx.address,
      sender: window.ethereum.selectedAddress,
      receiver: config.erc721,
      flowRate: `${flowPrice}`,
      userData: web3.eth.abi.encodeParameters(
        ["uint256", "uint256"],
        [id, web3.utils.toWei("1")]
      ),
    });
    console.log(flowTx);
  };

  return (
    <Formik
      initialValues={{ id: 0 }}
      validationSchema={Yup.object({
        nftId: Yup.number()
          .positive()
          .typeError("Must be a number")
          .required("Required"),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        console.log(values);
        await rentNft(values.nftId, values.flowRate);
      }}
    >
      {(formProps) => (
        <Form className="createSubscriptionPage--formContainer">
          <Input label="NFT Id" name="nftId" type="text" />
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
export default RentNft;
