import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { DialogActions } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton, TextField } from '@mui/material';
import PhoneIcon from "@material-ui/icons/Phone";
import { CopyToClipboard } from "react-copy-to-clipboard";
import AssignmentIcon from "@material-ui/icons/Assignment"
import io from 'socket.io-client';
import Peer from "simple-peer";
import { isEmpty } from 'lodash';
import { makeStyles } from '@material-ui/core';
import Draggable from 'react-draggable';
import Paper from '@mui/material/Paper';
import { ResizableBox } from 'react-resizable';
import FullscreenIcon from '@mui/icons-material/Fullscreen';

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

const useStyles = makeStyles({
  dialog: {
    position: 'absolute',
    right: 0,
    bottom: 0
  },
  resizable: {
    position: 'relative',
    '& .react-resizable-handle': {
        position: 'absolute',    
        width: 20,  
        height: 20,   
        bottom: 0,
        right: 0,
        background:"url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2IDYiIHN0eWxlPSJiYWNrZ3JvdW5kLWNvbG9yOiNmZmZmZmYwMCIgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSI2cHgiIGhlaWdodD0iNnB4Ij48ZyBvcGFjaXR5PSIwLjMwMiI+PHBhdGggZD0iTSA2IDYgTCAwIDYgTCAwIDQuMiBMIDQgNC4yIEwgNC4yIDQuMiBMIDQuMiAwIEwgNiAwIEwgNiA2IEwgNiA2IFoiIGZpbGw9IiMwMDAwMDAiLz48L2c+PC9zdmc+')",
        'background-position': 'bottom right',
        padding: '0 3px 3px 0',
        'background-repeat': 'no-repeat',
        'background-origin': 'content-box',
        'box-sizing': 'border-box',
        cursor: 'se-resize',
    },
},
})
const socket = io.connect('http://localhost:5000');
const VideoCallDialog = ({ openVideo, handleClose, currentUser, currentChat }) => {

    const [ name, setName ] = useState("");
    const [ me, setMe ] = useState("");
    const [ idToCall, setIdToCall ] = useState("");
    const [ callEnded, setCallEnded ] = useState(false);
    const [ stream, setStream ] = useState(null);
    const [ receivingCall, setReceivingCall ] = useState(false);
    const [ caller, setCaller ] = useState("");
    const [ callerSignal, setCallerSignal ] = useState();
    const [ callAccepted, setCallAccepted ] = useState(false);

    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();
    const dialog = useRef();

    const classes = useStyles();

    useEffect(() => {

      navigator.mediaDevices.getUserMedia({  video: true, audio: true }).then((stream) => {
          setStream(stream);
          myVideo.current.srcObject = stream;
      }).catch(err => console.log(err));

      console.log('myVideo', myVideo)
    },[myVideo]);

    const callUser = (id) => {
        const peer = new Peer({
            initiator: true,
            trickle: true,
            stream: stream
        });
        peer.on('signal', (data) => {
            socket.emit("callUser", {
                userToCall: id,
                signalData: data,
                from: me,
                name: name
            })
        })
        peer.on("stream", (stream) => {
            userVideo.current.srcObject = stream;
        });
        socket.on("callAccepted", (signal) => {
            setCallAccepted(true);
            peer.signal = signal;
        });

        connectionRef.current = peer;
    }
    const answerCall = () => {
        setCallAccepted(true);
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: stream
        });
        peer.on("signal", data => {
            socket.emit("answerCall", { signal: data, to: caller });
        });
        peer.on('stream', stream => {
            userVideo.current.srcObject = stream;
         });
         peer.signal(callerSignal);
         connectionRef.current = peer;
    }

    const leaveCall = () => {
        setCallEnded(true);
        connectionRef.current.destroy();
    }

    const toggleFullScreen = () => {
      if (dialog.current.requestFullscreen) {
        dialog.current.requestFullscreen();
      } else if (dialog.current.msRequestFullscreen) {
        dialog.current.msRequestFullscreen();
      } else if (dialog.mozRequestFullScreen) {
        dialog.current.mozRequestFullScreen();
      } else if (dialog.current.webkitRequestFullscreen) {
        dialog.current.webkitRequestFullscreen();
      }
    }


    return (
        <Dialog
            open={openVideo}
            // onClose={handleClose}
            onClose={(event, reason) => {
              if(reason !== 'backdropClick'){
                handleClose();
              }
            }}
            // aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            hideBackdrop
            disableEnforceFocus
            disableBackdropClick
            classes={{
              paper: classes.dialog
            }}
            PaperComponent={PaperComponent}
            aria-labelledby="draggable-dialog-title"
            id="full-screenDialog"
            ref={dialog}
        >
          <ResizableBox
            height={500}
            width={600}
            className={classes.resizable}
          >

          <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
            Subscribe
          </DialogTitle>
          <FullscreenIcon onClick={() => toggleFullScreen()} />
            <DialogContent>
                <div className="container">
                    <div className="video-container">
                        <div className="show-video">
                          <div className="video">
                          {stream &&  <video playsInline muted ref={myVideo} autoPlay style={{ width: "200px" }} />}
                            { console.log('show: ', myVideo.current) }
                          </div>
                          <div className="video">
                              { callAccepted && !callEnded && <video playsInline ref={userVideo} autoPlay />}
                          </div>
                          </div>
                        <div className="myId">
                            <TextField
                                id="filled-basic"
                                label="Name"
                                variant="filled"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                style={{ marginBottom: "20px" }}
                            />
                            {/* <CopyToClipboard text={me} style={{ marginBottom: "2rem" }}>
                                <Button variant="contained" color="primary" startIcon={<AssignmentIcon fontSize="large" />} >
                                    Copy ID
                                </Button>
                            </CopyToClipboard> */}
                            <TextField
                                id="filled-basic"
                                label="ID to call"
                                variant="filled"
                                value={idToCall}
                                onChange={(e) => setIdToCall(e.target.value)}
                            />
                            <div className="call-button">
                                { callAccepted && !callEnded ?(
                                  <Button variant="contained" color="secondary" onClick={leaveCall}>
                                    End Call
                                  </Button>
                                  ):(
                                    <IconButton color="primary" aria-label="call" onClick={() => callUser(idToCall) }>
                                      <PhoneIcon fontSize="large" />
                                    </IconButton>
                                )
                              }
                              {idToCall}
                            </div>
                        </div>
                        { receivingCall && !callAccepted ? (
                          <div className="caller">
                            <h1>{name} is calling...</h1>
                            <Button variant="contained" color="primary" onClick={answerCall}>
                                Answer
                            </Button>
                          </div>
                        ) : null }
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Disagree</Button>
                <Button onClick={handleClose} autoFocus>
                    Agree
                </Button>
            </DialogActions>
          </ResizableBox>
        </Dialog>
    )
};

export default VideoCallDialog;