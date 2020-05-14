import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: ()=>
        import ('@/components/Login.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: ()=>
        import ('@/components/Login.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: ()=>
        import ('@/components/Register.vue'),
    },
    {
      path: '/homepage',
      name: 'homepage',
      component: ()=>
        import ('@/components/homepage/HomePage.vue'),
        redirect:'homepage/userpage',
      children:[
        {
          path: 'userpage',
          name: 'userpage',
          component: ()=>
            import ('@/components/homepage/userPage/UserPage.vue'),
        },
        {
          path: 'adminpage',
          name: 'adminpage',
          component: ()=>
            import ('@/components/homepage/adminpage/AdminPage.vue'),
            redirect:'adminpage/work',
            children:[
              {
                path: 'work',
                name: 'work',
                component: ()=>
                import ('@/components/homepage/adminpage/AllWorks.vue'),  
                children:[
                  {
                    path: 'alterhomework',
                    name: 'alterhomework',
                    component: ()=>
                      import ('@/components/homepage/adminpage/Alterhomework.vue'),
                  } ,
                  {
                    path: 'detail',
                    name: 'detail',
                    component: ()=>
                      import ('@/components/homepage/adminpage/detail.vue'),
                  },       
                ]    
              }, 
              // {
              //   path: 'detail',
              //   name: 'detail',
              //   component: ()=>
              //     import ('@/components/homepage/adminpage/detail.vue'),
              // }, 
              // {
              //   path: 'addhomework',
              //   name: 'addhomework',
              //   component: ()=>
              //     import ('@/components/homepage/adminpage/addhomework.vue'),
              // }   
              
            ]
        }
      ]
    },
  ]
})
