import React from 'react'
import Spinner from 'react-bootstrap/Spinner'
export const Spin = ({color}) => {
  return (<div className='d-flex justify-content-center align-items-center'>
    <Spinner variant={color} animation="grow" />
    </div>)
}
