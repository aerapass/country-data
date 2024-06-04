/* eslint-disable @typescript-eslint/no-var-requires */
import * as _ from 'underscore'

export * from './continents'
export * from './regions'

const countriesAll = require('../data/countries.json')
const currenciesAll = require('../data/currencies.json')
const languagesAll = require('../data/languages.json')

const getSymbol = require('currency-symbol-map')

export interface Country {
    alpha2: string
    alpha3: string
    countryCallingCodes: string[]
    currencies: string[]
    emoji: string
    ioc: string
    languages: string[]
    name: string
    numeric: string
    status: 'assigned' | 'reserved' | 'user assigned' | 'deleted'
}

export interface CountryMap {
    [countryCode: string]: Country
}

export const countries: CountryMap & { all: Country[] } = {
    all: countriesAll,
}

export interface Currency {
    code: string
    decimals: number
    name: string
    number: string
    symbol: string
}

export interface CurrencyMap {
    [code: string]: Currency
}

export const currencies: CurrencyMap & { all: Currency[] } = {
    all: currenciesAll,
}

_.each(countriesAll, (country: Country) => {
    // prefer assigned country codes over inactive ones
    const exportedAlpha2 = countries[country.alpha2]
    if (!exportedAlpha2 || exportedAlpha2.status === 'deleted') {
        countries[country.alpha2] = country
    }

    const exportedAlpha3 = countries[country.alpha3]
    if (!exportedAlpha3 || exportedAlpha3.status === 'deleted') {
        countries[country.alpha3] = country
    }
})

_.each(currenciesAll, (currency: Currency) => {
    //If the symbol isn't available, default to the currency code
    let symbol = getSymbol(currency.code)
    if (symbol == '?') {
        symbol = currency.code
    }

    currency.symbol = symbol
    currencies[currency.code] = currency
})

export interface Language {
    alpha2: string
    alpha3: string
    bibliographic: string
    name: string
}

export interface LanguageMap {
    [code: string]: Language
}

export const languages: LanguageMap & { all: Language[] } = {
    all: languagesAll,
}

// Note that for the languages there are several entries with the same alpha3 -
// eg Dutch and Flemish. Not sure how to best deal with that - here whichever
// comes last wins.
_.each(languagesAll, (language: Language) => {
    languages[language.alpha2] = language
    languages[language.bibliographic] = language
    languages[language.alpha3] = language
})
