'use strict'

// Take the csv files and convert them to standard format

const path = require('path')
const _ = require('underscore')
const csv = require('csv')
const fs = require('fs')

const firstHeader = process.argv[2]

let output = []

// read in the CSV
const input = process.stdin

const parser = csv.parse({ columns: true })

parser.on('readable', () => {
    let record = null
    while ((record = parser.read())) {
        output.push(record)
    }
})

parser.on('finish', () => {
    output = _.sortBy(output, (i) => {
        return i[firstHeader].toLowerCase()
    })

    const headers = _.keys(output[0])
    const remaining = _.without(headers, firstHeader)
    const columns = _.flatten([firstHeader, remaining.sort()])

    csv.stringify(output, { header: true, columns: columns }, (err, string) => {
        process.stdout.write(string)
    })
})

input.pipe(parser)
