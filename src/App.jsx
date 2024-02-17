import { useCallback, useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import { Route, BrowserRouter, Routes, useNavigate, useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useRequestPermission } from "@stream-io/video-react-sdk";
// import { platform } from '@tauri-apps/plugin-os';

// const currentPlatform = await platform();
// console.log(currentPlatform);

// import { CallControls, CallingState, ParticipantView, SpeakerLayout, StreamCall, StreamTheme, StreamVideo, StreamVideoClient, useCall, useCallStateHooks,} from '@stream-io/video-react-sdk';

// const apiKey = 'mmhfdzb5evj2'; // the API key can be found in the "Credentials" section
// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiQmVuX1NreXdhbGtlciIsImlzcyI6Imh0dHBzOi8vcHJvbnRvLmdldHN0cmVhbS5pbyIsInN1YiI6InVzZXIvQmVuX1NreXdhbGtlciIsImlhdCI6MTcwODE2MDc3NCwiZXhwIjoxNzA4NzY1NTc5fQ._0RnEaLRr2tfiDuqAuiUk7fKg3E613Q3XiX7ETYJpog'; // the token can be found in the "Credentials" section
// const userId = 'Ben_Skywalker'; // the user id can be found in the "Credentials" section
// const callId = 'qUYwW1mdsdfg'; // the call id can be found in the "Credentials" section

// const user = {
//   id: userId,
//   name: 'Oliver',
//   image: 'https://getstream.io/random_svg/?id=oliver&name=Oliver',
// };

// const client = new StreamVideoClient({ apiKey, user, token });
// const call = client.call('default', callId);
// call.join({ create: true });


function App() {
  
    

  return (
    <BrowserRouter>
    
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/room/:roomId" element={<RoomPage/>}/>
    </Routes>
    </BrowserRouter>

    
  );
}

export default App;

const HomePage = () => {
  const [value,setValue] = useState("");
  const navigate=useNavigate();

  const handleJoinRoom=useCallback(() => {
    navigate(`/room/${value}`)
  },[navigate,value])
  return (
    <div>
      <input value={value} onChange={(e) => setValue(e.target.value)} type="text" placeholder="Enter room id" />
      <button onClick={handleJoinRoom}>Join</button>
    </div>
  )
}

const RoomPage = () => {

  const {roomId} = useParams();
  useEffect(() => {
    const getDevices=async () => {
      const permision= useRequestPermission();
      await permision.requestPermission();
      const stream=await navigator.mediaDevices.getUserMedia({ audio: true, video: true,});
      
    }
    getDevices();
  },[])

  const myMeeting=async (element) => {
    const appID = 1983303900;
      const serverSecret = "02a084410b967c464c6443531e7be32a";
      const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomId,  Date.now().toString(),  "Darab Khan");
      const zc=ZegoUIKitPrebuilt.create(kitToken);
      zc.joinRoom({
        container: element,
        sharedLinks: [
          {
            name: 'Copy Link',
            url: window.location.href
          }
        ],
        scenario: {
          mode:ZegoUIKitPrebuilt.OneONoneCall
        },
        showScreenSharingButton: true,
        useFrontFacingCamera: true,
        turnOnCameraWhenJoining: true,
        turnOnMicrophoneWhenJoining: true
        
      })
  }
  return (
    <div>
      <div ref={myMeeting}/>

      
    </div>
  )
}

// export const MyUILayout = () => {
//   const call = useCall();

//   const { useCallCallingState, useParticipantCount,useLocalParticipant,useRemoteParticipants } = useCallStateHooks();
//   const callingState = useCallCallingState();
//   const participantCount = useParticipantCount();
  

//   if (callingState !== CallingState.JOINED) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <StreamTheme >
//       <SpeakerLayout participantsBarPosition='bottom'/>
//       <CallControls />

//     </StreamTheme>
//   );
// };

// export const MyParticipantList = (props) => {
//   const { participants } = props;
//   return (
//     <div style={{ display: 'flex', flexDirection: 'row', gap: '8px',width:"100vw" }}>
//       {participants.map((participant) => (
//         <div style={{width:"100%",aspectRatio:"3/2"}}>

//           <ParticipantView participant={participant} key={participant.sessionId} />
//         </div>
//       ))}
//     </div>
//   );
//   }

  // export const MyFloatingLocalParticipant = (props) => {
  //   const { participant } = props;
  //   return (
  //     <div
  //       style={{
  //         position: 'absolute',
  //         top: '15px',
  //         left: '15px',
  //         width: '240px',
  //         height: '135px',
  //         boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 10px 3px',
  //         borderRadius: '12px',
  //       }}
  //     >
  //       {participant && <ParticipantView participant={participant} key={participant.sessionId} />}
  //     </div>
  //   )
  
