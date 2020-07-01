import * as _ from 'underscore'

export function init(o: any): any {
    return {
        countries: search.bind(null, o.countries),
        currencies: search.bind(null, o.currencies),
        languages: search.bind(null, o.languages),
    }
}

function search(data, query) {
    const q = _.pairs(query)

    return data.filter((d) => {
        return (
            q.filter((v) => {
                const prop = d[v[0]]

                if (_.isArray(prop)) return prop.indexOf(v[1]) >= 0

                return prop == v[1]
            }).length == q.length
        )
    })
}
