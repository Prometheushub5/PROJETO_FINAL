import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://prometheusapi.herokuapp.com/v1.0/'  
}) 

export const apicep = axios.create({
  baseURL: 'https://viacep.com.br/ws/'  
}) 
