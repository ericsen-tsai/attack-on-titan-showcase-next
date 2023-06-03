import TitansShowCase from '@/components/TitansShowCase'
import type { GetTitansResponse } from '../../types'

async function Page() {
  const response = await fetch('https://api.attackontitanapi.com/titans?page=1')
  const data = (await response.json()) as GetTitansResponse
  const titans = data.results
  return (
    <main className="p-20 flex flex-col gap-10 bg-gradient-to-r from-violet-100 to-fuchsia-100 relative min-h-screen">
      <h1 className="text-center text-[3rem] font-mono">Titan Info</h1>
      <TitansShowCase titans={titans} />
    </main>
  )
}

export default Page
