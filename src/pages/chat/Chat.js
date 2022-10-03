import React, {useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Chat = () => {

const {id} = useParams()
    
useEffect(() => {
    const storeToken = localStorage.getItem('authToken');
    const domain = 'https://shharea.daily.co/'
    axios
        .get(`https://mittens-buffalo.cyclic.app/chat/room/${id}`, {headers: {Authorization: `Bearer ${storeToken}`}} )
        .then((res) => {
            if (res.status === 200){
                const script = document.createElement("script");
                script.innerHTML =  `window.DailyIframe.createFrame({
                    iframeStyle: {
                        position: 'absolute',
                            width: '100vw',
                            height: '100vh'
                    },
                    showLeaveButton: true,
                })
                .join({
                    url: '${domain}${id}',
                });`;
                document.body.appendChild(script);
            }
        })
        .catch(err => console.log(err));
}, [id]);

  return (
   <>
   </>
  )
}

export default Chat