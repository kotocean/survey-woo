import React from "react"
import { connect } from 'react-redux'
import { Radio, Form } from 'antd';

import { updateAnswer, updateQuestion } from "../store"

class IRadio extends React.Component{
    constructor(props){
        super(props)
        this.name = this.props.name
    }
    
    onChange = e => {
        console.log('radio checked', e.target.value);
        this.props.updateAnswer({name: this.name, value: e.target.value, label: e.target.label})
    };



    render(){
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };
        const question = this.props.questions[this.name];
        const answers = this.props.answers
        const { value } = answers[this.name];
        return (
            <div>
                {!eval(question.invisible)&&<Form.Item
                    label={question.title}
                    name={this.name}
                    rules={[{ required: true, message: '请输入你的性别!' }]}
                >
                    <Radio.Group onChange={this.onChange} value={value}>
                    { question.options.map((opt,index) => 
                        <Radio key={index} style={radioStyle} value={opt.value} disabled={eval(opt.disabled)} label={opt.label}>
                            { opt.label }
                        </Radio>
                    ) }
                    </Radio.Group>
                </Form.Item>}
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
      name: ownProps.name,
      answers: state.answers,
      questions: state.questions,
      variables: state.variables,
      controls: state.controls,
      sample: state.sample
    }
}
  
const mapDispatchToProps = { updateAnswer, updateQuestion }
  
export default connect(mapStateToProps, mapDispatchToProps)(IRadio)