### Run 
```
npm start
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
curl -X POST -H "content-type:application/json" "http://localhost:3001/" --data '{ "id": 0, "data": { "market": "forex", "symbol": "xagusd", "timestamp": 1650402000000, "method": "history"} }'
```
gets minute candle for a given timestamp

- method - "history"
- market - "forex", "crypto"
- symbol - product (e.g. eur/usd, xag/usd, eth/usd)
- timestamp - price time in epochs (free API restricts request time to 00:00-00:19)

```
curl -X POST -H "content-type:application/json" "http://localhost:3001/" --data '{ "id": 0, "data": { "market": "forex", "symbol": "xagusd", "from": 1648772340000, "to": 1650327540000 "method": "minmax"} }'
```
gets minimum and maximum price for a given period

- method - "history"
- market - "forex", "crypto"
- symbol - product (e.g. eur/usd, xag/usd, eth/usd)
- from - start time
- end - end time


### Tests 
```
npm run test
```
