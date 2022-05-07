import React, { useEffect, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';
import { CopyToClipboard } from "react-copy-to-clipboard";
import AssignmentIcon from "@material-ui/icons/Assignment"
import { SettingsSystemDaydreamRounded } from '@material-ui/icons';
import io from 'socket.io-client';
import Peer from "simple-peer";


const socket = io.connect('http://localhost:5000');
const VideoCallDialog = ({ openVideo, handleClose, currentUser }) => {

    const [ name, setName ] = useState("");
    const [ me, setMe ] = useState("");
    const [ idToCall, setIdToCall ] = useState("");
    const [ callEnded, setCallEnded ] = useState(false);
    const [ stream, setStream ] = useState();
    const [ receivingCall, setReceivingCall ] = useState(false);
    const [ caller, setCaller ] = useState("");
    const [ callerSignal, setCallerSignal ] = useState();
    const [ callAccepted, setCallAccepted ] = useState(false);

    // const socket = useRef();
    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({  video: true, audio: true }).then((stream) => {
            setStream(stream);
            myVideo.current.srcObject = stream;
        });

        socket.on("add-user", id => {
            setMe(id);
        });

        socket.on("callUser", (data) => {
            setReceivingCall(true);
            setCaller(data.from);
            setCallerSignal(data.signal);
            setName(data.name);
        })
    }, []);

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

    return (
        <Dialog
            open={openVideo}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Use Google's location service?"}
            </DialogTitle>
            <DialogContent>
                {/* <DialogContentText id="alert-dialog-description">
                    Let Google help apps determine location. This means sending anonymous
                    location data to Google, even when no apps are running.
                </DialogContentText> */}
                <div className="container">
                    <div className="viddeo-container">
                        <div className="video">
                            <video playsInline muted ref={myVideo} autoPlay />
                        </div>
                        <div className="video">
                            <video playsInline ref={userVideo} autoPlay />
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
                            <CopyToClipboard text={me} style={{ marginBottom: "2rem" }}>
                                <Button variant="contained" color="primary" startIcon={<AssignmentIcon fontSize="large" />} >
                                    Copy ID
                                </Button>
                            </CopyToClipboard>
                            <TextField
                                id="filled-basic"
                                label="ID to call"
                                variant={idToCall}
                                onChange={(e) => setIdToCall(e.target.value)}
                            />
                            <div className="call-button">
                                <Button variant="contained" color="secondary" onClick={leaveCall}>
                                    End Call
                                </Button>
                            </div>
                        </div>
                        <div className="caller">
                            <h1>{name} is calling...</h1>
                            <Button variant="contained" color="primary" onClick={answerCall}>
                                Answer
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
            {/* <DialogActions>
                <Button onClick={handleClose}>Disagree</Button>
                <Button onClick={handleClose} autoFocus>
                    Agree
                </Button>
            </DialogActions> */}
        </Dialog>
    )
};

export default VideoCallDialog;