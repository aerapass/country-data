// Take the csv and convert to json and tidy it up so that it is consistent.

import path from 'path'
import * as _ from 'underscore'
import csv from 'csv'
import canonicalJSON from 'canonical-json'
import fs from 'fs'

let output = []
const countriesFilename = 'countries.csv'
const deletedCountriesFilename = 'deleted_countries.csv'

const readFile = (filename) => {
    return new Promise((resolve) => {
        const csvFile = path.join(__dirname, filename)
        const parser = csv.parse({ columns: true })

        parser.on('readable', () => {
            var record = null
            while ((record = parser.read())) {
                output.push(record)
            }
        })

        parser.on('finish', () => {
            resolve(output)
        })

        fs.createReadStream(csvFile).pipe(parser)
    })
}

const countriesPromise = readFile(countriesFilename)
const deletedCountriesPromise = readFile(deletedCountriesFilename)

Promise.all([countriesPromise, deletedCountriesPromise]).then((results) => {
    output = _.sortBy(output, (i) => {
        return i.alpha2
    })

    // strip out fields that are not ready yet
    _.each(output, (country) => {
        delete country.ccTLD
    })

    // change the appropriate fields to be an array
    _.each(['currencies', 'countryCallingCodes', 'languages'], (key) => {
        _.each(output, (country) => {
            country[key] = country[key] ? country[key].split(',') : []
        })
    })

    // print out results to stdout
    console.log(canonicalJSON(output, null, 2))
})
