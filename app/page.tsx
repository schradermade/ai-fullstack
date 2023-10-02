import Link from 'next/link'
import { auth } from '@clerk/nextjs'

export default async function Home() {
  const { userId } = await auth()
  let href = userId ? '/journal' : '/new-user'

  return (
    <div className="w-screen h-screen bg-black flex items-center text-white">
      <div className="max-w-[500px] mx-auto ">
        <h1 className="text-6xl mb-4">Journal App</h1>
        <p className="text-2xl text-white/60 mb-4">
          Write in your journal and let AI analyze and track your mood over
          time!
        </p>
        <div>
          <Link href={href}>
            <button className="bg-blue-600 px-4 py-2 rounded-lg text-xl">
              get started
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
