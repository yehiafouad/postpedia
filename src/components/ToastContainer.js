import React from 'react'
import {DefaultToastContainer} from 'react-toast-notifications'

export default function ToastContainer({children, ...props}) {
  return (
    <DefaultToastContainer
      {...props}
      className={`${props.className} ${
        window.location.pathname.startsWith('/auth') ? '' : 'mt-20'
      }`}
    >
      {children}
    </DefaultToastContainer>
  )
}
