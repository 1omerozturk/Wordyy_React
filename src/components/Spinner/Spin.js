import React from 'react'
import Spinner from 'react-bootstrap/Spinner'
export const Spin = ({color}) => {
  return <Spinner variant={color} animation="grow" />
}
