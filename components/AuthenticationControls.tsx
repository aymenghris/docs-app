import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'

export const AuthenticationControls = () => {
    return (
        <div className="flex items-center gap-3 pl-6">
            <OrganizationSwitcher
                afterCreateOrganizationUrl="/"
                afterLeaveOrganizationUrl="/"
                afterSelectOrganizationUrl="/"
                afterSelectPersonalUrl="/"
            />
            <UserButton />
        </div>
    )
}
