export const offerTypesId = {
  BUY: 'buy',
  SELL: 'sell',
  TRADE: 'trade',
  RENT: 'rent',
};

export const currencyTypesId = {
  BLZT: 'BLZT',
  ETH: 'ETH',
  DAI: 'DAI',
  USDT: 'USDT',
}

export const currencyTypes = {
  [currencyTypesId.BLZT]: '0x0000000000000000000000000000000000000003',
  [currencyTypesId.ETH]: '0x0000000000000000000000000000000000000000',
  [currencyTypesId.DAI]: '0x0000000000000000000000000000000000000001',
  [currencyTypesId.USDT]: '0x626fdbfF6D1B75237121415b8eD178543AF0981c',
}

export const offerStatesId = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
}
