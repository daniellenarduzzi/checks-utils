const expect = require('chai').expect
const check = require("../index")
var i = 0
do{
    const nominalValue = Math.random() * 10000000000
    const commision = Math.random() + 0.00001
    const expiration = Math.floor(Math.random() * (10000 - 0.0001)) + 0.0001;
    const discountTax = Math.random() + 0.00001
    const newCheck = new check.check(nominalValue, commision, expiration, discountTax)
    expect(newCheck.nominalValue).to.equal(nominalValue);
    expect(newCheck.commision).to.equal(commision);
    expect(newCheck.expiration).to.equal(expiration);
    expect(newCheck.discountTax).to.equal(discountTax);
    i++
} while(i<1000)
const othnominalValue = 100000
const othcommision = 0.03
const othexpiration = 90
const othdiscountTax = 0.3
const otherCheck = new check.check(othnominalValue, othcommision, othexpiration, othdiscountTax)
expect(otherCheck.netValue()).to.equal(97000);
expect(otherCheck.minValue()).to.equal(89725);
