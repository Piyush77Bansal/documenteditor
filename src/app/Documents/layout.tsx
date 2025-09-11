
interface layoutProps {
    children: React.ReactNode
}
const layout = ({children}:layoutProps) => {
  return (
    <div className="felx flex-col h-full bg-red-500">
        {children}
    </div>
  )
}

export default layout