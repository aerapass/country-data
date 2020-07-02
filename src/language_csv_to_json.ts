'use strict'

// Take the csv and convert to json and tidy it up so that it is consistent.

import path from 'path'
import * as _ from 'underscore'
import csv from 'csv'
import canonicalJSON from 'canonical-json'
import fs from 'fs'

let output = []

// read in the CSV
const csvFile = path.join(__dirname, 'languages.csv')
const input = fs.createReadStream(csvFile)

const parser = csv.parse({ columns: true })

parser.on('readable', function () {
    let record = null
    while ((record = parser.read())) {
        output.push(record)
    }
})

parser.on('finish', function () {
    // sort by alpha3
    output = _.sortBy(output, function (i) {
        return i.alpha3
    })

    // print out results to stdout
    console.log(canonicalJSON(output, null, 2))
})

input.pipe(parser)
