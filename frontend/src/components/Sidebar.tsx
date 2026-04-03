import { ComplexIcon } from "../Icons/ComplexIcon"
import { Twitter } from "../Icons/Twitter"
import { Video } from "../Icons/Video"
import { Document } from "../Icons/Document"
import { Link } from "../Icons/Link"
import { Tag } from "../Icons/Tag"

const Sidebar = () => {
  return (
    <div className="flex flex-col h-full p-4 gap-6">

      {/* Logo */}
      <div className="flex items-center gap-2 px-2 pt-2">
        <ComplexIcon />
        <span className="text-lg font-bold text-gray-800">Second Brain</span>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1">
        {[
          { icon: <Twitter />, label: "Twitter" },
          { icon: <Video />, label: "Videos" },
          { icon: <Document />, label: "Documents" },
          { icon: <Link />, label: "Links" },
          { icon: <Tag />, label: "Tags" },
        ].map(({ icon, label }) => (
          <button
            key={label}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600
              hover:bg-slate-100 hover:text-gray-900 transition-colors text-sm font-medium w-full text-left"
          >
            {icon}
            {label}
          </button>
        ))}
      </nav>
    </div>
  )
}

export default Sidebar