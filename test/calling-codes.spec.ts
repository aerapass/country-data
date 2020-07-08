import { countries } from '../src/index'
import * as _ from 'underscore'

_.each(countries, (country) => {
    if (country.countryCallingCodes && country.countryCallingCodes.length) {
        test('should contain codes for ' + country.name, () => {
            expect(country.countryCallingCodes).toBeDefined()
        })
    }
})

test('should contain countries with calling codes', () => {
    const country = countries.all.find((country) => country.name === 'Germany')
    expect(country.countryCallingCodes).toEqual(['+49'])
})
