import { api, Query } from "encore.dev/api";

interface SearchParams{
    filter: Query<string>
}
interface SearchRespone{
    matches: string
}
export const search = api<SearchParams, SearchRespone>(
    {
        method:'GET',
        path:'/greeting/search',
        expose: true
    },
    async ({filter}) => {
        return {matches: `Matched ${filter}`}
    }
)