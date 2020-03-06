import Vue from "vue";
import Router from "vue-router";
import FrontPage from "../views/FrontPage.vue";
import Home from "@/views/Home.vue";
import About from "@/views/About.vue";
import CommandCenter from "@/views/CommandCenter.vue";
import SignUp from "../components/front/SignUp.vue";
import SignUpSecond from "../components/front/SignUpSecond.vue";
import NoticeInsert from "../components/commandCenter/NoticeInsert.vue";
import NoticeDetail from "../components/commandCenter/NoticeDetail.vue";
import NoticeUpdate from "../components/commandCenter/NoticeUpdate.vue";
import FeedbackInsert from "../components/commandCenter/FeedbackInsert.vue";
import FeedbackDetail from "../components/commandCenter/FeedbackDetail.vue";
import FindPassword from "../components/front/FindPassword.vue";
import AuctionDetail from "../components/home/AuctionDetail.vue";
import Payment from "../components/home/Payment.vue";
import PaymentSucc from "../components/home/PaymentSucc.vue";
import Progress from "../components/home/Progress.vue";
import Message from "../components/home/Message.vue";
import store from "@/store/index";
import Menual from "@/components/front/Menual.vue";
import errorPage from "@/components/Error.vue";

Vue.use(Router);

const requireAuth = () => (to, from, next) => {
  if (store.state.isAuth) {
    return next();
  }
  next("/");
};

export default new Router({
  routes: [
    {
      path: "/menual",
      name: "Menual",
      component: Menual
    },
    { path: "*", component: errorPage },
    {
      path: "/",
      redirect: "/login"
    },
    {
      path: "/Auction",
      redirect: "/Home"
    },
    {
      path: "/Profile",
      redirect: "/Home"
    },
    {
      path: "/PhotoGrid",
      redirect: "/Home"
    },
    {
      path: "/Message",
      redirect: "/Home"
    },
    {
      path: "/ProfileModify",
      redirect: "/About"
    },
    {
      path: "/AuctionRegist",
      redirect: "/About"
    },
    {
      path: "/AuctionCancel",
      redirect: "/About"
    },
    {
      path: "/feedback",
      redirect: "/CommandCenter"
    },
    {
      path: "/faq",
      redirect: "/CommandCenter"
    },
    {
      path: "/notice",
      redirect: "/CommandCenter"
    },
    {
      path: "/login",
      name: "FrontPage",
      component: FrontPage
    },
    {
      path: "/SignUp",
      name: "SignUp",
      component: SignUp,
      props: true
    },
    {
      path: "/SignUpSecond",
      name: "SignUpSecond",
      component: SignUpSecond,
      props: true
    },
    {
      path: "/FindPassword",
      name: "FindPassword",
      component: FindPassword
    },
    {
      path: "/Home",
      name: "Home",
      props: { page: "Home" },
      component: Home,
      beforeEnter: requireAuth()
    },
    {
      path: "/About",
      name: "About",
      component: About,
      beforeEnter: requireAuth()
    },
    {
      path: "/CommandCenter",
      name: "CommandCenter",
      component: CommandCenter,
      beforeEnter: requireAuth()
    },
    {
      path: "/NoticeInsert",
      name: "NoticeInsert",
      component: NoticeInsert,
      beforeEnter: requireAuth()
    },
    {
      path: "/NoticeDetail",
      name: "NoticeDetail",
      component: NoticeDetail,
      props: true,
      beforeEnter: requireAuth()
    },
    {
      path: "/NoticeUpdate",
      name: "NoticeUpdate",
      component: NoticeUpdate,
      props: true,
      beforeEnter: requireAuth()
    },
    {
      path: "/FeedbackDetail",
      name: "FeedbackDetail",
      component: FeedbackDetail,
      props: true,
      beforeEnter: requireAuth()
    },
    {
      path: "/FeedbackInsert",
      name: "FeedbackInsert",
      component: FeedbackInsert,
      beforeEnter: requireAuth()
    },
    {
      path: "/Payment/:auctionId",
      name: "Payment",
      component: Payment,
      props: true
    },
    {
      path: "/PaymentSucc",
      name: "PaymentSucc",
      component: PaymentSucc
    },
    {
      path: "/AuctionDetail/:auctionId",
      name: "AuctionDetail",
      component: AuctionDetail,
      props: true,
      beforeEnter: requireAuth()
    },
    {
      path: "/Progress/:auctionId",
      name: "Progress",
      component: Progress,
      props: true
    },
    {
      path: "/Message",
      name: "Message",
      component: Message
    }
  ]
});
