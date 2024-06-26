import React, { useState, useContext, useEffect } from "react";
import { AnswerContext } from "../pages/SurveyQuestionPage";
import "../Form.css";

const MatrixNum = (props) => {
  const { answers, setAnswers, setIsNextButtonDisabled, setValidationErrorMessage } =
    useContext(AnswerContext);
  const [values, setValues] = useState(props.texts);

  let columns = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

  const handleChange = (e, i) => {
    let newValues = [...values];
    newValues[i].value = e.target.value;
    setValues(newValues);

    let updateAnswers = { ...answers };
    updateAnswers[props.questionNumber] = newValues;
    setAnswers(updateAnswers);
  };

  useEffect(() => {
    if (setIsNextButtonDisabled == null) return;
    console.log(values);
    var allHaveValues = true;
    for (var i in values) {
      var value = values[i];
      if (value.value == null) {
        allHaveValues = false;
      }
    }
    if (allHaveValues) {
      setIsNextButtonDisabled(false);
      setValidationErrorMessage("")
      // console.log("setDisabled");
    } else {
      setIsNextButtonDisabled(true);
      setValidationErrorMessage("Please select one option from each row.")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  useEffect(() => {
    if (answers.length < props.questionNumber) {
      let updateAnswers = { ...answers };
      updateAnswers[props.questionNumber] = values;
      setAnswers(updateAnswers);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
		<div className="matrix question-component user animate__animated animate__fadeIn">
      <p className="question-intro">Question {props.questionNumber}</p>
      <p className="question-intro">{props.question}</p>
      <table>
        <tbody>
          <tr>
            <th></th>
            {columns.map((cl, i) => {
              return (
                <th key={i}>
                  <label>{cl}</label>
                </th>
              );
            })}
          </tr>
          {values.map((row, i) => {
            return (
              <tr key={i}>
                <td className="label-rows">
                  <label>{row.text}</label>
                </td>
                {columns.map((col, index) => {
                  return (
                    <td key={index}>
                      <input
                        type="radio"
                        name={row.text}
                        value={col}
                        onChange={(e) => handleChange(e, i)}
                        checked={answers[props.questionNumber] ? answers[props.questionNumber][i].value === col : false}
                      />
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MatrixNum;
