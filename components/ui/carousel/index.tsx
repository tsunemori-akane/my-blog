import React, { forwardRef, useState } from "react"
import { cn } from "#/lib/utils";
import styles from './carousel.module.css'

const MAX_VISIBILITY = 3;

const Dots = ({count, ...props}) => {
  let dots = []
  for(let i = 0; i < count; i++) {
    let dotOptions = {
      type: "dots",
      dotIndex: i,
      count,
      ...props
    }
    dots = dots.concat(
      <li key={i} className="list-none mb-6 last:mb-0">
        <button 
          className={cn("hover:scale-[1.8] w-3 h-3 text-[0px] outline-0 rounded-full border-2 border-slate-400 bg-slate-200 transition-all duration-300", 
            props.currentSlide==i && "scale-[1.8]"
          )}
          onClick={()=> props.changeSlide(dotOptions)}
        >
          {i+1}
        </button>
      </li>
    )
  }
  return (
    <>
      <ul className="absolute top-1/2 -right-14 -translate-y-2/4">
        { dots }
      </ul>
    </>
  )
}

export const Carousel = forwardRef(
  (
    {...props}, 
    ref
  ) => {

  let count = React.Children.count(props.children)
  let child = React.Children.toArray(props.children);
  //children may contain false or null, so we should filter them 
  //children may also contain string filled with spaces
  child = child.filter(child => {
    if(typeof child === "string") {
      return !!child.trim()
    }
    return !!child
  })
  const [currentSlide, setCurrentSlide] = useState(0);

  const changeSlide = ({type, currentSlide, dotIndex=0, count, ...props}) => {
    let targetSlide
    if(dotIndex >= 0 && type == "dots") {
      targetSlide = dotIndex
    } else {
      if(type == "prev") {
        targetSlide = currentSlide - 1 < 0 
          ? (count - currentSlide - 1) % count 
          : currentSlide - 1
      } else if(type == "next") {
        targetSlide = (currentSlide + 1) % count
      }
    }
  
    setCurrentSlide(targetSlide);
  }

  return (
    <>
      <div className={cn("relative", styles.carousel_container)}>
        {child.map((e, i) => (
            <div
              key={i}
              className={cn(
                "w-full h-full absolute",{
                  "hidden" : Math.abs(currentSlide-i) >= MAX_VISIBILITY,
                  "pointer-events-none" : currentSlide !== i,
                  "cursor-pointer" : currentSlide == i
                },
                styles.card_container
              )}
              style={{
                "--offset": (currentSlide - i) / 3,
                "--abs-offset": Math.abs(currentSlide - i) / 3,
                "--direction": Math.sign(currentSlide - i),
              }}
            >
              {e}
            </div>
          )
        )}
        <Dots count={count} currentSlide={currentSlide} changeSlide={changeSlide} />
      </div>
    </>
  )
})
