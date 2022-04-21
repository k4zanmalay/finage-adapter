### Run 
```
node scripts/finageCL-Adapter/app.js
```
### Use
```
curl -X POST -H "content-type:application/json" "http://localhost:3001/" --data '{ "id": 0, "data": { "market": "forex", "symbol": "xagusd", "method": "quote"} }'

```
gets last quote for a given product

- method - "quote"
- market - "forex", "crypto"
- symbol - product (e.g. eur/usd, xag/usd, eth/usd)

```
curl -X POST -H "content-type:application/json" "http://localhost:3001/" --data '{ "id": 0, "data": { "market": "forex", "symbol": "xagusd", "timestamp": 1650402000000, "method": "history", "from": 1650412800000, "to": 1650412860000} }'
```
gets minute candles for a given period OR one minute candle for a given timestamp

- method - "history"
- market - "forex", "crypto"
- symbol - product (e.g. eur/usd, xag/usd, eth/usd)
- timestamp - price time in epochs

#### optional
- from - start time in epochs
- to - end time in epochs

#### response
- o - open price
- h - high price
- l - low price
- c - close price
- v - volume
- t - timestamp
- minPrice - lowest price of all candles
- maxPrice - highest price of all candles

