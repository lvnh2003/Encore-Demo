import { randomBytes } from "crypto"
import { api } from "encore.dev/api"

interface UrlRespone{
    id: string
    url: string
}

interface UrlParams{
    url: string
}

export const shorten = api({
    method: 'POST',
    path: '/url',
    expose: true
},
async ({url}: UrlParams): Promise<UrlRespone> => {
    const id = randomBytes(6).toString('base64url');
    return {id, url};
});