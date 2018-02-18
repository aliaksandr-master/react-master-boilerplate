import { STATIC_URL } from './../config/';



const getStaticUrl = (url) => `${STATIC_URL.replace(/\/+$/, '')}/${url.trim().replace(/^\/+/, '')}`;



export default getStaticUrl;
