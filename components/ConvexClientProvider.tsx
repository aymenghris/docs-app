'use client'

import { ReactNode } from 'react'
import { FullScreenLoader } from '@/components/FullScreenLoader'
import { ClerkProvider, SignIn, useAuth } from '@clerk/nextjs'
import { ConvexQueryClient } from '@convex-dev/react-query'
import { QueryClient } from '@tanstack/query-core'
import { QueryClientProvider } from '@tanstack/react-query'
import {
    Authenticated,
    AuthLoading,
    ConvexReactClient,
    Unauthenticated,
} from 'convex/react'
import { ConvexProviderWithClerk } from 'convex/react-clerk'

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

const convexQueryClient = new ConvexQueryClient(convex)
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            queryKeyHashFn: convexQueryClient.hashFn(),
            queryFn: convexQueryClient.queryFn(),
        },
    },
})
convexQueryClient.connect(queryClient)

export function ConvexClientProvider({ children }: { children: ReactNode }) {
    return (
        <ClerkProvider>
            <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
                <QueryClientProvider client={queryClient}>
                    <Authenticated>{children}</Authenticated>
                    <Unauthenticated>
                        <div className="flex min-h-screen flex-col items-center justify-center">
                            <SignIn routing="hash" />
                        </div>
                    </Unauthenticated>
                    <AuthLoading>
                        <FullScreenLoader label="Authenticating..." />
                    </AuthLoading>
                </QueryClientProvider>
            </ConvexProviderWithClerk>
        </ClerkProvider>
    )
}
