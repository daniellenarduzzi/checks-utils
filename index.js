const YEAR = 360

/**
 * @function Creates a New check object with calculations functionality
 * @param {*float} nominalValue: Nominal value of the check.
 * @param {*float} commision: Comissions percibed, value between 0 and 1.
 * @param {*uint} expiration: Expiration term in days.
 * @param {*float} discountTax: Discount tax, value between 0 and 1.
 */
class check {
    constructor(nominalValue, commision, expiration, discountTax) {
        
        if(nominalValue < 0)
            throw new Error("Nominal value must greater than 0")
        this.nominalValue = nominalValue
        
        if(commision < 0 || commision > 1)
            throw new Error("Commision must be between 0 and 1")
        this.commision = commision;
        
        if(expiration < 0) 
            throw new Error("Expiration must greater than 0")
        this.expiration = expiration;
        
        if(discountTax < 0 || discountTax > 1) 
            throw new Error ("Discount tax must be between 0 and 1")
        this.discountTax = discountTax;
        this.netValue = () => this.nominalValue * (1 - this.commision);
        this.minValue = () => this.netValue() * (1 - (this.discountTax * this.expiration / YEAR));
    }
}


/**
 * Convert value to another currency given exchange rate
 * @param {*} value: Value to convert
 * @param {*} exchangeRate: Price of currency in terms of exchanged currency
 */
const convert = (value, exchangeRate) => value / exchangeRate

module.exports = {
    check,
    convert
}