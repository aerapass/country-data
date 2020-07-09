import * as _ from 'underscore'
import { currencies } from '../'

test('currencies should be an array', () => {
    expect(currencies.all).toBeInstanceOf(Array)
})

test('should find USD', () => {
    expect(currencies.USD.name).toEqual('United States dollar')
})

test('decimals should be numbers', () => {
    expect(currencies.USD.decimals).toEqual(2)
})

test('should find $', () => {
    expect(currencies.USD.symbol).toEqual('$')
})

test('should find ¥', () => {
    expect(currencies.JPY.symbol).toEqual('¥')
})

test('should find R', () => {
    expect(currencies.ZAR.symbol).toEqual('R')
})

test('should find AED (has no symbol)', () => {
    expect(currencies.AED.symbol).toEqual('د.إ')
})
