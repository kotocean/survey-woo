import React from "react"
import "./index.css"

import { Provider } from 'react-redux'
import {store} from "../store/counter"

import Counter from "../components/Counter"

class CounterTest extends React.Component{

    render(){
        return (
            <Provider store={store}>
                <div>
                    <p>CounterTest Components</p>
                    <Counter />
                </div>
            </Provider>
        )
    }
}

export default CounterTest;