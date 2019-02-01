// These constants are injected via webpack environment variables.
// You can add more variables in webpack.common.js or in profile specific webpack.<dev|prod>.js files.
// If you change the values in the webpack config files, you need to re run webpack to update the application
export const VERSION = '';
export const DEBUG_INFO_ENABLED = false;
export const SERVER_API_URL = '';
export const BUILD_TIMESTAMP = '';
// todo 打包时根据服务器进行修改
export const BASE_API_URL = 'http://192.168.0.127:8089/';
// 图片上传s
export const IMAGE_API_URL = 'http://www.berbuy.com:4869/'; // 图片上传接口的base url
// export const UPLOAD_IMAGE_API = 'base/api/image/upload'; // 图片上传接口
// POST /api/images/upload
export const UPLOAD_IMAGE_API = 'baseservice/api/images/upload'; // 图片上传接口
// 登录模块接口
//忘记密码--重置 PUT /api/users/resetPasswordTo
export const RESETPASSWORD_API = 'usercenterservice/api/users/resetPasswordTo';
//发送手机验证码 POST /api/aliSms/sendVerification
export const SENDVERIFICATION_API = 'baseservice/api/aliSms/sendVerification';
//个人信息模块
// 基本设置--更改基本信息 同// 权限管理--人员管理
//安全设置--修改密码 POST /api/account/change-password
export const CHANGE_PASSWORD_API = 'usercenterservice/api/account/change-password';
// 系统模块接口
//     权限管理
// baseservice下
// 权限管理--角色管理--获取所有角色 usercenterservice GET /api/users/business-authorities
export const ROLES_API = 'usercenterservice/api/users/business-authorities';
//usercenterservice下
//  权限管理--角色管理--创建  PUT /api/users/createAuthority
export const ROLES_CREATE_API = 'usercenterservice/api/users/createAuthority';
//  权限管理--角色管理--删除 DELETE /api/users/deleteAuthority
export const ROLES_DELETE_API = 'usercenterservice/api/users/deleteAuthority';
//     人员管理  组合角色管理 机构管理的接口
// 权限管理--人员管理GET /api/users
export const PERSONNEL_API = 'usercenterservice/api/users';
// 权限管理--人员管理--查询 GET /api/users/searchBy
export const PERSONNEL_SEARCH_API = 'usercenterservice/api/users/searchBy';
// 权限管理--关联--人员管理 baseservice 下 user-by-company-resource的 /api/user-by-companies
export const PERSONNEL_COMPANY_API = 'baseservice/api/user-by-companies';//人员关联机构
// 权限管理--关联--人员管理 机构中移除用户 DELETE /api/user-by-companies/removeUser
export const PERSONNEL_COMPANY_DELETE_USER_API = 'baseservice/api/user-by-companies/removeUser';
// 权限管理--关联--人员管理 获取所有人员 GET /api/user-bycompanies/getAllUsers
export const PERSONNEL_GET_USERS_API = 'baseservice/api/user-bycompanies/getAllUsers';
// 权限管理--关联--人员管理 修改密码 PUT /api/users/changePasswordByLogin
export const PERSONNEL_MODIFY_PASSWORD_API = 'usercenterservice/api/users/changePasswordByLogin';
//     机构管理
// 权限管理--机构管理 GET /api/companies
export const COMPANY_API = 'baseservice/api/companies';
// 权限管理--机构管理--获取机构子节点 GET /api/companise/findAllByParent
export const COMPANY_FINDALL_BY_PARENT_API = 'baseservice/api/companise/findAllByParent';
// 权限管理--机构管理--PUT /api/user-by-companies/batchJoinUser 批量添加人员到机构
export const BATCH_JOIN_USER_API = 'baseservice/api/user-by-companies/batchJoinUser';
// 权限管理--机构管理--获取指定机构下的用户login列表 GET /api/user-by-companies/findAllByCompanyAccount
export const FINDLOGIN_BY_COMPANYID_API = 'baseservice/api/user-by-companies/findAllByCompanyAccount';
// 权限管理--机构管理--获取parentId GET /api/user-by-companies/findByLogin
export const COMPANY_FIND_PARENT_ID_API = 'baseservice/api/user-by-companies/findByLogin';
//   用户管理
// 用户管理--用户中心，个人信息 获取个人获取用户列表 GET /api/users
export const USERCENTER_API = 'usercenterservice/api/users';
//   系统设置
// 系统设置--数据字典 GET /api/dictionaries
export const DICTIONARY_API = 'baseservice/api/dictionaries';
