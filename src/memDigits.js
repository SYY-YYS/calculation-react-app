import React,{ useEffect, useState } from "react";



function MemDigits(){

    const [showNumber, setshowNumber] = useState('')
    const [genNumber, setgenNumber] = useState('')
    const [answer, setanswer]= useState('')
    const [numofdigit, setnumofdigit] = useState(5)


    var trueAns;
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
    },[numofdigit])


    

    return(
        <>
        {/* <h1>{genNumber}</h1> */}
            <h1>{showNumber}</h1>
            <input onKeyDown={(e)=>{
                if(e.key === 'Enter'){
                    submitAns()
                }
            }} autoFocus onChange={e=>setanswer(e.target.value)} value={answer}></input>
            <input type="submit" onClick={submitAns}  value={'submit'}></input>
        </>
    )
}

export default MemDigits;