'use client'
import { createContext, useState } from 'react'

export const ChildContext = createContext(null)

export function ChildProvider({ children }) {
  const [childInfo, setChildInfo] = useState(null)
  
  return (
    <ChildContext.Provider value={{ childInfo, setChildInfo }}>
      {children}
    </ChildContext.Provider>
  )
}