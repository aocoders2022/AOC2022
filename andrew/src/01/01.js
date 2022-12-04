import { map, sort, subtract, sum, takeLast } from "ramda"

export const sumTopNCalorieCounts = (inventories, n = 1) =>
    sum(takeLast(n, sort(subtract, map(sum, inventories))))
