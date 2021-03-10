import React, { useState, useEffect } from "react"

const HOST_NAME = "https://hacker-news.firebaseio.com"

const ListItem = ({ id }) => {
  const [story, setStory] = useState({})

  const fetchStory = async () => {
    const res = await fetch(`${HOST_NAME}/v0/item/${id}.json`)
    res.json().then((res) => setStory(res))
  }

  useEffect(() => {
    fetchStory()
  }, [])

  const formatDate = (date) => {
    if (!date) return ""
    return new Intl.DateTimeFormat("fi-FI").format(new Date(date * 1000))
  }

  return (
    <article className="p-4 flex space-x-4">
      <div className="min-w-0 relative flex-auto sm:pr-20 lg:pr-0 xl:pr-20">
        <h2 className="text-lg font-semibold text-black mb-0.5">
          {story.title}
        </h2>
        <dl className="flex flex-wrap text-sm font-medium whitespace-pre">
          <div>
            <dt className="sr-only">Created</dt>
            <dd>{formatDate(story.time)}</dd>
          </div>
          {" - By "}
          <div className="flex text-green-500">{story.by}</div>
          <div className="absolute top-0 right-0 rounded-full bg-teal-100 text-teal-900 leading-5 px-2 py-0.5 hidden sm:flex lg:hidden xl:flex items-center space-x-1">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M12 5v14M18 11l-6-6M6 11l6-6" />
            </svg>

            {story.score}
          </div>
        </dl>
      </div>
    </article>
  )
}

export default ListItem
