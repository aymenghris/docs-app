import { Navbar } from '@home/Navbar'

const Home = () => {
    return (
        <div className="flex min-h-screen flex-col">
            <div className="fixed inset-x-0 top-0 z-10 h-16 bg-white p-4">
                <Navbar />
            </div>
            <div className="mt-16">Home</div>
        </div>
    )
}

export default Home
