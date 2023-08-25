import { MessageCircle } from 'lucide-react'
import { useCurrentLesson, useStore } from '../zustand-store'
import { Header } from '../components/Header'
import { Video } from '../components/Video'
import { Module } from '../components/Module'
import { useEffect } from 'react'

export function Player() {
  const { course, load } = useStore((store) => {
    return {
      course: store.course,
      load: store.load,
    }
  })
  const { currentLesson } = useCurrentLesson()

  useEffect(() => {
    load()
  }, [load])

  useEffect(() => {
    if (currentLesson) {
      document.title = `Assistindo: ${currentLesson.title}`
    }
  }, [currentLesson])

  return (
    <div className="h-screen bg-zinc-950 flex text-zinc-50 justify-center items-center">
      <div className="flex w-[1100px] flex-col gap-6">
        <div className="flex items-center justify-between">
          <Header />

          <button className="flex items-center gap-2 rounded bg-violet-500 px-3 py-2 text-sm font-medium text-white duration-700 hover:bg-violet-600">
            <MessageCircle className="w-4 h-4" />
            Deixar feedback
          </button>
        </div>

        <main className="relative flex overflow-hidden rounded-lg border border-zinc-800 bg-zinc-800 shadow pr-80">
          <div className="flex-1">
            <Video />
          </div>
          <aside className="w-80 border-l divide-y-2 divide-zinc-900 absolute bottom-0 top-0 right-0 border-zinc-800 bg-zinc-800 overflow-y-scroll scrollbar scrollbar-thin scrollbar-track-zinc-950">
            {course?.modules &&
              course?.modules.map((module, index) => {
                return (
                  <Module
                    key={module.id}
                    moduleIndex={index}
                    title={module.title}
                    amountOfLessons={module.lessons.length}
                  />
                )
              })}
          </aside>
        </main>
      </div>
    </div>
  )
}
