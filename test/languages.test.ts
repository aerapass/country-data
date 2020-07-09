import * as _ from 'underscore'
import { languages } from '../src/index'

test('languages should be an array', () => {
    expect(languages.all).toBeInstanceOf(Array)
})

test('should find English and German by alpha2', () => {
    expect(languages.en.name).toEqual('English')
    expect(languages.de.name).toEqual('German')
})

test('should find English and German by alpha3', () => {
    expect(languages.eng.name).toEqual('English')
    expect(languages.deu.name).toEqual('German')
})
