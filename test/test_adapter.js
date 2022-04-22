const {assert, expect} = require('chai');
const create = require('../controllers');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});

const forex = ['eurusd', 'gbpusd', 'gbpjpy', 'euraud', 'eurjpy', 'audjpy', 'audusd', 'eurcad', 'eurchf', 'eurgbp', 'usdjpy', 'usdcad'];
const metals = ['xauusd', 'xagusd', 'xptusd', 'xpdusd'];
const crypto = ['btcusd', 'ethusd', 'xrpusd', 'ltcusd'];

describe('last quote request', () => {
  it('returns forex price', (done) => {
    for(let i=0; i<forex.length; i++) {
      create.quoteRequest({
        id: 777,
        data: {
          market: 'forex',
          symbol: forex[i]
        }
      }, (status, data) => {
        assert.equal(status, 200);
        assert.equal(data.jobRunID, 777);
        assert.isNotEmpty(data.data);
        assert.isNumber(data.result);
        console.log('Result: ', data.result);
      });
    }
    done();
  });
  it('returns metal price', (done) => {
    for(let i=0; i<metals.length; i++) {
      create.quoteRequest({
        id: 777,
        data: {
          market: 'forex',
          symbol: metals[i]
        }
      }, (status, data) => {
        assert.equal(status, 200);
        assert.equal(data.jobRunID, 777);
        assert.isNotEmpty(data.data);
        assert.isNumber(data.result);
        console.log('Result: ', data.result);
      });
    }
    done();
  });
  it('returns crypto price', async (done) => {
    for(let i=0; i<crypto.length; i++) {
      create.quoteRequest({
        id: 777,
        data: {
          market: 'crypto',
          symbol: crypto[i]
        }
      }, (status, data) => {
        assert.equal(status, 200);
        assert.equal(data.jobRunID, 777);
        assert.isNotEmpty(data.data);
        assert.isNumber(data.result);
        console.log('Result: ', data.result);
      });
    }
    done();
  });
});

describe('history quote request', () => {
  it('returns forex price', (done) => {
    let timestamp = new Date('2021-04-01T00:19:00').getTime();
    for(let i=0; i<1; i++) {
      create.historyRequest({
        id: 777,
        data: {
          market: 'forex',
          symbol: forex[i],
          //Free API only allows 00:00 to 00:19
          timestamp
        }
      }, (status, data) => {
        assert.equal(status, 200);
        assert.equal(data.jobRunID, 777);
        assert.isNotEmpty(data.data);
        assert.isNumber(data.result);
        expect(timestamp + 10800000).to.be.closeTo(data.data.results[0].t, 1); 
        console.log('Result: ', data.result);
      });
    }
    done();
  });
  it('returns metal price', (done) => {
    let timestamp = new Date('2021-04-01T00:19:00').getTime();
    for(let i=0; i<1; i++) {
      create.historyRequest({
        id: 777,
        data: {
          market: 'forex',
          symbol: metals[i],
          //Free API only allows 00:00 to 00:19
          timestamp 
        }
      }, (status, data) => {
        assert.equal(status, 200);
        assert.equal(data.jobRunID, 777);
        assert.isNotEmpty(data.data);
        assert.isNumber(data.result);
        expect(timestamp + 10800000).to.be.closeTo(data.data.results[0].t, 1); 
        console.log('Result: ', data.result);
      });
    }
    done();
  });
  it('returns crypto price', async (done) => {
    let timestamp = new Date('2021-04-01T00:19:00').getTime();
    for(let i=0; i<1; i++) {
      create.historyRequest({
        id: 777,
        data: {
          market: 'crypto',
          symbol: crypto[i],
          //Free API only allows 00:00 to 00:19
          timestamp 
        }
      }, (status, data) => {
        assert.equal(status, 200);
        assert.equal(data.jobRunID, 777);
        assert.isNotEmpty(data.data);
        assert.isNumber(data.result);
        //+3 hours, also finage API crypto returns close time so + 60 sec 
        expect(timestamp + 10800000).to.be.closeTo(data.data.results[0].t, 60000); 
        console.log('Result: ', data.data.result);
      });
    }
    done();
  });
});

describe('minmax request', () => {
  it('returns forex minmax price', (done) => {
    for(let i=0; i<1; i++) {
      create.minmaxRequest({
        id: 777,
        data: {
          market: 'forex',
          symbol: forex[i],
          from: new Date('2022-04-01T00:19:00').getTime(),
          to: new Date('2022-04-19T00:19:00').getTime()
        }
      }, (status, data) => {
        assert.equal(status, 200);
        assert.equal(data.jobRunID, 777);
        assert.isNotEmpty(data.data);
        assert.isNumber(data.result.minPrice);
        assert.isNumber(data.result.maxPrice);
        console.log('Result: ', data.result);
      });
    }
    done();
  });
  it('returns metal minmax price', (done) => {
    for(let i=0; i<1; i++) {
      create.minmaxRequest({
        id: 777,
        data: {
          market: 'forex',
          symbol: metals[i],
          from: new Date('2022-04-01T00:19:00').getTime(),
          to: new Date('2022-04-19T00:19:00').getTime()
        }
      }, (status, data) => {
        assert.equal(status, 200);
        assert.equal(data.jobRunID, 777);
        assert.isNotEmpty(data.data);
        assert.isNumber(data.result.minPrice);
        assert.isNumber(data.result.maxPrice);
        console.log('Result: ', data.result);
      });
    }
    done();
  });
  it('returns crypto minmax price', async (done) => {
    for(let i=0; i<1; i++) {
      create.minmaxRequest({
        id: 777,
        data: {
          market: 'crypto',
          symbol: crypto[i],
          from: new Date('2022-04-01T00:19:00').getTime(),
          to: new Date('2022-04-19T00:19:00').getTime()
        }
      }, (status, data) => {
        assert.equal(status, 200);
        assert.equal(data.jobRunID, 777);
        assert.isNotEmpty(data.data);
        assert.isNumber(data.result.minPrice);
        assert.isNumber(data.result.maxPrice);
        console.log('Result: ', data.result);
      });
    }
    done();
  });
});


