 import React from 'react'
 import { Spin,Alert,Button, Icon} from 'antd';
 import {HashRouter,Route,Link} from 'react-router-dom'
 import fetchJSONP from 'fetch-jsonp'

 
export default class MoiveDetile extends React.Component{
	constructor(props){
		super(props)
		this.state={
			info:{},
			isloading:true
		}
	}

	 componentWillMount(){
	 	const url=`https://api.douban.com/v2/movie/subject/${this.props.match.params.id}?apikey=0df993c66c0c636e29ecbb5344252a4a`
		fetchJSONP(url).then(response=>response.json())
		.then(data=>{
			this.setState({
				info:data,
				isloading:false
			})
		})
	 }
	render(){
		return <div>
		 <Button type="primary" onClick={this.goBack}>
            <Icon type="left" />
           返回电影列表页面
          </Button>
			{this.renderDetialInfo()}
		</div>
	}

	goBack=()=>{
		this.props.history.go(-1)
	}
	 renderDetialInfo=()=>{
	    if(this.state.isloading){
	       return <Spin tip="Loading...">
			    <Alert
			      message="正在请求电影列表"
			      description="精彩内容，马上呈现..."
			      type="info"
			    />
			  </Spin>
	     }else{
	     	return <div style={{textAlign:'center'}}>
	     				<h1 style={{fontSize:'25px'}}>{this.state.info.title}</h1>
		   			 	<img style={{width:'150px',height:'200px'}} src={this.state.info.images.large.replace('img9.doubanio.com','img1.doubanio.com')}/>
		    			<p style={{textIndent:'2em',lineHeight:'30px'}}>{this.state.info.summary}</p>
		    		</div>
	     }
	 }
	
}