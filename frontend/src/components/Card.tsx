import { Trash2 } from "lucide-react"
import axiosInstance from "../api/axiosInstance" 
import YouTubeIcon from "../Icons/Youtube"
import XIcon from "../Icons/XIcon"


interface CardProps {
  id: string
  title: string
  type: "youtube" | "twitter"
  link: string
  tags: { _id: string; title: string }[]
  createdAt: string
  onDelete?: (id: string) => void
}

const Card = ({ id, title, type, link, tags, createdAt, onDelete }: CardProps) => {

  const handleDelete = async () => {
   
    await axiosInstance.delete(`/content`, { data: { contentId: id } })
    onDelete?.(id)
  }

  const getEmbedUrl = (url: string) => {
    return url
      .replace("watch?v=", "embed/")
      .replace("youtu.be/", "www.youtube.com/embed/")
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric", month: "short", day: "numeric",
    })
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow">

      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          {type === "youtube" ? <YouTubeIcon /> : <XIcon />}
          <span className="font-semibold text-sm text-gray-800 line-clamp-2">{title}</span>
        </div>
        {onDelete && (
          <button
            onClick={handleDelete}
            className="text-gray-400 hover:text-red-500 transition-colors ml-2 shrink-0"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>

      {/* Embed */}
      {type === "youtube" && (
        <div className="rounded-lg overflow-hidden">
          <iframe
            className="w-full aspect-video"
            src={getEmbedUrl(link)}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      {type === "twitter" && (
        <div className="rounded-lg overflow-hidden bg-gray-50 p-2">
          <blockquote className="twitter-tweet">
            <a href={link.replace("x.com", "twitter.com")} />
          </blockquote>
        </div>
      )}

      {/* Tags */}
      {tags?.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {tags.map((tag) => (
            <span key={tag._id}
              className="bg-purple-100 text-purple-700 text-xs px-2 py-0.5 rounded-full">
              #{tag.title}
            </span>
          ))}
        </div>
      )}

      {/* Date */}
      <p className="text-xs text-gray-400">{formatDate(createdAt)}</p>
    </div>
  )
}

export default Card