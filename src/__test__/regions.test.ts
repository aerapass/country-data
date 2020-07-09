import * as _ from 'underscore'
import { countries, regions } from '../'

test("check region's countries are known", () => {
    _.each(regions as any, (region: any) => {
        _.each(region.countries, (country: any) => {
            expect(countries[country]).toBeDefined()
        })
    })
})

test('check region countries exist', () => {
    let countriesAssigned = []

    _.each(regions as any, (region: any, name) => {
        if (!region.countries) {
            _.each(region[name].countries, (country) => {
                countriesAssigned.push(country)
            })
        }
    })

    countriesAssigned = countriesAssigned.sort()

    const duplicate = countriesAssigned.filter((value, index, array) => {
        delete array[index]
        return array.indexOf(value) !== -1
    })

    if (duplicate.length > 0) {
        console.log('duplicated: ', duplicate)
    }

    expect(duplicate.length === 0).toBeTruthy()
})

test('check all assigned countries are in regions', () => {
    const countriesAssigned = []
    const countriesAvailable = []

    _.each(regions as any, (region: any) => {
        _.each(region.countries, (country) => {
            countriesAssigned.push(country)
        })
    })

    _.each(countries.all, (country) => {
        if (country.status == 'assigned') {
            countriesAvailable.push(country.alpha2)
        }
    })

    const difference = _.difference(countriesAvailable, countriesAssigned)

    if (difference.length > 0) {
        console.log('unused: ', difference)
    }

    expect(difference.length === 0).toBeTruthy()
})
