import { parseAsString, useQueryState } from "nuqs"

export function useSearchParam(key: string) {
    return useQueryState(key, parseAsString.withDefault('').withOptions({
        clearOnDefault: true
    }))
}