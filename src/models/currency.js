const currency = (sequelize, DataTypes) => {
  // Model Architecture
  const Currency = sequelize.define('currency', {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    symbol: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    usd: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    eur: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    aed: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    cny: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    jpy: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    rub: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    gbp: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
  });


  // Functions
  Currency.findById = async (id) => {
    return Currency.findOne({
      where: {
        id,
      },
    });
  }

  Currency.edit = async (id, data = {}) => {
    const currency = await Currency.update(data, {
      where: {
        id,
      },
      returning: true,
      plain: true,
    })
    return currency[1];
  };

  Currency.createOrUpdate = async (currency) => {
    const currentCurrency = await Currency.findOne({
      where: {
        id: currency.id,
      },
    });

    if (currentCurrency) {
      await Currency.edit(currency.id, {
        eur: currency.eur,
        usd: currency.usd,
        aed: currency.aed,
        cny: currency.cny,
        jpy: currency.jpy,
        rub: currency.rub,
        gbp: currency.gbp,
      });
    }
    else {
      await Currency.create({
        id: currency.id,
        name: currency.name,
        symbol: currency.symbol,
        image: currency.image.small,
        eur: currency.eur,
        usd: currency.usd,
        aed: currency.aed,
        cny: currency.cny,
        jpy: currency.jpy,
        rub: currency.rub,
        gbp: currency.gbp,
      });
    }
  }
  return Currency;
}

export default currency;
