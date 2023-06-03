import Link from 'next/link'

export default function Home() {
  return (
    <main className="grid place-content-center h-screen place-items-center font-mono gap-4">
      <h1 className="text-gradient text-[3rem] whitespace-nowrap">
        Attack on Titans API Demo
      </h1>
      <Link href="/characters/1" className="text-xl">
        Go to Character
      </Link>
      <Link href="/titans" className="text-xl">
        Go to Titan
      </Link>
    </main>
  )
}
