
interface layoutProps {
    children: React.ReactNode
}
const layout = ({children}:layoutProps) => {
  return (
    <div className="felx flex-col h-full">
        {children}
    </div>
  )
}

export default layout