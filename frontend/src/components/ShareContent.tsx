import { useState } from "react"
import axios from "axios"
import axiosInstance from "../api/axiosInstance"  
import { CrossIcon } from "../Icons/CrossIcon"
import Button from "../components/button"
import { Copy, Check } from "lucide-react"

interface ShareContentProps {
  shareBoxOpen: boolean
  setShareBoxOpen: (v: boolean) => void
}

const ShareContent = ({ shareBoxOpen, setShareBoxOpen }: ShareContentProps) => {
  const [shareLink, setShareLink] = useState("")
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState("")

  const handleShare = async () => {
    try {
      setLoading(true)
      setError("")
      const res = await axiosInstance.post("/brain/share", { share: true })
      const hash = res.data.hash
      setShareLink(`${window.location.origin}/sharedDashboard/${hash}`)
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err?.response?.data?.message || "Failed to generate share link.")
      } else {
        setError("Something went wrong.")
      }
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(shareLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!shareBoxOpen) return null

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 p-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg font-semibold text-gray-800">Share Your Brain</h2>
          <button onClick={() => setShareBoxOpen(false)} className="text-gray-400 hover:text-gray-600">
            <CrossIcon />
          </button>
        </div>

        <p className="text-sm text-gray-500 mb-4">
          Generate a public link to share your entire brain with others.
        </p>

        {error && <p className="text-xs text-red-500 mb-3">{error}</p>}

        {shareLink ? (
          <div className="flex items-center gap-2 border border-gray-200 rounded-lg p-3 bg-gray-50">
            <p className="text-xs text-gray-700 break-all flex-1">{shareLink}</p>
            <button
              onClick={handleCopy}
              className="shrink-0 text-gray-500 hover:text-black transition-colors"
            >
              {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
            </button>
          </div>
        ) : (
          <Button
            variant="primary"
            text="Generate Link"
            onClick={handleShare}
            loading={loading}
            fullWidth
          />
        )}
      </div>
    </div>
  )
}

export default ShareContent