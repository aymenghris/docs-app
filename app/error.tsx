'use client'

import { FC } from 'react'
import { Button } from '@/components/ui/button'
import { AlertCircle, Home, RefreshCw } from 'lucide-react'
import Link from 'next/link'

interface ErrorPageProps {
    error: Error & { digest?: string }
    reset: () => void
}

const ErrorPage: FC<ErrorPageProps> = ({ error, reset }) => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center space-y-6">
            <div className="space-y-4 text-center">
                {/* Icon */}
                <div className="mb-6 flex justify-center">
                    <div className="rounded-full bg-red-100 p-3">
                        <AlertCircle className="size-10 text-rose-600" />
                    </div>
                </div>

                <div className="space-y-2">
                    {/* Title */}
                    <h2 className="text-xl font-semibold text-gray-900">
                        Something went wrong
                    </h2>

                    {/* Description */}
                    <p className="mb-8 text-center text-slate-600">
                        We encountered an unexpected error. This has been logged
                        and we'll look into it.
                    </p>

                    {/* Error Details (Development only) */}
                    {process.env.NODE_ENV === 'development' && (
                        <div className="mb-8 rounded-lg border border-slate-200 bg-slate-50 p-4">
                            <p className="mb-2 text-sm font-semibold text-slate-700">
                                Error Details (dev only):
                            </p>
                            <p className="font-mono text-sm break-all text-slate-600">
                                {error.message}
                            </p>
                            {error.digest && (
                                <p className="mt-2 text-xs text-slate-500">
                                    Digest: {error.digest}
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Button
                    variant="secondary"
                    size="icon-secondary"
                    onClick={reset}
                >
                    <RefreshCw className="size-5" />
                    Try Again
                </Button>

                <Button
                    variant="secondary"
                    size="icon-secondary"
                    className="bg-slate-200 text-slate-700 hover:bg-slate-300"
                    asChild
                >
                    <Link href="/">
                        <Home className="size-5" />
                        Go Home
                    </Link>
                </Button>
            </div>
        </div>
    )
}

export default ErrorPage
