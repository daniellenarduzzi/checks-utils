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