import React, { useEffect } from "react";
import { useState } from "react";
import "../pages/Admin/AdminPortal.css";
import {
  EditButton,
  SaveButton,
  CancelButton,
} from "./AdminEditButtons";

function NarrativeOne(props) {
  const [inEditMode, setInEditMode] = useState({ status: false });
  const [tempNarrative, setTempNarrative] = useState('');

  const handleNarrativeChange = (e) => {
    setTempNarrative(e.target.value);
  };

  const onEditClicked = () => {
    setInEditMode({ status: true });
    props.setWholeSurveyInEditModeOrNot(true);
  };

  const onSave = () => {
    props.updateNarrative(tempNarrative);
    //console.log("clicked save");
    setInEditMode({ status: false });
    props.setWholeSurveyInEditModeOrNot(false);
  };

  const onCancel = () => {
    setTempNarrative(props.narrative);
    setInEditMode({ status: false });
    props.setWholeSurveyInEditModeOrNot(false);
  };

  useEffect(() => {
    setTempNarrative(props.narrative);
  }, [props.narrative]);

  return (
    <div className="question-component admin-question-component narrative-component">
      <div className="side-border-line">
        <p style={{ fontWeight: "bold", textAlign: "left", whiteSpace: "pre-wrap",}}>Narrative</p>
        <div className="question-and-buttons">
            {inEditMode.status ? (
              <div className="narrative-text-area editable">
              <textarea
                className="narrative-text-area-input"
                type="text"
                value={tempNarrative}
                onChange={handleNarrativeChange}
              />
            </div>
            ) : (
            <div className="narrative-text-area">
              <p style={{ whiteSpace: "pre-wrap",}}>{props.narrative} </p>
            </div>
            )}
        </div>
      </div>

      <div className="edit-buttons-group">
          {inEditMode.status ? (
            <div className="edit-button">
              <SaveButton onSave={onSave} />
              <CancelButton onCancel={onCancel} />
            </div>
          ) : (
            <div className="edit-button">
              <EditButton onEditClicked={onEditClicked} />
            </div>
          )}
        </div>
    </div>
  );
}

export default NarrativeOne;


