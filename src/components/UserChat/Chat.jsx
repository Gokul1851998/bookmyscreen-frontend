import React,{useRef, useState} from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { userUrl } from '../../../apiLinks/apiLinks'
import { useEffect } from 'react'
import { io } from 'socket.io-client'
import { getMessagesForUsers, sentMessagesToOwner } from '../../api/user/users'
import { toast } from 'react-hot-toast'
import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'


import styled from 'styled-components'

 function Chat() {
    const location = useLocation()
    const ownerId = location.state.ownerId
    const [message,setMessage] = useState([])
    const [msg,setMsg] = useState('')
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const user = useSelector((state)=>state.users.user)
    const scrollRef = useRef();
    const socket = useRef();
    useEffect(() => {
        if(user){
            socket.current = io(userUrl)
            socket.current.emit('add-user',user._id)
        }
    }, [user]);
      
    useEffect(()=>{
        const fetchData = async()=>{
         const response = await getMessagesForUsers({to:ownerId,from:user._id})
         if(response.success){
          setMessage(response.data)
         }else{
            toast.error('Something went wrong')
         }
        }
        fetchData()
    },[])

    const handleSendMsg = async(msg)=>{
        socket.current.emit('send-msg',{
            to:ownerId,
            from:user._id
        })
        const response = await sentMessagesToOwner({from:user._id,to:ownerId,message:msg})
        const msgs = [...message]
        msgs.push({fromSelf:true,message:msg})
        setMessage(msgs)
    }
    
const sendChat = (event)=>{
    event.preventDefault();
    if(msg.length)
    {
        handleSendMsg(msg)
        setMsg('')
    }
}
        
useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);
   
  useEffect(() => {
    arrivalMessage && setMessage((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  return (


            <div class="flex flex-col items-center justify-items-stretch w-full h-screen bg-gray-100 text-gray-800 ">
{/* <!-- Component Start --> */}
<div class="flex flex-col flex-grow w-full  bg-white shadow-xl rounded-lg overflow-hidden mt-11">
    <div class="flex flex-col flex-grow h-0 p-4 overflow-auto">
    {
            message?.map((data)=>
            data.fromSelf ? (

                <div class="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end" >
            <div ref={scrollRef} key={uuidv4()}>
                <div class="bg-cyan-800 text-white p-3 w-full rounded-l-lg rounded-br-lg">
                <p class="text-sm md:text-lg lg:text-xl">{data.message}</p>
                </div>
                <span class="text-xs text-gray-500 leading-none">{moment(data.time).fromNow()}</span>
            </div>
            <img src='https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_icon_159358.png' class="flex-shrink-0 h-10 w-10 rounded-full object-cover bg-gray-300" />
        </div>
            ):(
                <div class="flex w-full mt-2 space-x-3 max-w-xs">
            <img src='https://www.clipartmax.com/png/small/8-85060_user-friendly-illustration.png' class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300" />
            <div>
                <div class="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                <p class="text-sm md:text-lg lg:text-xl">{data.message}</p>
                </div>
                <span class="text-xs text-gray-500 leading-none">{moment(data.time).fromNow()}</span>
             </div>
           </div>
            ))}
    </div>
{/* ---------------------------------------------------------------------Message Input box------------------------------------------------------------------------- */}

<Container>
      <div className="button-container"></div>
      <form className="input-container" onSubmit={(event) => sendChat(event)}>
        <input
          type="text"
          placeholder="type your message here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button type="submit">
        <img className='w-10 h-10' src='https://www.svgrepo.com/show/30442/send.svg'/>
        </button>
      </form>
    </Container>

</div>
{/* <!-- Component End  --> */}
</div>
  )
} 

const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5% 95%;
  background-color: #a0aec0;
  padding: 0 2rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }
      .emoji-picker-react {
        position: absolute;
        top: -350px;
        background-color: #080420;
        box-shadow: 0 5px 10px #9a86f3;
        border-color: #9a86f3;
        .emoji-scroll-wrapper::-webkit-scrollbar {
          background-color: #080420;
          width: 5px;
          &-thumb {
            background-color: #9a86f3;
          }
        }
        .emoji-categories {
          button {
            filter: contrast(0);
          }
        }
        .emoji-search {
          background-color: transparent;
          border-color: #9a86f3;
        }
        .emoji-group:before {
          background-color: #080420;
        }
      }
    }
  }
  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: black;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;

      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgb(22 78 99);
      border: none;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }
      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
`;

export default Chat
