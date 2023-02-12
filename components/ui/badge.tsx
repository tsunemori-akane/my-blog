export default function Badge({...props}) {
  const { badgeContent ,children} = props
  return (
    <div className="relative inline-block">
      <span 
        className="absolute inline-block top-0 left-full text-center leading-5 h-[20px] bg-red-500 text-white z-1 rounded-full px-2 -translate-x-2/4 -translate-y-1/2"
      >
        {badgeContent}
      </span>
      <div className="inline-block text-center">
        {children}
      </div>
    </div>
  )
}