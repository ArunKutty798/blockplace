import Web3 from "web3";
import { AbiItem } from "web3-utils";
import paypalabi from "./abi/bloackplace.json";

const { ethereum } = window as any;

const web3 = new Web3(ethereum);
const paypaladdress = "0xF9d6F4FBd47E3E638ce5301fAe5E14E64505Ced6";

const paypal = new web3.eth.Contract(paypalabi as AbiItem[], paypaladdress);

export const createTrade = async (
  amount,
  trader: string,
  address: string,
  title: string
) => {
  const amt = web3.utils.toWei(amount);
  await paypal.methods.createTrade(amt, trader, title).send({
    from: address,
    value: amt,
  });
};

export const endTrade = async (id, address: string) => {
  await paypal.methods.endTrade(id).send({
    from: address,
  });
};

export const balance = async (address: string) => {
  return await paypal.methods.balance(address).call();
};

export const tradeDetails = async (id) => {
  return await paypal.methods.trade(id).call();
};
export const getid = async (address: string) => {
  return await paypal.methods.getId(address).call();
};
