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

  const getInbox = () => {
    setData(inbox.filter(ele => !delData.includes(ele)))
  } 

  const getSpam = () => {
     setData(spam.filter(ele => !delData.includes(ele)))
  }

  const getDelData = () => {
    setData(delData)
  }

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
           <input type='text' placeholder='Search Mail'/>
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
            <p onClick={getInbox}>Inbox</p>
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
            <div className='filter_text'>
             <div> <h3>Filter</h3></div>
              <div className='filter_arrow'><KeyboardArrowDownIcon /></div>
            </div>
           </div>
           {data.map(ele => {
            return <div className='mail_list_container' onClick={() => setMail(ele)}>
               <div className='mail_list'>
               <p>{ele.name}</p>
               <p>{ele.subject}</p>
               <p>{ele.content.slice(0,31)+"..."}</p>
               </div>
               <div className='mail_del' onClick={() =>{
                 setDelData([...delData, ele])  
                 setData(data.filter(mes => mes !== ele))
               }}>
                <DeleteOutlineIcon />
               </div>
            </div>
           })}
        </div>
        
        <div className='mail_container'>
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
        </div>
        
        </div>
      </div>
    </>
  )
}

export default App