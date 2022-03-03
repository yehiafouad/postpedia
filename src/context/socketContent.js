import React from 'react'
import io from 'socket.io-client'
import Auth from '../config/auth'

const SocketContext = React.createContext()

export function useSocket() {
  return React.useContext(SocketContext)
}

export function SocketProvider({children}) {
  const [socket, setSocket] = React.useState()

  React.useEffect(() => {
    const URL =
      process.env.NODE_ENV !== 'production'
        ? process.env.REACT_APP_DEV_URL
        : process.env.REACT_APP_SERVER_URL

    const newSocket = io(URL, {query: {id: Auth.getUserId()}})
    setSocket(newSocket)

    return () => newSocket.close()
  }, [])

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  )
}
