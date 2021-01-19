import React from 'react'

import Radio from "../components/Radio";
// import Checkbox from "../components/Checkbox";
// import RadioMtrix from "../components/RadioMtrix";
// import RadioTransposedMatrix from "../components/RadioTransposedMatrix";
// import CheckboxMatrix from "../components/CheckboxMatrix";
// import CheckboxTransposedMatrix from "../components/CheckboxTransposedMatrix";

const questions = {
  radio: Radio,
  // checkbox: Checkbox,
//   checkboxMatrix: CheckboxMatrix,
//   checkboxTransposedMatrix: CheckboxTransposedMatrix,
//   radioMtrix: RadioMtrix,
//   radioTransposedMatrix: RadioTransposedMatrix,
};
function Question(props){
  console.log(props)
  const SpecificQuestion = questions[props.type];
  return <SpecificQuestion name={props.name} />;
}
export default Question;