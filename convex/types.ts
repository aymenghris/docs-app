import { UserIdentity } from 'convex/server'

export interface ExtendedUserIdentity extends UserIdentity {
    organization_id?: string
}
