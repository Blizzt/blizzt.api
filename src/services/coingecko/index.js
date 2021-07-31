// Dependencies
import CoinGecko from 'coingecko-api';
import {CronJob} from 'cron';
import models from '../../models';

const CoinGeckoClient = new CoinGecko();

const currenciesCodes = [
  'ethereum',
  'tether',
  'dai',
]

export default function activateCurrencySynchronization(timePattern) {
  new CronJob(timePattern, async function() {
    return Promise.all(currenciesCodes.map(async function (currencyCode) {
      const {data, code} = await CoinGeckoClient.coins.fetch(currencyCode);
      if (code === 200 && data) {
        const {id, symbol, name, image, market_data: {current_price: {eur, usd, aed, cny, jpy, rub, gbp}}} = data;
        return {id, symbol, name, image, eur, usd, aed, cny, jpy, rub, gbp};
      }
      return null;
    })).then((result) => {
      result.map(async (currency) => {
        await models.Currency.createOrUpdate(currency)
      })
    });
  }, null, true, 'America/Los_Angeles').start();
}


