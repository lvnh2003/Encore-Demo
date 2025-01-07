import {api} from 'encore.dev/api'

interface Respone{
    data: string
}
export const greeting = api(
    {
    method: 'GET',
    path: '/greeting/:name',
    expose: true
    },
    async ({name}:{name: string}): Promise<Respone> => {
        return {data: `Hello ${name}`};
    }
    
);