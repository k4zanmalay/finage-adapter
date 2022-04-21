const {assert} = require('chai');
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

