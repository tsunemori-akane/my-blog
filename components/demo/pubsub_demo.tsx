import PubSub from "#/lib/pub_sub";
import Badge from "../ui/badge";
import { useReducer, useRef, useState, useEffect, useCallback} from "react";

const pubsub = new PubSub()

export default function PubSubDemo() {
  
  const [needReset, setNeedReset] = useState(false)

  return (
    <div className="relative flex flex-col items-center justify-center">
      { !needReset && <CountSubscriber /> }
      { needReset && <CountSubscriber /> }
      <div className="mt-6">
        <button 
          className="leading-[20px] text-center rounded-full bg-blue-300 py-1 px-2 text-white"
            onClick={ () => { pubsub.publish('notify', '')}
          }
        >
          publish
        </button>
        <button 
          className="leading-[20px] ml-4 text-center rounded-full bg-blue-300 py-1 px-2 text-white"
            onClick={ () => { setNeedReset(!needReset) }
          }
        >
          reset
        </button>
      </div>
    </div>
  )
}

function CountSubscriber({...props}) {
  const [subCount, dispatch] = useReducer(x=> x+1, 0)
  const [subCountOnce, dispatchOnce] = useReducer(x=> x+1, 0)
  const token = useRef(null)

  useEffect(()=>{
    token.current = pubsub.subscribe('notify', dispatch)
    //In development mode when reactStrictMode is true, subscribeOnce will be execute twice 
    pubsub.subscribeOnce('notify', dispatchOnce)
    return () =>{
      pubsub.unsubscribe(token.current)
    }
  }, [])
  return (
    <div className="inline-flex justify-around border-blue-200 rounded border-2 outline outline-offset-4 outline-blue-300">
      <div className="inline-flex flex-col items-center py-4 px-8">
        <Badge badgeContent={subCount}>
          <svg viewBox="0 0 1024 1024" className="w-6 h-6">
            <path d="M938.533541 851.469579l-33.547582-51.120125c-4.792512-7.98752-7.98752-17.572543-7.987519-25.560062V434.521061c0-97.447738-43.132605-186.907956-119.812793-255.600624-60.705148-59.107644-137.385335-94.25273-222.053042-102.24025V43.132605C555.132605 17.572543 537.560062 0 512 0s-43.132605 17.572543-43.132605 43.132605v33.547582H464.074883C273.971919 97.447738 128.599064 255.600624 128.599064 439.313573v332.280811c0 17.572543-1.597504 17.572543-6.390016 27.157566l-31.950078 54.315133c-12.780031 17.572543-12.780031 43.132605 0 59.107644 7.98752 17.572543 30.352574 25.560062 46.327613 25.560062h332.280812v43.132606c0 23.962559 19.170047 43.132605 41.535101 43.132605 23.962559 0 43.132605-19.170047 43.132605-43.132605v-43.132606h332.280812c20.767551 0 38.340094-7.98752 51.120124-25.560062 9.585023-22.365055 9.585023-43.132605 1.597504-60.705148z m-750.826833 0l7.98752-12.780031c7.98752-17.572543 17.572543-38.340094 17.572543-59.107645V439.313573c0-140.580343 110.227769-260.393136 260.393135-276.368175 89.460218-7.98752 178.920437 17.572543 247.613105 76.680187 59.107644 51.120125 89.460218 119.812793 89.460218 196.49298v340.26833c0 25.560062 7.98752 51.120125 20.767551 71.887676l4.792512 4.792512H187.706708z" fill="#1296db"></path>
          </svg>
        </Badge>
        <button 
          className="block mx-auto leading-[20px] text-center rounded-full bg-blue-300 py-1 px-2 text-white"
          onClick={() => { pubsub.unsubscribe(token.current) }}
        >
          unsubscribe
        </button>
      </div>
      <div className="inline-flex flex-col items-center py-4 px-8">
        <Badge badgeContent={subCountOnce}>
          <svg viewBox="0 0 1024 1024" className="w-6 h-6">
            <path d="M938.533541 851.469579l-33.547582-51.120125c-4.792512-7.98752-7.98752-17.572543-7.987519-25.560062V434.521061c0-97.447738-43.132605-186.907956-119.812793-255.600624-60.705148-59.107644-137.385335-94.25273-222.053042-102.24025V43.132605C555.132605 17.572543 537.560062 0 512 0s-43.132605 17.572543-43.132605 43.132605v33.547582H464.074883C273.971919 97.447738 128.599064 255.600624 128.599064 439.313573v332.280811c0 17.572543-1.597504 17.572543-6.390016 27.157566l-31.950078 54.315133c-12.780031 17.572543-12.780031 43.132605 0 59.107644 7.98752 17.572543 30.352574 25.560062 46.327613 25.560062h332.280812v43.132606c0 23.962559 19.170047 43.132605 41.535101 43.132605 23.962559 0 43.132605-19.170047 43.132605-43.132605v-43.132606h332.280812c20.767551 0 38.340094-7.98752 51.120124-25.560062 9.585023-22.365055 9.585023-43.132605 1.597504-60.705148z m-750.826833 0l7.98752-12.780031c7.98752-17.572543 17.572543-38.340094 17.572543-59.107645V439.313573c0-140.580343 110.227769-260.393136 260.393135-276.368175 89.460218-7.98752 178.920437 17.572543 247.613105 76.680187 59.107644 51.120125 89.460218 119.812793 89.460218 196.49298v340.26833c0 25.560062 7.98752 51.120125 20.767551 71.887676l4.792512 4.792512H187.706708z" fill="#1296db"></path>
          </svg>
        </Badge>
        <span 
          className="block mx-auto leading-[20px] text-center rounded-full py-1 px-2"
        >
          subscribeOnce
        </span>
      </div>
    </div>
  )
}