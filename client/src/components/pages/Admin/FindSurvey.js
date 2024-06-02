import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import * as BsIcons from "react-icons/bs";
import * as RiIcons from "react-icons/ri";
import * as ImIcons from "react-icons/im";
// import * as GrIcons from "react-icons/gr";
import * as AiIcons from "react-icons/ai";
import useWindowSize from "../../../utilities/useWindowSize";
import Swal from "sweetalert2";
 import "./test.css"
import axios from "axios";

const FindSurvey = (props) => {
  const history=useHistory();
  const [rows, setRows] = useState([]);
  // const [searchInputCompany, setSearchInputCompany] = useState("");
  // const [searchInputNumber, setSearchInputNumber] = useState("");
  const {width} = useWindowSize();

  props.resetRowId();
  props.resetCopyOrOriginal();

  // function onSearchInputChange(event, setFunction) {
  //   console.log(
  //     `Changing input of "${event.target.id}" to be: ${event.target.value}`
  //   );
  //   setFunction(event.target.value);
  // }

  axios.defaults.withCredentials = true;

  useEffect(()=>{
    axios.get('/existing-surveys').then(result=>{
      console.log("ExISTING SURVEYS/", result);
      if(result.data !=="Success"){
        history.push('/')
      }
      else{
        console.log('nothing mta3 existing surveys');
      }
    }).catch(err=>console.log(err));
  })


  const getSurveyList = async () => {
    let response = await fetch("/api/survey/admin");
    let data = await response.json();
    setRows(data);

    console.log("data: ", data);
  };
  useEffect(() => {
    getSurveyList();
  }, []);
  
  const handleDeleteClick = async (id) => {
    const answer = 
      Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
      });
      answer.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          let deleteResponse = fetch(`/api/survey/admin/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            
          });
          deleteResponse.status=200
          if (deleteResponse.status === 200) {
            getSurveyList();
          }
          answer.fire({
            title: "Deleted!",
            text: "Your survey has been deleted.",
            icon: "success"
          });
          console.log("delete response:", deleteResponse);
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          answer.fire({
            title: "Cancelled",
            text: "Your survey has not been deleted.",
            icon: "error"
          });
        }
      });
      
  };

  return (
    <div> {width >300 && (
    <div className="list-table">
      <h2>Find an Existing Survey</h2>
      {/* <button className="view-all-button">View all surveys</button>

      <input
        id="search-by-company"
        className="search-input"
        value={searchInputCompany}
        placeholder="Search by company name"
        onChange={(event) => onSearchInputChange(event, setSearchInputCompany)}
      />
      <input
        id="search-by-number"
        className="search-input"
        value={searchInputNumber}
        placeholder="Search by survey number"
        onChange={(event) => onSearchInputChange(event, setSearchInputNumber)}
      /> */}
      <table style={{height: "100%"}}>
        <tbody>
          <tr>
            <th>Company</th>
            <th>Version</th>
            <th>Survey No.</th>
            <th>Survey Link</th>
            <th>Action</th>
          </tr>
          {rows.map((row, index) => {
            return (
              <tr key={index}>
                <td>{row.company}</td>
                <td>{row.version}</td>
                <td>{row.surveyNumber}</td>
                <td>
                  <Link to={`/survey/${row._id}`}><div className="survey-link">{`http://localhost:4444/survey/${row._id}`}</div></Link>
                </td>
                <td className="existing-surveys-edit-column">
                  <Link 
                    to="/create-new"
                    className="existing-surveys-edit-icon" 
                    title="Edit" 
                    onClick={() => {
                        props.setCopyOrOriginal("original");
                        props.setRowId(row._id);
                    }}>
                    <BsIcons.BsPencilSquare />
                  </Link>
                  <Link
                    to="/create-new"
                    className="existing-surveys-edit-icon"
                    title="Copy"
                    onClick={() => {
                      props.setCopyOrOriginal("copy");
                      props.setRowId(row._id)
                    }}>
                    <ImIcons.ImCopy />
                  </Link>
                  {/* <button 
                    className="existing-surveys-edit-icon" 
                    title="Map"
                    onClick={()=>history.push(`/map/${row._id}`)}>
                    <GrIcons.GrMap/>
                    </button> */}
                  <button 
                    className="existing-surveys-edit-icon" 
                    title="Chart"
                    onClick={()=>history.push(`/data-analysis/${row._id}`)}>
                    <AiIcons.AiOutlineAreaChart />
                  </button>
                  <button 
                    className="existing-surveys-edit-icon" 
                    title="Delete"
                    onClick={() => handleDeleteClick(row._id)}>
                    <RiIcons.RiDeleteBinFill />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    )} </div>
  );
};

export default FindSurvey;
