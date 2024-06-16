import {React, useState, useRef, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LogoutButton from './logout';
import { checkLoggedin } from './App';

function Mathapp({backendUrl, loggedin, setloggedin}) {

    // async function sendData() {
    //     await axios.get('http://localhost:8030/dataOperation', {withCredentials: true})
    //     .then(function(res) {
    //         console.log(res)
    //     }).catch((err) => {
    //         console.log(err)
    //     })
    // };

   
    // var document = useRef();
    
    


    const [noq, setnoq] = useState('');
    const [maxnum, setmaxnum] = useState('');
    const [noo, setnoo] = useState('');
    const [question, setquestion] = useState('');
    const [questionChild, setquestionChild] = useState();
    const [response, setresponse] = useState('');
    const [answer, setanswer] = useState('');
    const [hide, sethide] = useState(false);
    const [start, setstart] = useState(false);
    const [correctAns, setcorrectAns] = useState(0);
    const [timeList, settimeList] = useState([]);
    const [startTime, setstartTime] = useState(0);
    const [timestop, settimestop] = useState(0);

    const turningLocation = useRef();
    const answerInput = useRef();

    useEffect(()=> {
        checkLoggedin(setloggedin, backendUrl)
    }, [startTime])

    function handleKeyDown (event) {
        // console.log(event.key)
        if(event.key === 'Enter') {
            checkAns()
        }
    }

    function abacusMode() {
        turningLocation.current.classList.toggle('mode-changed');
    }
    

    function hideSettings() {
        sethide(prev => !prev);
    }

    function startQuestionset() {
        sethide(prev => !prev);
        setstart(prev => !prev);
        const currectTime = Date.now()/1000;
        setstartTime(currectTime);
        answerInput.current.focus();
        genQuestion()
    }
    

    // function get(i) {
    //     return window.Document.getElementById(i);
    // }
    // function create(i) {
    //     return window.Document.createElement(i);
    // }


    
    function Stopper() {
        // indicate very first time
        // console.log(startTime, timestop)
        if (startTime === 0) {
            setstartTime(Date.now()/1000);
        } else {
            const timediff = (timestop === 0)?Date.now()/1000-startTime:Date.now()/1000-timestop;
            // console.log(timediff);
            if(typeof(timediff) == "number") {
                // settimeList(prev => [...prev, timediff])
                settimestop(Date.now()/1000);
                return timediff;
            }else {
                console.log(timestop, startTime,)
            }
        }
    }

    
    
    
    
    function p1orp2() {
        let x = Math.random();
        return x;
    }
    function draw(no) {
        while (true) {
            let x = Math.round(p1orp2()*no);
            if (x !== 0) {
                return x;
            }
        }
    
    }

    function create_question(no, length) {
        let l = [];
        let l2 = [];
        for (let i = 0; i < length+1; i++) {
            l.push(draw(no));
        }
        for (let j = 0; j < length; j++) {
            l2.push(Math.round(p1orp2()));
        }
        setcorrectAns(l[0]);
    
        
        var question_sentence;
        
        let spacing;
        // abacus mode
        if (getComputedStyle(turningLocation.current).justifyContent === 'right') {
            spacing = '\n';
            question_sentence = '' + l[0];
        } else {
            spacing = '';
            question_sentence = ''+ l[0];
        }
        for (let k = 0; k < length; k++) {
            if (l2[k] === 0) {
                question_sentence += spacing + '+' + l[k+1];
                
                setcorrectAns(prev => prev +l[k+1]);
            } else {
                question_sentence += spacing + '-' + l[k+1];
                
                setcorrectAns(prev => prev -l[k+1]);
            }
        }
        
        // solution 1: spacing try to make them align
        // if (getComputedStyle(turningLocation).justifyContent === 'right') {
        //     question_sentence = question_sentence.split('\n');
        //     let longestString = getLongestString(question_sentence);
        //     question_sentence.forEach((item)=> {
        //         if (item.length < longestString.length) {
        //             for (let i = item.length; i < longestString.length; i++) {
        //                 item = '&nbsp;' + item;
        //             }
        //         };
        //     })
        //     question_sentence = question_sentence.join('\n');
        // }
    
        
    
        // solution 2: adding div and align by css
        if (getComputedStyle(turningLocation.current).justifyContent === 'right') {
            question_sentence = question_sentence.split('\n');
            setquestionChild(
                question_sentence.map((item, index) => {
                    return <div key={index}>{item}</div>
                })
            );
            // for (let i = 0; i < question_sentence.length; i++) {
            //     let numberBlock = create('div');
            //     numberBlock.innerText = question_sentence[i];
            //     question.appendChild(numberBlock);
            // }
        } else {
            setquestion(question_sentence);
        }
    }
    
    
    function genQuestion() {
        // let inl = get('inl').value;
        // let noo = get('noo').value;
        
        setquestion('');
        if (maxnum && noo) {
            create_question(maxnum, noo);
            
        };
    }

    async function checkAns() {
        // let response = get('response')
        // console.log(answer, correctAns)
        if (parseInt(answer) === correctAns) {
            const timediff = Math.round(Stopper()*1000)/1000/noo;
            

            setresponse('correct');
            setanswer('');
            if (parseInt(noq) > 1) {
                settimeList(prev => [...prev, timediff])
                genQuestion();
                setnoq(prev => (parseInt(prev) - 1));
            } else {
                // hvnt rendered new timeList in stopper
                // setresponse(timeList);
                settimeList(prev => [...prev, timediff])
                setquestion("Questions Done!")
                setquestionChild()
                // console.log(timeList);
    
                // here sending data to backend
                // first check if login
                // await axios.get("http://localhost:8030/userProfile")
                // .then(function (res) {
                //     console.log(res)
                // }).catch((err) => {
                //     if(err) throw err;
                // })

                // then calculate averagetime and minTime and get trialnumberV
                // console.log(timeList)
                let truetimeList = [...timeList,timediff]
                let minTime = Math.min(...truetimeList);
                let sumoftime = truetimeList.reduce((x,y)=> {return x + y}, 0);
                let averagetime = Math.round(sumoftime/truetimeList.length*1000)/1000;
                console.log(minTime, averagetime, truetimeList)

                settimeList([])
                settimestop(0)
                setstartTime(0)
                if(loggedin){
                    let dataSending = {
                        timesOfCalculating : noo, 
                        minTime : minTime, 
                        averagetime : averagetime, 
                        trialnumber: truetimeList.length
                    }
                    
                    await axios.post(backendUrl + '/dataOperation/update', dataSending, {
                        withCredentials: true,
                        headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    })
                    .then(function(res) {
                        console.log(res.status,res.data)
                
                        // if(res.data === 'loggedin') {
                        //   console.log('updated')
                        // }
                    }).catch((err) => {
                        console.log('hvnt logged in')
                    })
                } else {

                }
     
                
            }
        } else {
            setresponse('wrong, try again');
            setanswer('');
            return
        }

        
        
    }



    return (

        <div ref={document} className="App">
            <div id='test'>
            {/* <button onClick={sendData}>
                submit
            </button> */}
            
            
            </div>
            <div id='fa' className={hide?'fa fa-bars':'fa fa-bars show'} onClick={hideSettings}></div>
            <div className={hide?'turn-abacus':'turn-abacus hide'}>
            
            <h1>
                inline / abacus mode
            </h1>
            <div ref={turningLocation} className='turning-location'>
                <div className='turning-btn' onClick={abacusMode}></div>
                
                </div>
            </div>

            <div className={hide? "input-setting" : "input-setting hide"}>
            {loggedin && <LogoutButton backendUrl={backendUrl} setloggedin={setloggedin}/>}
            {!loggedin && 
                <Link to="/login">Login</Link>
            }
            {/* <Link to="/register">Register</Link> */}
            <Link to="/home">Home</Link>
                <div>
                    <h1>
                        number of questions:
                    </h1>
                    <input id="i" type="number" value={noq} onChange={e => {setnoq(e.target.value)}}/>
                </div>
                <div>
                    <h1>
                        maximun number for calculation:
                    </h1>
                    <input id="inl" type="number" value={maxnum} onChange={e => {setmaxnum(e.target.value)}}/>
                </div>
                <div>
                    <h1>
                        times of operation:
                    </h1>
                    <input id="noo" type="number" value={noo} onChange={e => {setnoo(e.target.value)}}/>
                    <a id="setting" onClick={startQuestionset}>Set</a>
                    {/* <p>[shift + enter]</p> */}
                </div>

            </div>

            <div className={start?"question-answer-response": "question-answer-response start"}>
                <div className="question-space">
                    <h1>Q.&ensp;</h1>
                      
                    <div id="question">
                        {question}
                        {questionChild}
                    </div>
                </div>

                <div className="answer-row">
                    <h1>answer:</h1>
                    <input autoFocus ref={answerInput} id="answer" type="number" value={answer} onChange={e => {setanswer(e.target.value)}} onKeyDown={handleKeyDown}/>
                    <a  onClick={checkAns}>Submit</a>
                    <p>[enter]</p>
                </div>
                <div id='response'>{response}</div>
                <div>{timeList}</div>
            </div>

        </div>
    )}


export default Mathapp;