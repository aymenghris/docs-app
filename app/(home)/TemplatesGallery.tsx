'use client'

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel'
import { cn } from '@/lib/utils'
import { useConvexMutation } from '@convex-dev/react-query'
import { api } from '@convex/_generated/api'
import { templates } from '@home/templates'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

export const TemplatesGallery = () => {
    const router = useRouter()

    const { mutate: create, isPending: isCreating } = useMutation({
        mutationFn: useConvexMutation(api.documents.create),
        onSuccess: (documentId) => {
            void router.push(`/documents/${documentId}`)
        },
    })

    const handleCreateDocument = (title: string, initialContent: string) => {
        create({ title, initialContent })
    }

    return (
        <div className="bg-[#f1f3f4]">
            <div className="mx-auto flex max-w-screen-xl flex-col gap-y-4 px-16 py-6">
                <h3 className="font-medium first-letter:capitalize">
                    start a new document
                </h3>

                <Carousel className="w-full">
                    <CarouselContent className="-ml-4">
                        {templates.map((template) => (
                            <CarouselItem
                                key={template.id}
                                className={cn(
                                    'basis-1/2 pl-4',
                                    'sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 2xl:basis-1/7',
                                )}
                            >
                                <div
                                    className={cn(
                                        'flex flex-col gap-y-2.5',
                                        /**
                                         * 3/4 means the width will be three-fourths (75%) of the height, or the height will be four-thirds of the width
                                         * Think of it like a picture frame that is always taller than it is wide.
                                         */
                                        'aspect-[3/4]',
                                        isCreating &&
                                            'pointer-events-none opacity-50', // 'pointer-events-none' is used to make the element non-interactive
                                    )}
                                >
                                    <button
                                        disabled={isCreating}
                                        onClick={() =>
                                            handleCreateDocument(
                                                template.title,
                                                '',
                                            )
                                        }
                                        style={{
                                            backgroundImage: `url(${template.imageSrc})`,
                                        }}
                                        className={cn(
                                            'flex items-center justify-center gap-y-4',
                                            'size-full',
                                            'rounded-sm border bg-white bg-cover bg-center bg-no-repeat',
                                            'transition',
                                            'hover:border-blue-500 hover:bg-blue-50',
                                        )}
                                    />
                                    <p className="truncate text-sm font-medium capitalize">
                                        {template.title}
                                    </p>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </div>
    )
}
