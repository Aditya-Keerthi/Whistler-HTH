import React from 'react';
import '../css/Feed.css'
import Post from './Post.js';
import UploadFileButton from './Button.js'
import JSON from './dummy.json'
import { Spring } from 'react-spring/renderprops'
import mySvg from '../Whistle.svg'

class Feed extends React.Component {
    constructor(){
        super()
        this.state = {
            posts: []
        }
    }

    render(){
        return(
            <div className="app-div">
                <Spring
                    config = {{delay: 200, tension: 100}}
                    from={{ opacity: 0 }}
                    to={{ opacity: 1 }}>
                    {props => 
                    <div style={props}>
                        <img className='logo'src={mySvg} width="300px"/>
                    </div>
                    }
                </Spring>  







                <div  className="feed-div">


                    <div className="posts-div">

                        {JSON.map( (data, index) => {
                            console.log(index)
                            return(
                                <Spring
                                    config = {{delay: 500 + 100*index, tension: 100}}
                                    from={{ opacity: 0 }}
                                    to={{ opacity: 1 }}
                                    key={index}>
                                    {props => 
                                    <div style={props}>
                                            <Post title={data.title} key={index} listid={index}></Post>
                                    </div>
                                    }
                                </Spring>  
                            )
                        } )}

                    </div>

                    <div className="button-div">
                        <UploadFileButton></UploadFileButton>
                    </div>
                </div>
            </div>
        )
    }
}


export default Feed