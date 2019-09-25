import RegisterPage from '../page/registerPage.vue'
import LoginPage from '../page/loginPage.vue'
import Repassword from '../page/repassword.vue'
import UserInfo from '../page/userInfo.vue'
import UserProfile from '../components/user/UserProfile.vue'
import UserSquare from '../components/user/UserSquare.vue'
import UserDiary from '../components/user/UserDiary.vue'
import UserArticle from '../components/user/UserArticle.vue'
import SendEmail from '../page/sendEmail.vue'
import InBox from '../components/InBox.vue'
import SendTalkBox from '../components/email/SendTalkBox.vue'
import FollowList from '../components/email/FllowList.vue'
import BlackList from '../components/email/BlackList.vue'
import UserAccount from '../page/userAccount.vue'
import JunkEmail from '../components/email/JunkEmail.vue'
export default[
	{
      path: '/userAccount/:id',
      name: 'userAccount',
      component: UserAccount
    },
	{
      path: '/loginPage',
      name: 'loginPage',
      component: LoginPage
    },
    {
      path: '/registerPage',
      name: 'registerPage',
      component: RegisterPage
    },
     
    {
      path: '/repassword',
      name: 'repassword',
      component: Repassword
    },
     {
      path: '/userInfo/:id',
      name: 'userInfo',
      component: UserInfo,
      children:[
        {
          path:'',
          component:UserProfile

        },
        {
          path:'article',
          component:UserArticle
        },
        {
          path:'square',
          component:UserSquare
        },
        {
          path:'diary',
          component:UserDiary
        }
      ]
    },
    {
      path: '/sendEmail',
      name: 'sendEmail',
      component: SendEmail,
      children:[
        {
          path:'',
          component:InBox
        },
        {
          path:'sendtalkbox',
          component:SendTalkBox
        },
        {
          path:'followlist',
          component:FollowList
        },
        {
          path:'blacklist',
          component:BlackList
        },
        {
          path:'junkemail',
          component:JunkEmail
        }
      ]
    }
]