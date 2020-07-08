import { countries, currencies, languages } from '../src/index'
import * as _ from 'underscore'

test('countries should be an array', () => {
    expect(countries.all).toBeInstanceOf(Array)
})

test('should find country by alpha2', () => {
    expect(countries.US.name).toEqual('United States')
})

test('should prefer assigned alpha2 country codes', () => {
    expect(countries.SK.name).toEqual('Slovakia')
})

test('should find country by alpha3', () => {
    expect(countries.FRA.name).toEqual('France')
    expect(countries.FRA.currencies).toEqual(['EUR'])
})

_.each(countries.all, (country) => {
    test('should have a status', () => {
        expect(country.status).toBeDefined()
    })
    test('should have correctly formed alpha2 and alpha3', () => {
        expect(country.alpha2.match(/^[A-Z]{2}$/)).toBeTruthy()
        if (country.alpha3.length) {
            expect(country.alpha3.match(/^[A-Z]{3}$/)).toBeTruthy()
        }
    })
})

_.each(countries.all, (country) => {
    _.each(country.currencies, (currency) => {
        test('check currencies for each country', () => {
            expect(currencies[currency]).toBeDefined()
        })
    })
})

test('check specific country currencies', () => {
    expect(countries.LV.currencies).toEqual(['EUR'])
})

test('check emoji for a specific country', () => {
    expect(countries.FI.emoji).toEqual(String.fromCharCode(55356, 56811, 55356, 56814))
})

_.each(countries.all, (country) => {
    _.each(country.languages, (language) => {
        test('check languages for each country', () => {
            expect(languages[language]).toBeDefined()
        })
    })
})
