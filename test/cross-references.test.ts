import * as _ from 'underscore'
import { countries } from '../src/index'

test('cross references', () => {
    const assertValidReferences = (referenceListName, referenceIdKey, listName, listKey) => {
        const country = countries.all.find((country) => country[referenceListName] === referenceIdKey)
        return _.keys(country).includes(listName, listKey)
    }

    expect(assertValidReferences('alpha2', 'DE', 'currencies', 'languages')).toBeTruthy()
})
