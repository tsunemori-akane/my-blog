import React, {
  createContext,
  ReactElement,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
  Dispatch,
} from 'react'

const ActiveAnchorContext = createContext('')
const SetActiveAnchorContext = createContext<
  Dispatch<SetStateAction<string>>
>(v => v)

// Separate the state as 2 contexts here to avoid
// re-renders of the content triggered by the state update.
export const useActiveAnchor = () => useContext(ActiveAnchorContext)
export const useSetActiveAnchor = () => useContext(SetActiveAnchorContext)

export const ActiveAnchorProvider = ({
  children
}: {
  children: ReactNode
}): ReactElement => {
  const [activeAnchor, setActiveAnchor] = useState('')
  return (
    <ActiveAnchorContext.Provider value={activeAnchor}>
      <SetActiveAnchorContext.Provider value={setActiveAnchor}>
        {children}
      </SetActiveAnchorContext.Provider>
    </ActiveAnchorContext.Provider>
  )
}
