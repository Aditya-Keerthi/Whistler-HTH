import React, { useState } from 'react';
import { useSpring, animated, config } from 'react-spring';
import '../css/Post.css'
import Lock from './Locked.svg'
import Unlock from './Unlocked.svg'
import File from './File.svg'


const Card = (props) => {
  const [hover, setHover] = useState(false)
  const hoverState = useSpring({
    transform: hover
      ? 'translate3d(0px, -12px, 0px) scale(1.03)'
      : 'translate3d(0px, 0px, 0px) scale(1)',
    /*boxShadow: hover
    ? '-1px 15px 45px 0px rgba(0, 0, 0, 0.3)'
    : '-1px 10px 45px 0px rgba(0, 0, 0, 0.1)',*/
    config: config.wobbly
  })

  const [checked, setChecked] = useState(false)

/*
  const [click, setClick] = useState(false)
  const clickState = useSpring({
    transform: click
      ? 'scale(2)'
      : 'scale(1)',
    zIndex: click
    ? '10'
    : '1',

    config: config.wobbly
  })
*/

  return (
    <animated.div
      style={{
        ...hoverState
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}

    >
            <div className="post-div">
                <div className="post-title-div">
                    {props.title}   
                </div>
                <div className="post-file-div">
                <a href="https://gateway.ipfs.io/ipfs/QmbzHvRE4qDpNcyDj1eQTtC2P7MJTkd189zA5acULuseup"><img src={File} width='50px'></img></a>

                <img className='lock-div' src={ checked ? Lock : Unlock} width='30px' onClick={ () => setChecked(!checked)}></img>
                </div>
            </div>
    </animated.div>
  )
}

export default Card
