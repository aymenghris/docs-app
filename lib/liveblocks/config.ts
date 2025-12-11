export const LIVEBLOCKS_CONFIG = {
    throttle: 16, // Updates every 16ms (~60fps)
    authEndpoint: (documentId: string) => async () => {
        const res = await fetch('/api/liveblocks-auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ room: documentId }),
        })

        return res.json()
    },
} as const
