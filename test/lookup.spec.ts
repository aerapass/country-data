import * as _ from 'underscore'
import { countries, currencies, languages, lookup } from '../src/index'

test('check countries by currency', () => {
    _.each(countries, (country) => {
        _.each(country.currencies, (currency) => {
            expect(lookup.countries({ currencies: currency }).includes(country)).toBeTruthy()
        })
    })
})

test('check countries by name', () => {
    _.each(countries, (country) => {
        if (country.name) expect(lookup.countries({ name: country.name }).includes(country)).toBeTruthy()
    })
})

test('check currencies by code', () => {
    _.each(currencies, (currency) => {
        if (currency.code) expect(lookup.currencies({ code: currency.code }).includes(currency)).toBeTruthy()
    })
})

test('check languages by name', () => {
    _.each(languages, (language) => {
        if (language.name) expect(lookup.languages({ name: language.name }).includes(language)).toBeTruthy()
    })
})
