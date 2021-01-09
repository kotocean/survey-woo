import React from "react"
import { connect } from 'react-redux'

import { incremented, decremented } from "../store/counter"

class Counter extends React.Component{
    render(){
        return (
            <div>
                <p>{this.props.counter}</p>
                <button onClick={()=>{this.props.incremented()}}>加1</button>
                <button onClick={()=>{this.props.decremented()}}>减1</button>
            </div>
        )
    }
}

const mapStateToProps = (state /*, ownProps*/) => {
    return {
      counter: state.value,
    }
}
  
const mapDispatchToProps = { incremented, decremented }
  
export default connect(mapStateToProps, mapDispatchToProps)(Counter)