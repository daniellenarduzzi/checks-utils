const YEAR = 360
const moment = require('moment');
require("./lib/Date-obj-extended")

/**
 * @function Creates a New check object with calculations functionality
 * @param {*float} nominalQty: Nominal value of the check.
 * @param {*float} commision: Comissions percibed, value between 0 and 1.
 * @param {*uint} expiration: Expiration term in days.
 * @param {*float} discountTax: Discount tax, value between 0 and 1.
 */
class check {
    constructor(
        hash, 
        txHash, 
        fullName, 
        nominalQty, 
        denomination, 
        checkNumber, 
        emissionDate, 
        payDate, 
        discountTax,
        commission
    ) {
        if(!/^[A-Fa-f0-9]{64}$/.test(hash)) 
            throw new Error ("Invalid hash")
        if(!/^0x([A-Fa-f0-9]{64})$/.test(txHash))
            throw new Error("Invalid TxHash")
        if(typeof(fullName) != 'string')
            throw new Error("Invalid Full Name")
        if (isNaN(nominalQty) || nominalQty < 0 )
            throw new Error("Nominal Qty must be greater than 0")
        if (nominalQty > Number.MAX_SAFE_INTEGER)
            throw new Error(`Nominal Qty must be less than ${Number.MAX_SAFE_INTEGER}`)
        if(typeof(denomination) != 'string')
            throw new Error("Invalid Denomination")
        if (isNaN(checkNumber) || !Number.isInteger(checkNumber) || checkNumber < 0)
            throw new Error("Invalid Check Number")
        if(!emissionDate instanceof Date)
            throw new Error("Invalid emissionDate")
        if (!payDate instanceof Date)
            throw new Error("Invalid payDate")
        if (discountTax < 0 || discountTax > 1)
            throw new Error("Discount tax must be between 0 and 1")
        if (commission < 0 || commission > 1)
            throw new Error("Commission must be between 0 and 1")

        this.hash = hash                 
        this.txHash = txHash             
        this.fullName = fullName         
        this.nominalQty = nominalQty
        this.denomination = denomination 
        this.checkNumber = checkNumber   
        this.emissionDate = emissionDate  
        this.payDate = payDate           
        this.discountTax = discountTax
        this.commission = commission;
        this.expiration = payDate.diff(moment(), 'days')+1;
        this.netValue = () => this.nominalQty * (1 - this.commission);
        this.minValue = () => this.netValue() * (1 - (this.discountTax * this.expiration / YEAR));
    }
}

/**
 * Convert value to another currency given exchange rate
 * @param {*float} value: Value to convert (in currency1 units)
 * @param {*float} exchangeRate: 1 currency1 = exchangeRate currency2
 */
const convert = (value, exchangeRate) => value / exchangeRate

module.exports = {
    check,
    convert
}