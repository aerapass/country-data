/* eslint-disable @typescript-eslint/no-var-requires */
import * as _ from 'underscore'
import { init } from './lookup'

export const continents = require('../data/continents')
export const regions = require('../data/regions')
export const countriesAll = require('../data/countries.json')
export const currenciesAll = require('../data/currencies.json')
export const languagesAll = require('../data/languages.json')

const getSymbol = require('currency-symbol-map')

export interface Currency {
    code: string
    decimals: number
    name: string
    number: string
    symbol: string
}

export interface Country {
    alpha2: string
    alpha3: string
    countryCallingCodes: string[]
    currencies: string[]
    ioc: string
    languages: string
    name: string
    status: 'assigned' | 'reserved' | 'user assigned' | 'deleted'
    numeric: string
}

export interface Language {
    alpha2: string
    alpha3: string
    bibliographic: string
    name: string
}

export interface CountryMap {
    [countryCode: string]: Country
}

export const countries: CountryMap & { all: Country[] } = {
    all: countriesAll,
}

export const currencies: { all: Currency[] } = {
    all: currenciesAll,
}

_.each(countriesAll, function (country: Country) {
    // prefer assigned country codes over inactive ones
    const exportedAlpha2 = countries[country.alpha2]
    if (!exportedAlpha2 || exportedAlpha2.status === 'deleted') {
        exports.countries[country.alpha2] = country
    }

    const exportedAlpha3 = exports.countries[country.alpha3]
    if (!exportedAlpha3 || exportedAlpha3.status === 'deleted') {
        exports.countries[country.alpha3] = country
    }
})

_.each(currenciesAll, function (currency: Currency) {
    //If the symbol isn't available, default to the currency code
    let symbol = getSymbol(currency.code)
    if (symbol == '?') {
        symbol = currency.code
    }

    currency.symbol = symbol
    exports.currencies[currency.code] = currency
})

export const languages = {
    all: languagesAll,
}

// Note that for the languages there are several entries with the same alpha3 -
// eg Dutch and Flemish. Not sure how to best deal with that - here whichever
// comes last wins.
_.each(languagesAll, function (language: Language) {
    exports.languages[language.alpha2] = language
    exports.languages[language.bibliographic] = language
    exports.languages[language.alpha3] = language
})

export const lookup = init({
    countries: countriesAll,
    currencies: currenciesAll,
    languages: languagesAll,
})

const callingCountries = { all: [] }

const callingCodesAll = _.reduce(
    countriesAll,
    function (codes, country: Country) {
        if (country.countryCallingCodes && country.countryCallingCodes.length) {
            callingCountries.all.push(country)

            callingCountries[country.alpha2] = country
            callingCountries[country.alpha3] = country

            _.each(country.countryCallingCodes, function (code) {
                if (codes.indexOf(code) == -1) {
                    codes.push(code)
                }
            })
        }
        return codes
    },
    []
)

export const callingCodes = {
    all: callingCodesAll,
}

delete callingCountries[''] // remove empty alpha3s
exports.callingCountries = callingCountries

callingCodesAll.sort(function (a, b) {
    const parse = function (str) {
        return parseInt(str)
    }
    const splitA = _.map(a.split(' '), parse)
    const splitB = _.map(b.split(' '), parse)

    if (splitA[0] < splitB[0]) {
        return -1
    } else if (splitA[0] > splitB[0]) {
        return 1
    } else {
        // Same - check split[1]
        if (splitA[1] === undefined && splitB[1] !== undefined) {
            return -1
        } else if (splitA[1] !== undefined && splitB[1] === undefined) {
            return 1
        } else if (splitA[1] < splitB[1]) {
            return -1
        } else if (splitA[1] > splitB[1]) {
            return 1
        } else {
            return 0
        }
    }
})
