import React from "react"
import "./index.css"

import { Provider } from 'react-redux'
import {store} from "../store"
import Question from "./Question"
import { sample } from "../sample"
import { Button } from 'reactstrap';
import { validate } from "../core/Utils"

class Survey extends React.Component{
    constructor(props){
        super(props)
        this.questions = sample.questions
        // 初始化
        store.dispatch({type:'survey/initQuestions',payload: {questions: this.questions}})
        let variables = {
            sex: '男',
            money: '3000万/月'
        }
        store.dispatch({type:'survey/initVariables',payload: {variables}})
    }
    handleSubmit(){
        let result = validate(store.getState())
        if(result.length>0){
            // 验证不通过
            alert(JSON.stringify(result))
        }else{
            // 验证通过，可以提交问卷答案
            alert(JSON.stringify(store.getState().answers))
        }
    }
    render(){
        console.log(sample)
        return (
            <Provider store={store}>
                <div className="survey">
                    <div className="s-header">
                        <h4 className="text-center">{sample.title}</h4>
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