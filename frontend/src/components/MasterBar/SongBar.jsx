import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineHeart, AiOutlinePlaySquare, AiOutlineArrowsAlt } from 'react-icons/ai'
import { CgScreen } from 'react-icons/cg'
import { BiShuffle, BiRepeat } from 'react-icons/bi'
import { IoMdSkipForward, IoMdSkipBackward } from 'react-icons/io'
import { PiMicrophoneStageDuotone } from 'react-icons/pi'
import { FaPause, FaPlay } from 'react-icons/fa'
import { HiMiniQueueList, HiSpeakerWave, HiSpeakerXMark } from 'react-icons/hi2'
import { BsFillSpeakerFill } from 'react-icons/bs'
import { pauseMaster, playMaster, playSong } from '../../states/actors/songActor'
import { useGlobalContext } from '../../states/Context'
import "./SongBar.css"
import { songs } from '../Home/Home'

const SongBar = () => {
    const dispatch = useDispatch()
    const { progress, setProgress, resetEverything, currTime, setCurrTime, songIdx, setSongIdx, duration, setDuration } = useGlobalContext()

    const handleMaster = () => {
        if (isPlaying)
            dispatch(pauseMaster())
        else
            dispatch(playMaster())
    }

    const { masterSong, isPlaying } = useSelector(state => state.mainSong)
    useEffect(() => {
        if (masterSong.mp3) {
            setDuration(formatTime(masterSong?.mp3?.duration))
            if (isPlaying) {
                masterSong?.mp3?.play();
            } else {
                masterSong?.mp3?.pause();
            }
        }

        const interval = setInterval(() => {
            if (isPlaying && masterSong.mp3) {
                if (progress === 100) {
                    dispatch(pauseMaster());
                    resetEverything();
                } else {
                    setProgress(Math.round((masterSong.mp3.currentTime / masterSong.mp3.duration) * 100));
                }
                setCurrTime(formatTime(masterSong.mp3.currentTime));
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [masterSong, isPlaying])

    const changeProgress = (e) => {
        setProgress(e.target.value)
        masterSong.mp3.currentTime = (e.target.value / 100) * masterSong.mp3.duration
    }

    const [volume, setVolume] = useState(50)
    const changeVolume = (e) => {
        setVolume(e.target.value)
        masterSong.mp3.volume = e.target.value / 100
    }

    const formatTime = (durationInseconds) => {
        let min = Math.floor(durationInseconds / 60)
        let sec = Math.round(durationInseconds % 60)

        let formattedDuration = `${min < 10 ? "0" + min : min}:${sec < 10 ? "0" + sec : sec}`

        return formattedDuration
    }

    const mouseEnter = () => {
        document.querySelector(".active_progress").style.background = "#9b5de5"
    }
    const mouseLeave = () => {
        document.querySelector(".active_progress").style.background = "#fff"
    }

    const enterVolume = () => {
        document.querySelector("#volume").style.background = "#9b5de5"
    }
    const leaveVolume = () => {
        document.querySelector("#volume").style.background = "#fff"
    }

    const forwardSong = () =>{
        if(masterSong.mp3){
            masterSong?.mp3?.pause()
            masterSong.mp3.currentTime = 0
        }
        resetEverything()
        setSongIdx((prevstate) => prevstate+1)
        dispatch(playSong(songs[songIdx+1]))
    }

    const backwardSong = () =>{
        if(masterSong.mp3){
            masterSong?.mp3?.pause()
            masterSong.mp3.currentTime = 0
        }
        resetEverything()
        setSongIdx((prevstate) => prevstate-1)
        dispatch(playSong(songs[songIdx-1]))
    }
    return (
        <div className='fixed px-2 bottom-0 flex items-center justify-between left-0 h-20 bg-[#ede4ff] w-full'>
            <div className="w-2/12">
                <div className="flex gap-2 items-center">
                    <img src={masterSong.img} alt="" className='h-14' />
                    <div className="">
                        <h3 className='text-sm font-semibold mb-1 text-black'>{masterSong?.title || "My Life"}</h3>
                        <span className='text-xs text-black'>{masterSong.artist || "Prathamesh Sirdesai"}</span>
                    </div>
                    <AiOutlineHeart className='ml-3 text-2xl text-black' />
                    <CgScreen className='ml-3 text-2xl text-black' />
                </div>
            </div>
            <div className="w-5/12">
                <div className="flex justify-center items-center gap-6 mb-2 text-black">
                    <BiShuffle />
                    <IoMdSkipBackward onClick={backwardSong}/>
                    {
                        isPlaying
                            ?
                            (<button onClick={handleMaster} className='flex justify-center rounded-full items-center bg-purple-600 p-2'>
                                <FaPause className='text-white text-lg' />
                            </button>)
                            :
                            (<button onClick={handleMaster} className='flex justify-center rounded-full items-center bg-purple-600 p-2'>
                                <FaPlay className='text-white text-lg' />
                            </button>)
                    }
                    <IoMdSkipForward onClick={forwardSong}/>
                    <BiRepeat />
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-black">{currTime}</span>
                    <div className="relative w-full flex item-center">
                        <input type="range" min={0} max={100} value={progress} disabled={!masterSong.mp3} onChange={changeProgress} onMouseLeave={mouseLeave} onMouseEnter={mouseEnter} className='w-full' name="" id="progress_bar" />
                        <div className={`active_progress w-[${progress}%]`}></div>
                    </div>
                    <span className="text-sm text-black">{duration}</span>
                </div>
            </div>
            <div className="w-2/12 flex items-center gap-2 text-5xl text-black">
                <AiOutlinePlaySquare />
                <PiMicrophoneStageDuotone />
                <HiMiniQueueList />
                <BsFillSpeakerFill />
                {volume <= 0 && <HiSpeakerXMark />}
                {volume > 0 && <HiSpeakerWave />}
                <div className="relative w-full flex items-center">
                    <input type="range" min={0} max={100} value={volume} disabled={!masterSong.mp3} onChange={changeVolume} className='w-full block' name="" id="" onMouseLeave={leaveVolume} onMouseEnter={enterVolume} />
                    <div className={`active_progress w-[${volume}%]`} id='volume'></div>
                </div>
                <AiOutlineArrowsAlt />
            </div>
        </div>
    )
}

export default SongBar
