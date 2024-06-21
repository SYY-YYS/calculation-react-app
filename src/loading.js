import { Backdrop } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import React,{ useEffect, useState } from "react";


function LoadingPage({text}){

    const [showNumber, setshowNumber] = useState('')
    const [genNumber, setgenNumber] = useState('')
    const [answer, setanswer]= useState('')
    const [numofdigit, setnumofdigit] = useState(5)


    function drawNum(digits) {
        let gennum = ''
        for (let i=0; i< digits; i++) {
            gennum += Math.round(9*Math.random())
        }
            // setshowNumber(genNumber)
            return gennum;
        }
        
    

    function submitAns(){
        console.log(genNumber, answer)
        if(genNumber === answer) {
            setnumofdigit(prev => prev + 1)
            setgenNumber('')
            setanswer('')
            
            // genQuestion()
        } else {
            setnumofdigit(prev => prev - 1)
        }
    }
    

    function genQuestion(){
        const num = drawNum(numofdigit)
        setgenNumber(num)
        setshowNumber(num)

        setTimeout(()=>setshowNumber(''), 1000)
    }


    useEffect(()=>{
        genQuestion()
        // console.log(getComputedStyle(document.getElementById('loadingicon')))
    },[numofdigit])


    return(
        <>
            <Backdrop
            id='loadingicon'
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <p style={{
                fontSize: "20px",
                textAlign: "center",
                position: "absolute",
                top: "58%",
                left: "50%",
                transform: "translate(-50%,-50%)"
            }}>{text}</p>

            <div className='memDigits'>
                <h3>Quick Memorizing Game</h3>
                <h1>{showNumber}</h1>
                <input onKeyDown={(e)=>{
                    if(e.key === 'Enter'){
                        submitAns()
                    }
                }} autoFocus onChange={e=>setanswer(e.target.value)} value={answer}></input>
                <input type="submit" onClick={submitAns}  value={'submit'}></input>
            </div>
        </>
    )
}
export default LoadingPage;