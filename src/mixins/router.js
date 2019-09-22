router.beforeEach(async (to, from, next) => {
    if (to.matched.some(recode => recode.meta.noAuth)) {
      next()
    } else {
      // store已存在用户信息直接进入页面
      if (store.state.userInfo.nickname) {
        next()
        return
      }
      const code = getUrl(window.location.href).code // 截取url上的code ,可能没有,则返回''空字符串
      let res = await api.post('/imsl/user/user-auth', {code}) // 获取用户信息,后端可首先通过cookie,session等判断,没有信息则通过code获取
      console.log(res)
      // 返回用户信息
      if (res.code === 200 && res.data.is_auth) {
        store.commit('setUserInfo', res.data)
        next()
      } else {
        // 此状态根据业务需求 可能不存在
        if (res.code === 201) {
          const openid = res.data.openid
          console.log(openid)
          store.commit('setOpenid', openid)
          localStorage.setItem('openid', openid)
          next('/enlist-info')
        }
        // 上面的获取用户信息接口,如果cookie,session拿不到用户信息,且传递的code为空,则跳转到微信授权页面
        if (res.code === 202) {
          console.log(window.location.origin)
          console.log(to.fullPath)
          // 这个redirectUrl用 当前页路径或者tof.fullPath(将要进入的路径)
          let redirectUrl = window.location.href
          redirectUrl = encodeURIComponent(redirectUrl)
          console.log(redirectUrl)
          const appid='wxdff0642c2120ea39'
          window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirectUrl}&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect`
        }
      }
    }
  })