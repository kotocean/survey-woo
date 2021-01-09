import React from "react"
import "./index.css"

import { Provider } from 'react-redux'
import {store} from "../store"
import Question from "./Question"
import { sample } from "../sample"
import { Button } from 'reactstrap';

class Survey extends React.Component{
    constructor(props){
        super(props)
        this.questions = sample.questions
        // 初始化
        store.dispatch({type:'survey/initQuestions',payload: {questions: this.questions}})
    }
    handleSubmit(){
        alert(JSON.stringify(store.getState().answers))
    }
    render(){
        console.log(sample)
        return (
            <Provider store={store}>
                <div>
                    <div className="text-center">
                        <h4>{sample.title}</h4>
                        <p>{sample.description}</p>
                    </div>
                    { this.questions&&Object.values(sample.questions).map((item,index)=>
                        <Question key={index} name={item.name} type={item.type} />
                    )}
                    <Button color="primary" onClick={this.handleSubmit} block>提交答案</Button>                
                </div>
            </Provider>
        )
    }
}
  
export default Survey;