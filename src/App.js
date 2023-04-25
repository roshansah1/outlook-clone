import React, { useState } from 'react'
import AppsIcon from '@mui/icons-material/Apps';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { inbox } from './inbox';
import { spam } from './spam';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const App = () => {

  const [flag, setFlag] = useState(true)
  const [data, setData] = useState(inbox)
  const [mail, setMail] = useState({})
  const [delData, setDelData] = useState([])
  console.log(delData)
  const[display, setDisplay] = useState("flex")
  const [, setValue] = useState("")
  const [allData] = useState(inbox.concat(spam))
  const [count, setCount] = useState(inbox.map((ele) => {
    let count = 0;
    if(ele.unread === false){
      count++
    }
    return count
  }).reduce((a,b) => a+b));
  console.log("count", count)

  const [filter, setFilter] = useState("none")


  const getInbox = () => {
    setDisplay("flex")
    setData(inbox.filter(ele => !delData.includes(ele)))
  } 

  const getSpam = () => {
    setDisplay("flex")
     setData(spam.filter(ele => !delData.includes(ele)))
  }

  const getDelData = () => {
    setDisplay("none")
    setData(delData)
  }


  const getValue = (e) => {
    setValue(e.target.value)
    const filteredData = allData.filter(ele => {
      return ele.name.toLowerCase().includes(e.target.value.toLowerCase()) || 
             ele.subject.toLowerCase().includes(e.target.value.toLowerCase()) || 
             ele.content.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setData(filteredData);
  }

  const markAsRead = (mId) => {
    setData(data.map(ele => {
      if (ele.mId === mId) {
        console.log("clicked", data)
        return { ...ele, unread: true }; // Update the unread property to false
      }
      return ele;
    }));
    setCount(count-1)
  };

  return (
    <>
      <div className='app_container'>
        <header> 
        <div className='header_container'>
        <div className='logo'>
        <AppsIcon />
        <h2>Outlook</h2>
        </div>
        <div className='search_box'>
           <SearchIcon />
           <input type='text' placeholder='Search Mail' onChange={getValue}/>
        </div>
        <div className='search_list'>
           {console.log("allData",allData)}
        </div>
        </div>
        </header>
        <div className='main_container'>
          <div className='folders_container'>
          <div className='folder_title' onClick={() => flag ? setFlag(false): setFlag(true)}>
          {flag ? <KeyboardArrowDownIcon /> :  <KeyboardArrowRightIcon/>}
          <h3> Folders</h3>
          </div>
           
           <div className='folder_list' style={flag ? {display: "flex"} : {display: "none"}}>
            <div className='inbox_list'>
            <p onClick={getInbox}>Inbox &nbsp; &ensp; <strong style={{color: "#0f6cbd"}}>{count > 0 ? count : ""}</strong></p>
            </div>
            <p onClick={getSpam}>Spam</p>
            <p  onClick={getDelData}>Deleted Items</p>
           </div>
          </div>

        <div className='mails_list'>
           <div className='mail_header'>
            <div className='mail_title'>
              <h3>Focused</h3>
              <h3>Other</h3>
            </div>
            <div className='filter_text' onClick={() => filter === "none" ? setFilter("flex") : setFilter("none")}>
             <div> <h3>Filter</h3></div>
              <div className='filter_arrow'><KeyboardArrowDownIcon /></div>
            </div>
            <div className='filter_list' style={{display : filter}}>
              <p onClick={() => setData(allData)}>All </p>
              <p onClick={() => setData(allData.filter(ele => ele.unread === false))}>Unread</p>
              <p onClick={() => setData(spam)}>Spam</p>
              <p onClick={() => setData(delData)}>Deleted</p>
            </div>
           </div>
           {data.map(ele => {
            return <div key={ele.mId} className='mail_list_container' onClick={() => setMail(ele)}>
               <div className='mail_list' style={{color: ele.unread ? "#000" : "#0f6cbd"}} onClick={() => markAsRead(ele.mId)}>
               <p>{ele.name}</p>
               <p>{ele.subject}</p>
               <p>{ele.content.slice(0,31)+"..."}</p>
               </div>
               <div className='mail_del' style={{display: display}} onClick={() =>{
                 setDelData([...delData, ele])  
                 setData(data.filter(mes => mes !== ele))
               }}>
                <DeleteOutlineIcon />
               </div>
               {/* <div className='mail_del' style={{display: ""}} onClick={() =>{
                 
               }}>
                <DeleteOutlineIcon />
               </div> */}
            </div>
           })}
        </div>
        
        <div className='mail_container'>
           {mail.name === undefined ? (<>
            <div className='mail_content_text'>
             <img src='https://res-h3.public.cdn.office.net/owamail/20230414002.05/resources/images/illustration_mail-hash-c4bc6831.m.svg' alt='logo-of-message' />
              <h4>Select an item to read</h4>
              <h5>Nothing is Selected</h5>
            </div>
           </>) : (
            <>
            <div className='subject_title'>
               <h2>{mail.subject}</h2>
           </div>

           <div className='mail_content'>
              <div className='mail_content_title'>
              <h3>{mail.name}</h3>
              <p>To: Me &lt;Me@admin.com&gt; </p>
              </div>
              <p>Hey @Mr. Me</p>
              <p>{mail.subject}</p>
              <p>{mail.content}</p>
              <p>Thanks</p>
           </div>
            </>
           )}
        </div>
        
        </div>
      </div>
    </>
  )
}

export default App