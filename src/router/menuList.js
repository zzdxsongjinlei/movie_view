export default menuList: [
                {
                  id: 0,
                  type: 'item',
                  index: 'home',
                  lable: '首页',
                  icon: 'el-icon-circle-plus-outline',
                  route: {
                    type: 'inner',
                    path: {name: 'KgGainIframe', params: {'postfix': 'D2R'}}
                  }
                },
                {
                  id: 1,
                  type: 'submenu',
                  index: 'news',
                  lable: '新闻',
                  icon: 'ic-association-analysis',
                  childs: [
                    {
                      id: 0,
                      type: 'item',
                      index: 'addNews',
                      lable: '发布新闻',
                      route: {
                        type: 'inner',
                        path: {name: 'KgAddNews'}
                      }
                    },
                    {
                      id: 1,
                      type: 'item',
                      index: 'newsList',
                      lable: '新闻列表',
                      route: {
                        type: 'inner',
                        path: {name: 'KgNewsList'}
                      }
                    }
                  ]
                }
           ] 
       
