import 'babel-polyfill';
import dva from 'dva';
import 'moment/locale/zh-cn';
import './g2';
import './rollbar';
// import browserHistory from 'history/createBrowserHistory';
import './index.less';
import router from './router';

// 1. Initialize
const app = dva({
  // history: browserHistory(),
});

// 2. Plugins
// app.use({});

// 3. Register global model
app.model(require('./models/global.js'));
app.model(require('./models/login.js'));
app.model(require('./models/newest.js'));
app.model(require('./models/hotest.js'));
app.model(require('./models/mostest.js'));
app.model(require('./models/allfriend.js'));
app.model(require('./models/friend.js'));
app.model(require('./models/following.js'));
app.model(require('./models/followers.js'));
app.model(require('./models/posting.js'));
app.model(require('./models/choice_img.js'));

// 4. Router
app.router(router);

// 5. Start
app.start('#root');
