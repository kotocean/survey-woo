import React from "react"
import { connect } from 'react-redux'

import { updateAnswer, updateQuestion } from "../store"
import {isVisible, isEnabled, isInvisible, isDisabled} from "../core/Utils"
import {
    Card, CardTitle, CardSubtitle,
    Badge
  } from 'reactstrap';

class Radio extends React.Component{

    constructor(props){
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.name = this.props.name
        let question = this.props.questions[this.name]
        this.updateOrders(question.orders)
    }

    handleChange(event){
        console.log('form change ...')
        // console.log(event)
        let formData = new FormData(event.currentTarget)
        let result = formData.get(this.name)
        console.log(result)
        this.props.updateAnswer({name: this.name, result})
        // this.props.updateAnswer({name: 'likes', result: [result]})
    }

    updateOrders(orders){
        let variables = this.props.variables
        if(!orders || orders.length<=0) return;
        orders.map(order=>{
            console.log(order)
            
            if(eval(order.isEnabled)){
                if(order.type==='assign'){
                    this.props.updateAnswer({name: this.name, result: order.values[0]})
                }
            }
        })
    }

    validationsIncludes(validations, type){
        if(!validations) return false;
        for(var i in validations){
            if(isEnabled(validations[i].isEnabled, undefined, this.props.answers)&&validations[i].type===type){
                return true
            }
        }
        return false
    }
    
    render(){
        let question = this.props.questions[this.name]
        let answers = this.props.answers
        let answer = answers[this.name]
        let variables = this.props.variables        

        return (
            question&&!isInvisible(question.isInvisible)&&<div>
                <Card body>
                    { question.title.map((item,index)=>
                        isVisible(item.isVisible,answers)&&<div key={index} >
                                <CardTitle tag="h5">{ eval(item.value) }
                                {this.validationsIncludes(question.validations, 'required')&&<Badge color="warning">必填</Badge>}
                                </CardTitle>
                                <CardSubtitle tag="h6" className="mb-2 text-muted">{ item.subValue} </CardSubtitle>
                            </div>
                    )}
                    <form onChange={this.handleChange}>
                        { question.options&&question.options.map((opt, index)=>{
                            let value = JSON.stringify({label: opt.label, value: opt.value})
                            return (
                                !isInvisible(opt.isInvisible)&&<div className="form-check" key={index}>
                                <label className="form-check-label">
                                    <input className="form-check-input" type="radio" name={this.name} value={value} checked={answer&&answer.value===value} disabled={isDisabled(opt.isDisabled, answer?answer.value:undefined, answers)} />
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
      questions: state.questions,
      variables: state.variables
    }
}
  
const mapDispatchToProps = { updateAnswer, updateQuestion }
  
export default connect(mapStateToProps, mapDispatchToProps)(Radio)