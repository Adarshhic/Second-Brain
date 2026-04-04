import { useState } from "react"
import axios from "axios"
import axiosInstance from "../api/axiosInstance"   
import { CrossIcon } from "../Icons/CrossIcon"
import Button from "../components/button"

interface CreateContentProps {
  open: boolean
  onClose: () => void
  title: string
  setTitle: (v: string) => void
  link: string
  setLink: (v: string) => void
  type: string
  setType: (v: string) => void
  tags: string
  setTags: (v: string) => void
  setContentBoxOpen: (v: boolean) => void
}

const contentTypes = ["youtube", "twitter"]

const CreateContent = ({
  open, onClose,
  title, setTitle,
  link, setLink,
  type, setType,
  tags, setTags,
}: CreateContentProps) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async () => {
    if (!title || !link || !type) {
      setError("Please fill all fields and select a type.")
      return
    }
    try {
      setLoading(true)
      setError("")
      const tagsArray = tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
      await axiosInstance.post("/content", { title, link, type, tags: tagsArray })

      setTitle("")
      setLink("")
      setType("")
      setTags("")
      onClose()
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err?.response?.data?.message || "Failed to add content.")
      } else {
        setError("Something went wrong.")
      }
    } finally {
      setLoading(false)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 p-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg font-semibold text-gray-800">Add Content</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <CrossIcon />
          </button>
        </div>

        <div className="flex flex-col gap-4">

          {/* Title */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm
                focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Link */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">Link</label>
            <input
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="Enter URL"
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm
                focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Tags */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">Tags (comma separated)</label>
            <input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g. react, javascript"
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm
                focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Type */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-600">Type</label>
            <div className="flex gap-2">
              {contentTypes.map((t) => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors
                    ${type === t
                      ? "bg-black text-white border-black"
                      : "bg-white text-gray-600 border-gray-300 hover:border-gray-500"
                    }`}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {error && <p className="text-xs text-red-500">{error}</p>}

          {/* Actions */}
          <div className="flex gap-2 pt-1">
            <Button variant="secondary" text="Cancel" onClick={onClose} fullWidth />
            <Button variant="primary" text="Add" onClick={handleSubmit} loading={loading} fullWidth />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateContent