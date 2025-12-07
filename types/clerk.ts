export interface CustomSessionClaims {
    o?: {
        id: string
        slg?: string // organization slug
        rol?: string // organization role
        prm?: string[] // permissions
    }
}
