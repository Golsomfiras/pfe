import React, { useEffect, useState } from "react";
import SurveyQuestion from "../SurveyQuestion";
import Progress from "../Progress";
import logo from '../../images/technixtagline2.png'
import useWindowSize from "../../utilities/useWindowSize"

export const AnswerContext = React.createContext({
  setDisabled: () => {},
  answers: {},
  setAnswers: () => {},
});

const SurveyQuestionPage = ({ survey, questionArray }) => {
  const [error, setError] = useState();
  const [answers, setAnswers] = useState({});
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(false);
  const [validationErrorMessage, setValidationErrorMessage] = useState("")
  const value = { answers, setAnswers, setIsNextButtonDisabled, setValidationErrorMessage };

  const [index, setIndex] = useState(0);
  const [progressBarDone, setProgressBarDone] = useState(0);
  const [endSurvey, setEndSurvey] = useState(false);
  const {width} = useWindowSize();

useEffect(()=>{
  if(survey){
    const questionNumber = +localStorage.getItem("index"+ survey._id)
    if(questionNumber){
      setIndex(questionNumber)
    }
    const savedAnswers = localStorage.getItem("answers"+ survey._id)
    if(savedAnswers){
      setAnswers(JSON.parse(savedAnswers))
    }
  } 
},[survey])

  const goToNextQuestion = () => {
    // setDisabled(true);
    let counter = index + 1;
    setIndex(counter);
    localStorage.setItem("index"+ survey._id, counter)
    localStorage.setItem("answers"+ survey._id, JSON.stringify(answers))

  };

  const goBackAQuestion = () => {
    // setDisabled(true);
    let counter = index - 1;
    setIndex(counter);
    localStorage.setItem("index"+ survey._id, counter)

  };

  useEffect(() => {
    if(Object.keys(answers).length > 0 && answers.constructor === Object){
      let fullProgress = Math.round((Object.keys(answers).length / (questionArray.length)) * 100); 
      setProgressBarDone(fullProgress);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answers]);

  const onCreateSurveyAnswersClicked = async () => {
    let currentDate = new Date();
    let answerToCreate = {
      survey,
      answers,
      answeredDate: currentDate,
    };
    try {
      let createResponse = await fetch("/api/answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(answerToCreate),
      });
      console.log("creating an answerRecord", answerToCreate);

      if (createResponse.status !== 200) {
        let errorMessage = await createResponse.text();
        console.log("We have an error: ", errorMessage);
        setEndSurvey(false);
        setError(errorMessage);
      } else {
        setError(undefined);
        console.log("create response is successful");
        setEndSurvey(true);
        localStorage.removeItem('index'+ survey._id)
        localStorage.removeItem('answers'+ survey._id)
      }
    } catch (error) {
      console.log("Fetch failed to reach the server:", error);
    }
  };

  return (
    <div>
      {width > 300 && (
		<div className="survey-page">
			<header>
				<nav>
					<img alt="" className="technix-tagline" src={logo}></img>
				</nav>
			</header>
      {endSurvey === false ? (
        <div className="progress-survey">
          <Progress done={progressBarDone} />
					<div className="survey-card animate__animated animate__fadeIn">
						<div className="the-survey">
              <AnswerContext.Provider value={value}>
                <SurveyQuestion questionBlock={questionArray[index]} />
              </AnswerContext.Provider>
              <div className="btns">
                <div className="validation-error">
                  <p>
                    {validationErrorMessage}
                  </p>
                </div>
                {index === 0 && (
                  <button
                    className="col2 next-btn"
                    disabled={isNextButtonDisabled}
                    onClick={goToNextQuestion}
                  >
                    Next
                  </button>
                )}
                {index === questionArray.length - 1 && (
                  <div className="back-next-button-row">
                    <button className="col1 back-btn" onClick={goBackAQuestion}>
                      Back
                    </button>
                    <button
                      className="col2"
                      disabled={isNextButtonDisabled}
                      onClick={onCreateSurveyAnswersClicked}
                    >
                      Submit
                    </button>
                    {error && <div>{error}</div>}
                  </div>
                )}
                {index !== 0 && index !== questionArray.length - 1 && (
                  <div className="back-next-button-row">
                    <button className="col1 back-btn" onClick={goBackAQuestion}>
                      Back
                    </button>
                    <button
                      disabled={isNextButtonDisabled}
                      className="col2 next-btn"
                      onClick={goToNextQuestion}
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
					<div className="survey-card closing animate__animated animate__fadeIn">
          <h2>Thank you for your participation!!</h2>
        </div>
      )}
    </div>
    )} 
    </div>
  );
};

export default SurveyQuestionPage;
