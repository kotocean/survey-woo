import React from "react"
import { connect } from 'react-redux'

import { updateAnswer, updateQuestion } from "../store"
import {isVisible, randomUpdateValues, pushArrayToSet} from "../core/Utils"

import {
    Card,
    CardTitle, CardSubtitle
  } from 'reactstrap';

class Checkbox extends React.Component{

    constructor(props){
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.name = this.props.name
        this.updateOrders(this.props.questions[this.name], this.props.answers)
    }

    handleChange(event){
        console.log('form change ...')
        // console.log(event)
        let formData = new FormData(event.currentTarget)
        let result = formData.getAll(this.name)
        console.log(result)
        this.props.updateAnswer({name: this.name, result})
    }

    updateOrders(question, answers){
        let orders = question.orders
        if(!orders || orders.length<=0) return;
        orders.forEach(order=>{
            console.log(order)
            
            if(eval(order.isEnabled)){
                if(order.type==='assign'){
                    this.props.updateAnswer({name: this.name, result: order.values})
                }else if(order.type==='random'){
                    let num = order.num
                    let values = orders.values
                    if(!values||values.length<=0){
                        values = []
                        question.options.forEach(opt=>{
                            values.push(JSON.stringify({
                                label: opt.label,
                                value: opt.value
                            }))
                        })
                    }
                    let result = randomUpdateValues(num, question.options.length, values)
                    if(answers[this.name]){
                        pushArrayToSet(answers[this.name].value, result)
                    }
                    this.props.updateAnswer({name: this.name, result})
                }
            }
        })
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
                            <input className="form-check-input" type="checkbox" name={this.name} value={value} checked={answer&&answer.value.includes(value)} />
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
  
export default connect(mapStateToProps, mapDispatchToProps)(Checkbox)