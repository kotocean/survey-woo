import React from "react"
import "./index.css"

import { Provider } from 'react-redux'
import {store} from "../store"
import Question from "./Question"
import { sample } from "../sample"
import { Button, Form } from 'antd';
import { preHandle } from "../core/PreHandler"

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { offset: 1, span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

class Survey extends React.Component{
    constructor(props){
        super(props)
        let {result, answers} = preHandle(sample.questions)
        this.questions = result
        // 初始化
        store.dispatch({type:'survey/initQuestions',payload: this.questions })
        store.dispatch({type:'survey/initAnswers', payload: answers})
    }
    onFinish = (values) => {
        console.log('Success:', values);
        console.log('State:', store.getState())
    };
    
    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    render(){
        return (
            <Provider store={store}>
                <div className="survey">
                    <div className="s-header">
                        <h4 className="text-center">{sample.title}</h4>
                        <p>{sample.description}</p>
                    </div>
                <Form 
                    {...layout}
                    name="basic"
                    initialValues={{
                    remember: true,
                    }}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                >
                    { this.questions&&Object.values(this.questions).map((item,index)=>
                        <Question key={index} name={item.name} type={item.type} />
                    )}
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                        提交
                        </Button>
                    </Form.Item>
                </Form>
                </div>
            </Provider>
        )
    }
}
  
export default Survey;