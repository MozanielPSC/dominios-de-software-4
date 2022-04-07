import axios from "axios";

export const geo_loc_api = 'https://api.bigdatacloud.net/data/reverse-geocode-client?latitude='

export const api = axios.create({
  baseURL: 'http://localhost:3333'
});