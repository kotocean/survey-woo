import React from "react"
import { connect } from 'react-redux'

import { updateAnswer, updateQuestion } from "../store"
import {isInvisible, isVisible, isEnabled, isDisabled, 
    randomUpdateValues, mergeArrayToSet, pushArrayToSet,
    parseResult
} from "../core/Utils"

import {
    Card, Badge,
    CardTitle, CardSubtitle
  } from 'reactstrap';

class Checkbox extends React.Component{

    constructor(props){
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.name = this.props.name
        this.question = this.props.questions[this.name]
        let answerValue = this.updateOrders()
        console.log('constructor', answerValue)
        this.updateTriggers(answerValue)
    }

    handleChange(event){
        console.log('form change ...')
        // console.log(event)
        let formData = new FormData(event.currentTarget)
        let result = formData.getAll(this.name)
        console.log(result)
        this.props.updateAnswer({name: this.name, type:this.question.type, result})
        this.updateTriggers(result)
    }
    // 题目选中项发生变化时的动作触发事件
    updateTriggers(answerValue){
        let triggers = this.question.triggers
        if(!triggers||triggers.length<=0) return;
        triggers.forEach(trigger=>{
            if(trigger.type==='transfer'){
                // 问题间选中项传输，拷贝
                let target = trigger.target
                if(target.type==='checkbox'){
                    let targetOptions = this.props.questions[target.name].options
                    let result = mergeArrayToSet(answerValue, this.question.options, targetOptions)
                    console.log(result)
                    this.props.updateQuestion({name: target.name, options: result})
                }
            }else if(trigger.type==='mutex'){
                console.log('mutex...')
                // 选项间互斥
                if(isEnabled(trigger.isEnabled, parseResult(answerValue, 'checkbox'), this.props.answers)){
                    let removeIndexs = []
                    for(var i in trigger.options){
                        var opt = trigger.options[i]
                        var index = answerValue.indexOf(JSON.stringify(opt))
                        if(index>=0){
                            removeIndexs.push(index.toString())
                        }
                    }
                    let newAnswerValue = []
                    for(var j in answerValue){
                        if(!removeIndexs.includes(j)){
                            newAnswerValue.push(answerValue[j])
                        }
                    }
                    answerValue = newAnswerValue // 更新局部变量，处理多个mutex时store的异步更新有延时
                    this.props.updateAnswer({name: this.name, type:this.question.type, result: newAnswerValue})
                }
            }
        })
    }
    // 关联题目的答案发生变化时，条件圈选事件处理
    updateOrders(){
        let answers = this.props.answers
        let orders = this.question.orders
        if(!orders || orders.length<=0) return;
        let answerValue = []
        orders.forEach(order=>{
            console.log(order)
            
            if(isEnabled(order.isEnabled, answers[this.name]?answers[this.name].val:undefined, answers)){
                if(order.type==='assign'){
                    this.props.updateAnswer({name: this.name, type:this.question.type, result: order.values})
                    pushArrayToSet(order.values, answerValue)
                }else if(order.type==='random'){
                    let num = order.num
                    let values = orders.values
                    if(!values||values.length<=0){
                        values = []
                        this.question.options.forEach(opt=>{
                            values.push(JSON.stringify({
                                label: opt.label,
                                value: opt.value
                            }))
                        })
                    }
                    let result = randomUpdateValues(num, this.question.options.length, values)
                    if(answers[this.name]){
                        pushArrayToSet(answers[this.name].value, result)
                    }
                    this.props.updateAnswer({name: this.name, type:this.question.type, result})
                    pushArrayToSet(result, answerValue)
                }
            }
        })
        return answerValue
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
                            <input className="form-check-input" type="checkbox" name={this.name} value={value} checked={answer&&answer.value.includes(value)} disabled={isDisabled(opt.isDisabled, answer?answer.val:undefined, answers)} />
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