import React from 'react';
import Card from './Post Animation'


class Post extends React.Component {
    constructor(){
        super()
        this.state = {
        }
    }


    componentDidMount(){
        console.log(this.props.listid)
    }

    render(){

        return(
            <Card title={this.props.title} listid={this.props.listid}></Card>
        )
    }
}


export default Post