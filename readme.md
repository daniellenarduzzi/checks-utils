# Checks-utils

Simple Tools to work with checks, discount rate, expiration term, commissions.


## Usage: 

`$ npm i checks-utils`

```js

const check-util = require("checks-utils")
```

## Create new check object:

 - {*float} nominalValue: Nominal value of the check.

 - {*float} commision: Comissions percibed, value between 0 and 1.

 - {*uint} expiration: Expiration term in days.

 - {*float} discountTax: Discount tax, value between 0 and 1.

#### example:
```js
const newCheck = new check-util.check(1000, 0.05, 90, 0.3)
```

## Calculate net value
Calculate net value after discount commision.

#### example:
```js
const newCheck = new check-util.check(100000, 0.05, 90, 0.3)

const netValue = newCheck.netValue() // => 97000
```

## Calculate minimal value
Calculate the minimal value accepted after aply commission and discount tax.

#### example:
```js
const newCheck = new check-util.check(100000, 0.05, 90, 0.3)

const netValue = newCheck.minValue() // => 89725
```

## Tokenization of checks using ERC20 standard

Assuming decimals are 18, we name a new unit called minToken, which is:

1 token = 10^18 minToken

then we have the rate and cap (included in ERC20 standard):

rate = 1 / minTokenPriceInWei,  or: rate = 10^18 / tokenPrice[WEI]

and: 

minValueOfCheck[ETH] = convert(newCheck.minValue(), exchangeRateTok[ETH]cap = minValueOfCheck[ETH] * 10^18

The formula to calculate the amount of token created is:

tokenAmount = cap / tokenPrice[WEI]which is the same:

tokenPrice[WEI] = cap / tokenAmount

If we fix tokenAmount = minValueOfCheck[ETH]

then:

tokenPrice = 10^18 WEI = 1 ETH

and:

rate = 1

and:

cap = minValueOfCheck[ETH] * 10^18

Simple solution to tokenization problem.

