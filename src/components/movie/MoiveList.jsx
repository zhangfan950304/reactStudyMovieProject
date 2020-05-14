
 import React from 'react'
 import {HashRouter,Route,Link} from 'react-router-dom'
 import { Spin,Alert,Pagination } from 'antd'
 import fetchJSONP from 'fetch-jsonp'
 import MovieItem from './MovieItem.jsx'
 
export default class MoiveList extends React.Component{
	constructor(props){
		super(props)
		this.state={
			movies:[],//电影列表
			nowPage:parseInt(props.match.params.page) || 1,//当前显示第几页的数据
			pageSize:10, //每页显示多少数据
			total:0,  //当前由多少条数据
			isloading:true,  //true表示正在加载数据
			movieType:props.match.params.type  //保存要加载的电影类型
		}
	}

	componentWillMount(){
    	this.loadMovieListByTypeAndPage()

	}
	componentWillReceiveProps(nextProps){
		this.setState({
			isloading:true,
			nowPage:parseInt(nextProps.match.params.page) || 1,
			movieType:nextProps.match.params.type,
		},function(){
			this.loadMovieListByTypeAndPage()
		})
	}
	render(){
		return <div>
			{this.renderList()}
		</div>
	}
	
	//渲染电影列表的方法
	renderList=()=>{
	   if(this.state.isloading){
	       return <Spin tip="Loading...">
			    <Alert
			      message="正在请求电影列表"
			      description="精彩内容，马上呈现..."
			      type="info"
			    />
			  </Spin>
	   }else{//数据加载完成
	       return <div>
	       <div style={{display:'flex',flexWrap:'wrap'}}>
	       		{this.state.movies.map(item=>{
	       			return <MovieItem {...item} key={item.id} history={this.props.history}></MovieItem>
	       			
	       		})}
	       </div>
	       <Pagination defaultCurrent={this.state.nowPage} total={this.state.total} onChange={this.pageChanged}/>
	       </div>

	   }
	}
	//分页绑定事件
	pageChanged=(page)=>{
		//window.loaction.href='/#/movie/'+this.state.movieType+'/'+page
		this.props.history.push('/movie/'+this.state.movieType+'/'+page)

	}
	//根据电影的类型和页码，获取电影数据
	loadMovieListByTypeAndPage=()=>{
		const start = this.state.pageSize*(this.state.nowPage-1)
		const url =`http://api.douban.com/v2/movie/${this.state.movieType}?apikey=0df993c66c0c636e29ecbb5344252a4a&start=${start} &count=${this.state.pageSize}`
		console.log(url)
		fetchJSONP(url)
		.then(response=>response.json())
		.then(data=>{
			
			this.setState({
				isloading:false,
				movies:data.subjects,
				total:data.total

			})
		})
	}
}