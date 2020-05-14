 import React from 'react'
 import {Route,Link,Switch} from 'react-router-dom'
 import { Layout, Menu} from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import MoiveList from "./MoiveList.jsx"
import MoiveDetile from "./MoiveDetile.jsx"

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
 
export default class MovieContainer extends React.Component{
	constructor(props){
		super(props)
		this.state={}
	}

	render(){
		return <Layout style={{height:'100%'}}>
      <Sider width={200} className="site-layout-background" >
        <Menu
          mode="inline"
          defaultSelectedKeys={[window.location.hash.split("/")[2]]}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}
        >
          
            <Menu.Item key="in_theaters"><Link to="/movie/in_theaters/1">正在热映</Link></Menu.Item>
            <Menu.Item key="coming_soon"><Link to="/movie/coming_soon/1">即将上映</Link></Menu.Item>
            <Menu.Item key="top250"><Link to="/movie/top250/1">正在热映</Link></Menu.Item>
           
        </Menu>
      </Sider>
      <Layout style={{paddingLeft:'1px' }}>
         <Content style={{ backgroundColor:'#fff',padding:10}}>
           {/*在匹配路由规则的时候，这里提供了两个参数，要想从路由中提取参数，使用this.props.match.params.XXX*/}
           <Switch>
            <Route path="/movie/detail/:id" component={MoiveDetile}></Route>
            <Route path="/movie/:type/:page" component={MoiveList}></Route>
            
             </Switch>
         </Content>
      </Layout>
    </Layout>
	}
}