import React from "react"
import { connect } from 'react-redux'

import { updateAnswer, updateQuestion } from "../store"
import {isVisible} from "../core/Utils"
import {
    Card, CardBody,
    CardTitle, CardSubtitle
  } from 'reactstrap';

class Radio extends React.Component{

    constructor(props){
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.name = this.props.name
    }

    handleChange(event){
        console.log('form change ...')
        // console.log(event)
        let formData = new FormData(event.currentTarget)
        let result = formData.get(this.name)
        console.log(result)
        this.props.updateAnswer({name: this.name, result})
        this.props.updateAnswer({name: 'likes', result: [result]})
    }
    
    render(){
        let question = this.props.questions[this.name]
        let answers = this.props.answers
        let answer = answers[this.name]

        return (
            question&&<div>
                <Card body>
                    { question.title.map((item,index)=>
                        isVisible(item.isVisible,answers)&&<div key={index} >
                                <CardTitle tag="h5">{ eval(item.value) }</CardTitle>
                                <CardSubtitle tag="h6" className="mb-2 text-muted">{ item.subValue} </CardSubtitle>
                            </div>
                    )}
                    <form onChange={this.handleChange}>
                        { question.options&&question.options.map((opt, index)=>{
                            let value = JSON.stringify({label: opt.label, value: opt.value})
                            return (
                            <div className="form-check" key={index}>
                                <label className="form-check-label">
                                    <input className="form-check-input" type="radio" name={this.name} value={value} checked={answer&&answer.value===value} />
                                {opt.label}</label>
                            </div>
                        )})}
                    </form>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
      name: ownProps.name,
      answers: state.answers,
      questions: state.questions
    }
}
  
const mapDispatchToProps = { updateAnswer, updateQuestion }
  
export default connect(mapStateToProps, mapDispatchToProps)(Radio)