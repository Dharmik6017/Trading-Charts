import axios from "axios"; // Using axios for get data from API

export default axios.create({
  baseURL: "https://api.binance.com/api/v3", //Adding Binance api endpoint from provided Link
});
