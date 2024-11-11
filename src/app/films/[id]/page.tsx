// pages/films/[id].tsx
'use client'
import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store/store'
import { getFilmById, selectFilmById } from '@/store/features/filmsSlice'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import ErrorMessage from '@/components/common/ErrorMessage'
import Image from 'next/image'
import BlurImage from '@/components/common/BlurImage'

export default function FilmDetail() {
  const params = useParams()
  const id = params.id as string
  const dispatch = useDispatch<AppDispatch>()
  
  const film = useSelector((state: RootState) => selectFilmById(state, id))
  const loading = useSelector((state: RootState) => state.films.loading)
  const error = useSelector((state: RootState) => state.films.error)

  useEffect(() => {
    // Get the file
    if (id && !film) {
      dispatch(getFilmById(id))
    }
  }, [id, film, dispatch])

  // Cases

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error} />
  if (!film) return <ErrorMessage message="Film not found" />

  return (
    <div className="container mx-auto px-4 py-8">
      {/* <div className="max-w-4xl mx-auto">
        <div className="relative">
          <img
            src={film.poster_path}
            alt={film.original_title}
            className="w-full h-[500px] object-cover rounded-2xl shadow-xl mb-8"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-8">
            <h1 className="text-4xl font-bold text-white mb-2">
              {film.original_title}
            </h1>
            <div className="flex items-center space-x-4 text-white">
              <span>{new Date(film.release_date).getFullYear()}</span>
              <span>•</span>
              <span className="bg-purple-500 px-3 py-1 rounded-full">
                {film.vote_average.toFixed(1)}/10
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Synopsis</h2>
            <p className="text-gray-600 leading-relaxed">{film.overview}</p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Cast</h2>
            <div className="flex flex-wrap gap-2">
              {film.casts?.map((actor) => (
                <span
                  key={actor.id}
                  className="bg-gray-100 px-4 py-2 rounded-full text-gray-700 hover:bg-purple-100 transition-colors duration-300"
                >
                  {actor.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      */}

<div className="max-w-4xl mx-auto">
  <div className="relative">
    <div className="w-full h-[500px] relative rounded-2xl shadow-xl mb-8">
    <BlurImage
            src={film.poster_path}
            alt={film.original_title}
            className="w-full h-full"
          />
      {/* <Image
        src={film.poster_path}
        alt={film.original_title}
        fill
        className="object-cover rounded-2xl"
        priority
      /> */}
    </div>
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-8">
      <h1 className="text-4xl font-bold text-white mb-2">
        {film.original_title}
      </h1>
      <div className="flex items-center space-x-4 text-white">
        <span>{new Date(film.release_date).getFullYear()}</span>
        <span>•</span>
        <span className="bg-purple-500 px-3 py-1 rounded-full">
          {film.vote_average.toFixed(1)}/10
        </span>
      </div>
    </div>
  </div>

  <div className="bg-white rounded-xl shadow-lg p-8">
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Synopsis</h2>
      <p className="text-gray-600 leading-relaxed">{film.overview}</p>
    </div>

    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Cast</h2>
      <div className="flex flex-wrap gap-2">
        {film.casts?.map((actor) => (
          <span
            key={actor.id}
            className="bg-gray-100 px-4 py-2 rounded-full text-gray-700 hover:bg-purple-100 transition-colors duration-300"
          >
            {actor.name}
          </span>
        ))}
      </div>
    </div>
  </div>
</div>
    </div>
  )
}