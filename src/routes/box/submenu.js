import { Menu, Icon, Button } from 'antd';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
const SubMenu = Menu.SubMenu;

class Sub extends React.Component {
  state = {
    collapsed: false,
  }
  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  MenuItemEvent ({key}) {
    console.log(key);
    if (key !== '/main') this.props.dispatch(routerRedux.push(key));
  }
  render() {
    return (
      <div style={{ width: 256 }}>
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
          onClick={this.MenuItemEvent.bind(this)}
          inlineCollapsed={this.state.collapsed}
        >
          <Menu.Item key="/main"><Icon type="pie-chart" /><span>首页</span></Menu.Item>
          <SubMenu key="sub2" title={<span><Icon type="mail" /><span>逛圈子</span></span>}>
            <Menu.Item key="/newest">最新动态</Menu.Item>
            <Menu.Item key="/hotest">最热动态</Menu.Item>
            <Menu.Item key="/mostest">对多评论</Menu.Item>
            <Menu.Item key="/allfriend">所有圈友</Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" title={<span><Icon type="mail" /><span>我的圈子</span></span>}>
            <Menu.Item key="/friend">我的圈友</Menu.Item>
            <Menu.Item key="/following">我的关注</Menu.Item>
            <Menu.Item key="/followers">我的粉丝</Menu.Item>
          </SubMenu>
          <SubMenu key="sub4" title={<span><Icon type="mail" /><span>个人中心</span></span>}>
            <Menu.Item key="/posting">写分享</Menu.Item>
            <Menu.Item key="/posted">我分享的</Menu.Item>
            <Menu.Item key="/likes">我点赞的</Menu.Item>
            <Menu.Item key="/comments">我评论的</Menu.Item>
            <Menu.Item key="/space">私人空间</Menu.Item>
            <Menu.Item key="/gallery">我的图库</Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    );
  }
}

export default connect(state => ({
}))(Sub);
