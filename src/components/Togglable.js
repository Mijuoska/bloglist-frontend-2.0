/* eslint-disable indent */
import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = React.forwardRef((props, ref) => {
const [visible, setVisibility] = useState(false)

const hideWhenVisible = { display: visible ? 'none' : '' }
const showWhenVisible = { display: visible ? '' : 'none' }

const toggleVisibility = () => {
setVisibility(!visible)
}

useImperativeHandle(ref, () => {
return {
    toggleVisibility
}
})

  return (
    <div className="flex place-content-start mx-48">
      <div style={hideWhenVisible}>
        <button className="flex-1 mb-8 p-2 rounded bg-green-800 text-white hover:bg-green-500" 
        onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        {props.children}
        <button className="pl-2 pr-2 pt-1 pb-1 mt-4 mb-4 rounded bg-gray-500" onClick={toggleVisibility}>Hide</button>
      </div>
    </div>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

Togglable.displayName = 'Togglable'


export default Togglable