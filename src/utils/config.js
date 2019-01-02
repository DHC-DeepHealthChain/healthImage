const APIV1 = 'http://121.40.184.139:18010/api';
// const APIV1 = 'http://localhost:18010/api';

// const APIV1 = 'http://121.40.184.139:19010/api';
module.exports = {
  name: '健康宝',
  logoInfo: '健康宝',
  basePath: '',
  prefix: '健康宝',
  logo: './logo.png',
  footerText: '点点看 © 2018技术支持',
  YQL: ['http://www.zuimeitianqi.com'],
  CORS: ['http://localhost:7000'],
  openPages: ['/user/login', '/user/register', 'user/register-result'],
  apiPrefix: '/api/v1',
  host: APIV1,
  provider: 'http://localhost:8545',
  api: {
    user: `${APIV1}/users/:id`, // 用户注册
    userLogin: `${APIV1}/auth/login`, // 用户登录
    blocks: `${APIV1}/blocks`, // 获取区块信息
    transaction: `${APIV1}/transactions`, // 所有交易信息
    personalTransaction: `${APIV1}/transactions/my`, // 个人交易信息
    documentUpload: `${APIV1}/healthyDocument`, // 上传健康文档
    auth: `${APIV1}/auth/random-number`, // jwt验证
    ipfs: `${APIV1}/ipfs`, // 上传ipfs信息
  },
};
