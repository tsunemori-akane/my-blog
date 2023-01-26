import { Draggable } from "#/components/ui/Draggable"

export default function PlaygroundPage() {
  return (
    <div 
      className="flex-1 bg-gradient-to-t from-[#accbee] to-[#e7f0fd]"
    >
      <Draggable className="left-1/2 top-2/4 -translate-x-2/4 -translate-y-1/2">
        <button className="flex items-center rounded-full bg-cyan-500 text-stone-200 font-bold px-4 py-2 outline-0">
          <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4"><path d="M0 0v1024h1024V0H0z m690.624 28.16h303.936v303.872h-303.936V28.16z m0 331.2h303.936v303.872h-303.936V359.36z m-357.376 636.864H29.312v-303.872h303.936v303.872z m0-332.992H29.312V359.36h303.936v303.872z m0-331.2H29.312V28.16h303.936v303.872z m330.688 664.32H360V692.48h303.936v303.872z m0-664.32H360V28.16h303.936v303.872z m330.688 664.256h-304v-303.872h304v303.872z" fill="#e7e5e4"></path></svg>
          &nbsp;2048
        </button>
      </Draggable>
    </div>
  )
}