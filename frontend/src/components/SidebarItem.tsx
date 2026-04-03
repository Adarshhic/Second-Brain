

interface SidebarItemProps {
  icon: React.ReactNode
  label: string
  onClick?: () => void
}

const SidebarItem = ({ icon, label, onClick }: SidebarItemProps) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600
        hover:bg-slate-100 hover:text-gray-900 transition-colors
        text-sm font-medium w-full text-left"
    >
      {icon}
      {label}
    </button>
  )
}

export default SidebarItem