import Image from 'next/image'
import Link from 'next/link'

type GetCharactersResponse = {
  info: {
    count: number
    pages: number
    next_page: null | string
    prev_page: null | string
  }
  results: {
    id: number
    name: string
    img: string
    age: number
    height: string
    alias: string[]
    current_inheritor: string
    species: string[]
    gender: string
    relatives: {
      family: string
      members: string[]
    }[]
    birthplace: string
    residence: string
    status: 'alive' | 'alive'
    occupation: string
    groups: {
      name: string
      sub_groups: string[]
    }[]
    roles: string[]
    episodes: string[]
  }[]
}

export async function generateStaticParams() {
  const response = await fetch('https://api.attackontitanapi.com/characters')
  const data = (await response.json()) as GetCharactersResponse
  return [...new Array(data.info.pages)].map((_, ind) => ({
    slug: (ind + 1).toString(),
  }))
}

async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params
  const page = slug
  const response = await fetch(
    'https://api.attackontitanapi.com/characters?page=' + page
  )
  const data = (await response.json()) as GetCharactersResponse
  const characters = data.results
  const totalPage = data.info.pages
  return (
    <main className="p-20 flex flex-col gap-10 bg-gradient-to-r from-violet-100 to-fuchsia-100 relative min-h-screen">
      <h1 className="text-center text-[3rem] font-mono">
        Character Page {page}
      </h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {characters.map((character) => (
          <li
            key={character.name}
            className="bg-gradient-to-r from-purple-500 to-pink-500 flex flex-col items-center font-mono text-white p-10 rounded-lg gap-3 shadow-lg text-center"
          >
            <div className="w-[10rem]">
              {character.img && (
                <Image
                  src={character.img}
                  width={350}
                  height={350}
                  alt={character.name}
                  className={'rounded-lg'}
                />
              )}
            </div>
            <p>{character.name}</p>
            <p>{character.gender}</p>
          </li>
        ))}
      </ul>
      <Link
        href={
          page === '1' ? '/characters/1' : `/characters/${+(page || 2) - 1}`
        }
        className={`fixed top-[50vh] left-3 font-mono p-2 ${
          page === '1' ? 'hidden' : ''
        }`}
      >
        Prev
      </Link>
      <Link
        href={
          page === totalPage.toString()
            ? `/characters/${totalPage}`
            : `/characters/${+(page || 0) + 1}`
        }
        className={`fixed top-[50vh] right-3 font-mono p-2
    ${page === totalPage.toString() ? 'hidden' : ''}
    `}
      >
        Next
      </Link>
    </main>
  )
}

export default Page
