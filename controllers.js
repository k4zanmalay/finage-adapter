const { Requester, Validator } = require('@chainlink/external-adapter')
// Define custom error scenarios for the API.
// Return true for the adapter to retry.
const customError = (data) => {
  if (data.Response === 'Error') return true
  return false
}

const parseDate = (epoch) => {
  let dateObj = {};
  let date = new Date(epoch);
  console.log('Date: ', date);
  dateObj.YYMMDD = date.toISOString().split('T')[0];
  console.log('Day: ', dateObj.YYMMDD);
  dateObj.HHMM = date.toISOString().split('T')[1].slice(0,5);
  console.log('Hour: ', dateObj.HHMM);
  return dateObj;
}
// Define custom parameters to be used by the adapter.
// Extra parameters can be stated in the extra object,
// with a Boolean value indicating whether or not they
// should be required.
const customParams = {
  market: ['market'],
  symbol: ['symbol', 'pair'],
  timestamp: ['timestamp', 'time'],
  method:['method'],
  endpoint: false
}

exports.historyRequest = (input, callback) => {
  // The Validator helps you validate the Chainlink request data
  let from, to;
  console.log('Processing...')
  const validator = new Validator(input, customParams);
  const jobRunID = validator.validated.id;
  
  const symbol = validator.validated.data.symbol.toUpperCase();
  const epoch = validator.validated.data.timestamp;
  const market = validator.validated.data.market;

  const date = parseDate(epoch);

  if(input.data.from)
    from = parseDate(input.data.from).HHMM;
  else
    from = '00:00';
    //from = date.HHMM;
  if(input.data.to)
    to = parseDate(input.data.to).HHMM;
  else
    to = '00:01';
    //to = date.HHMM;

  const apikey = process.env.API_KEY;
  const st = from;
  const et = to;

  const endpoint = `${market}/${symbol}/1/minute/${date.YYMMDD}/${date.YYMMDD}`;

  const url = `https://api.finage.co.uk/agg/${endpoint}`
  console.log('URL: ', url);
  const params = {
    apikey,
    st,
    et
  }

  // This is where you would add method and headers
  // you can add method like GET or POST and add it to the config
  // The default is GET requests
  // method = 'get' 
  // headers = 'headers.....'
  const config = {
    url,
    params
  }
  // The Requester allows API calls be retry in case of timeout
  // or connection failure
  Requester.request(config, customError)
    .then(response => {
      // It's common practice to store the desired value at the top-level
      // result key. This allows different adapters to be compatible with
      // one another.
      let min = Math.min(...response.data.results.map(el => el.l));
      let max = Math.max(...response.data.results.map(el => el.h));
      console.log('min price: ', min);
      console.log('max price: ', max);
      response.data.minPrice = min;
      response.data.maxPrice = max;
      response.data.result = el[0].c;
      callback(response.status, Requester.success(jobRunID, response))
    })
   .catch(error => {
      callback(500, Requester.errored(jobRunID, error))
    })
}
exports.quoteRequest = (input, callback) => {
  const jobRunID = input.id;
  const symbol = input.data.symbol.toUpperCase();
  const apikey = process.env.API_KEY;
  const market = input.data.market;
  const endpoint = `${market}/${symbol}`;
  const url = `https://api.finage.co.uk/last/${endpoint}`;
  console.log('URL: ', url);
  const params = {
    apikey
  }

  const config = {
    url,
    params
  }
  // The Requester allows API calls be retry in case of timeout
  // or connection failure
  Requester.request(config, customError)
    .then(response => {
      if(market == 'forex')
        //SHOULD BE ask or bid depending on bet type (long - bid, short - ask)
        response.data.result = response.data.ask;
      if(market == 'crypto')
        response.data.result = response.data.price;
      callback(response.status, Requester.success(jobRunID, response));
    })
   .catch(error => {
      callback(500, Requester.errored(jobRunID, error));
    })
}
