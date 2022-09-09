import React, { useState, useEffect, useReducer } from 'react';
import './Chrono.css';
import PauseImg from '../Images/pause.svg';
import PlayImg from '../Images/play.svg';
import ResetImg from '../Images/reset.svg';

export default function Chrono() {
    const [sessionTime, setSessionTime] = useState(1500);
    const [sessionTimeFixed, setSessionTimeFixed] = useState(1500);
    
    const [breakTime, setBreakTime] = useState(300);
    const [breakTimeFixed, setBreakTimeFixed] = useState(300);

    const [workingChrono, setWorkingChrono] = useState(false);
    
    const [state, dispatch] = useReducer(reducer);
    
    const playPause = () => {
        setWorkingChrono(workingChrono => !workingChrono)
    }

    function reducer(state, action) {
        switch (action.type) {
            case 'TICK':
                if (sessionTime >= 0) {
                    setSessionTime(sessionTime - 1)
                } else if (breakTime >= 1) {
                    setBreakTime(breakTime - 1)
                } else if (breakTime <= 0 && sessionTime <= 0) {
                    setSessionTime(setSessionTimeFixed)
                    setBreakTime(breakTimeFixed);
                }
                break;
            default: {

            }
        }
    }

    const handleSession = (e) => {
        const el = e.target;
        if(el.classList.contains('minus')) {
            if(sessionTime / 60 > 1) {
                setSessionTime(sessionTime - 60);
                setSessionTimeFixed(sessionTimeFixed - 60)
            }
        } else if (el.classList.contains('plus')){
            setSessionTime(sessionTime + 60);
            setSessionTimeFixed(sessionTimeFixed + 60)
        }
    }

    const handleBreak = (e) => {
        const el = e.target;
        if(el.classList.contains('minus')) {
            if(breakTime / 60 > 1) {
                setBreakTime(breakTime - 60);
                setBreakTimeFixed(breakTimeFixed - 60)
            }
        } else if (el.classList.contains('plus')){
            setBreakTime(breakTime + 60);
            setBreakTimeFixed(breakTimeFixed + 60)
        }
    }


    useEffect(() => {
        let id;
        if (workingChrono) {
            id = window.setInterval(() => {
                dispatch({
                    type: 'TICK',
                })

            }, 1000);
        }
        return () => {
            window.clearInterval(id);
        }
    }, [workingChrono])

    const resetFunc = () => {
        if(workingChrono) {
            setWorkingChrono(!workingChrono)
        }
        setSessionTime(sessionTimeFixed)
        setBreakTime(breakTimeFixed)

    }


    return (
        <div className={workingChrono ? 'container-chrono anim-glow' : 'container-chrono'}>

            <div className='container-config'>

                <div className='box-btns session'>

                    <button className='minus' onClick={(e) => handleSession(e)}>
                        -
                    </button>
                    <span>{sessionTimeFixed / 60}</span>
                    <button className='plus' onClick={(e) => handleSession(e)}>
                        +
                    </button>
                </div>
                <div className='box-btns break'>

                    <button className='minus' onClick={(e) => handleBreak(e)}>
                        -
                    </button>
                    <span>{breakTimeFixed / 60}</span>
                    <button className='plus' onClick={(e) => handleBreak(e)}>
                        +
                    </button>
                </div>

            </div>
            <h1>
                {sessionTime >= 0 ? (
                    <span>
                        {`${Math.trunc(sessionTime / 60)}:${sessionTime % 60 < 10 ? `0${sessionTime % 60}` : `${sessionTime % 60}`}`}
                    </span>
                ) :
                    <span>
                        {`${Math.trunc(breakTime / 60)}:${breakTime % 60 < 10 ? `0${breakTime % 60}` : `${breakTime % 60}`}`}
                    </span>
                }
            </h1>
            <div className='container-controllers'>
                <button>
                    <img src={workingChrono ? PauseImg : PlayImg} alt="" onClick={playPause} />
                </button>
                <button onClick={resetFunc}>
                    <img src={ResetImg} alt="" />
                </button>
            </div>

        </div>
    )
}
