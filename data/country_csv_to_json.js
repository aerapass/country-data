'use strict'

// Take the csv and convert to json and tidy it up so that it is consistent.

const path = require('path')
const _ = require('underscore')
const csv = require('csv')
const canonicalJSON = require('canonical-json')
const fs = require('fs')

let output = []
const countriesFilename = 'countries.csv'
const deletedCountriesFilename = 'deleted_countries.csv'

function readFile(filename) {
    return new Promise((resolve) => {
        const csvFile = path.join(__dirname, filename)
        const parser = csv.parse({ columns: true })

        parser.on('readable', () => {
            let record = null
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

Promise.all([countriesPromise, deletedCountriesPromise]).then(() => {
    output = _.sortBy(output, (i) => {
        return i.alpha2
    })

    // strip out fields that are not ready yet
    _.each(output, function (country) {
        delete country.ccTLD
    })

    // change the appropriate fields to be an array
    _.each(['currencies', 'countryCallingCodes', 'languages'], (key) => {
        _.each(output, function (country) {
            country[key] = country[key] ? country[key].split(',') : []
        })
    })

    // print out results to stdout
    console.log(canonicalJSON(output, null, 2))
})
