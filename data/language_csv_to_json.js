'use strict'

// Take the csv and convert to json and tidy it up so that it is consistent.

const path = require('path')
const _ = require('underscore')
const csv = require('csv')
const canonicalJSON = require('canonical-json')
const fs = require('fs')

let output = []

// read in the CSV
const csvFile = path.join(__dirname, 'languages.csv')
const input = fs.createReadStream(csvFile)

const parser = csv.parse({ columns: true })

parser.on('readable', () => {
    let record = null
    while ((record = parser.read())) {
        output.push(record)
    }
})

parser.on('finish', () => {
    // sort by alpha3
    output = _.sortBy(output, (i) => {
        return i.alpha3
    })

    // print out results to stdout
    console.log(canonicalJSON(output, null, 2))
})

input.pipe(parser)
