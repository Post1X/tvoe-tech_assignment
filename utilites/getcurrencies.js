// export default async function getCurrencies() {
//     const url = `http://apilayer.net/api/live?access_key=845a7a282f9e901b1cf41e790c34fd6b&currencies=RUB,BTC,EUR&source=USD&format=1`
//     try {
//         const response = await fetch(url);
//         const json = await response.json();
//         console.log(json)
//         return json.quotes;
//     } catch (e) {
//         console.error(e);
//         return 'error';
//     }
// }
