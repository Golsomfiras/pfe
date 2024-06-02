import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";
import SurveyQuestionPage from "../SurveyQuestionPage";
import "./SurveyLandingPage.css";
import logo from "../../../images/technixicon.png";
// import * as All from '../../../../server/uploads'
//import { Link } from "react-router-dom";
// import image from "../../../images/website.jpg";
import useWindowSize from "../../../utilities/useWindowSize"
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function Logo({ flashcard }) {
  const { surveyId } = useParams();
  const [survey, setSurvey] = useState();
  const [narrative, setNarrative] = useState("");
  const [heading, setHeading]= useState("")
  const [questionArray, setQuestionArray] = useState([]);
  const [flip, setFlip] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
	const [image, setImage] = useState("");
  const {width} = useWindowSize();

  const history=useHistory();

  

  useEffect(() => {
    const getSurveyQuestions = async () => {
      let response = await fetch(`/api/survey/user/${surveyId}`);
      let data = await response.json();
      console.log("retrieved data:", data);
      setSurvey(data);
      setNarrative(data.narrative);
      setHeading(data.heading)
			if (data.img != null) {
				const imageResponse = await fetch(`/api/survey/user/image/${data.img}`)
				console.log("mathieu", imageResponse)
				setImage(imageResponse.url)
				console.log("the image",image)
			}
      setQuestionArray(data.questions);
      console.log("Survey questions:", data.questions);
    };
    getSurveyQuestions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [surveyId]);

  useEffect(()=>{
    const index = localStorage.getItem('index'+ surveyId)
    if(index){
      setShowQuestions(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  axios.defaults.withCredentials = true;

  useEffect(()=>{
    const fetchSurvey = async () => {
      try {
        const result = await axios.get("/api/survey/user");
        console.log("User connected or not", result.data);

        if (result.data !== "Success") {
          history.push('/login');
          const response= await fetch('/login');
          console.log("reponse e login: ",response.data)
          if(response.data === "Sccess"){
            history.goBack()
          }
          
          /*if (reponse.data=== "Success"){
            console.log("BN8")
            history.push('/home')
          }*/
          
        } else if (result.data === "Success") {
          console.log("Already connected");
        }
      } catch (err) {
        console.log('ERRRREEEUUUURRRR');
        console.log(err);
      }
    };

    fetchSurvey();
  }, [])

  return (
    <div>
      {width > 300 && (
      <div className="card-container">
      {showQuestions === false ? (
				<div
          className={`card ${flip ? "flip" : ""}`}
        >
          <div class="thefront">
            {!flip ? (
              <>
                <Player
                  autoplay
                  loop
                  src="https://lottie.host/793c1fdd-2d54-4abb-9a6d-112fb6ac904d/OlkrmfIGi5.json"
                  className="logo"
                ></Player>
								<button className="enter-button" onClick={() => setFlip(!flip)}>ENTER</button>
              </>
            ) : (
							<></>
            )}
          </div>
          <div className="theback">
            <h1>{heading}</h1>
						{image && <img alt="" src={image} style={{height:100}} />}
						{/* {image && <img src={`/server/uploads/${image}`} style={{height:100}} />} */}
            <p style={{ whiteSpace: "pre-wrap",}}>{narrative}</p>
            <button
              className="neu-button"
              type="button"
              onClick={() => setShowQuestions(true)}
							>
              START
            </button>
          </div>
        </div>
      ) : (
				<div>
          <SurveyQuestionPage survey={survey} questionArray={questionArray} />
        </div>
      )}
	</div>
  )}
  </div>
  )}