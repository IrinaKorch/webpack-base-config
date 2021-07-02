// babel core
import "core-js"
import "regenerator-runtime/runtime"

// styles
import './styles/main.sass'

// react
import React from 'react'
import {render} from 'react-dom'

const App = () => (
    <img src="./public/Logo.svg" alt="logo" />
)

render(<App />, document.getElementById('app'))
