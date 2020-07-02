import * as _ from 'underscore'
import { regions } from './regions.js'

export interface Continent {
    name: string
    regions: string[]
    countries: any[]
}

export interface Continents {
    asia: Continent
    africa: Continent
    northAmerica: Continent
    southAmerica: Continent
    antartica: Continent
    europe: Continent
    oceania: Continent
}

export const continents: Continents = {
    asia: {} as any,
    africa: {} as any,
    northAmerica: {} as any,
    southAmerica: {} as any,
    antartica: {} as any,
    europe: {} as any,
    oceania: {} as any,
}

continents.asia = {
    name: 'Asia',
    regions: ['centralAsia', 'southernAsia', 'southeastAsia', 'eastAsia', 'westernAsia'],
    countries: _.flatten([
        regions.centralAsia.countries,
        regions.southernAsia.countries,
        regions.southeastAsia.countries,
        regions.eastAsia.countries,
        regions.westernAsia.countries,
    ]).sort(),
}

continents.africa = {
    name: 'Africa',
    regions: ['centralAfrica', 'northAfrica', 'southernAfrica', 'eastAfrica', 'westAfrica'],
    countries: _.flatten([
        regions.centralAfrica.countries,
        regions.northAfrica.countries,
        regions.southernAfrica.countries,
        regions.eastAfrica.countries,
        regions.westAfrica.countries,
    ]).sort(),
}

continents.northAmerica = {
    name: 'North America',
    regions: ['centralAmerica', 'northernAmerica', 'caribbean'],
    countries: _.flatten([
        regions.centralAmerica.countries,
        regions.northernAmerica.countries,
        regions.caribbean.countries,
    ]).sort(),
}

continents.southAmerica = {
    name: 'South America',
    regions: ['southAmerica'],
    countries: _.flatten([regions.southAmerica.countries]).sort(),
}

continents.antartica = {
    name: 'Antartica',
    regions: ['antartica'],
    countries: _.flatten([regions.antartica.countries]).sort(),
}

continents.europe = {
    name: 'Europe',
    regions: ['northernEurope', 'southernEurope', 'easternEurope', 'westernEurope'],
    countries: _.flatten([
        regions.northernEurope.countries,
        regions.southernEurope.countries,
        regions.easternEurope.countries,
        regions.westernEurope.countries,
    ]).sort(),
}

continents.oceania = {
    name: 'Oceania',
    regions: ['australia', 'melanesia', 'micronesia', 'polynesia'],
    countries: _.flatten([
        regions.australia.countries,
        regions.melanesia.countries,
        regions.micronesia.countries,
        regions.polynesia.countries,
    ]).sort(),
}
