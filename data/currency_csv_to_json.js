'use strict'

// Take the csv and convert to json and tidy it up so that it is consistent.

const path = require('path')
const _ = require('underscore')
const csv = require('csv')
const canonicalJSON = require('canonical-json')
const fs = require('fs')

let output = []

// read in the CSV
const csvFile = path.join(__dirname, 'currencies.csv')
const input = fs.createReadStream(csvFile)

const parser = csv.parse({ columns: true })

parser.on('readable', () => {
    let record = null
    while ((record = parser.read())) {
        // convert decimals to and number
        record.decimals = parseInt(record.decimals)
        output.push(record)
    }
})

parser.on('finish', () => {
    // sort by code
    output = _.sortBy(output, (i) => {
        return i.code
    })

    // print out results to stdout
    console.log(canonicalJSON(output, null, 2))
})

input.pipe(parser)
