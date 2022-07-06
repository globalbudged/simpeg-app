import { Notify, Loading, QSpinnerCube } from 'quasar'

const notifErr = (resp) => {
  const msg = resp ? resp.data.message : 'Ada Kesalahan, Harap ulamgi!'
  const status = resp.status
  //   if (status === 200) {

  if (status === 422) {
    const msgs = resp.data.errors
    for (const key in msgs) {
      Notify.create({
        message: msgs[key][0],
        icon: 'sms_failed',
        position: 'bottom-right',
        color: 'negative',
        actions: [
          { label: 'Dismiss', color: 'yellow', handler: () => { /* console.log('wooow') */ } }
        ]
      })
    }
  } else {
    Notify.create({
      message: msg,
      icon: 'sms_failed',
      position: 'bottom-right',
      color: 'negative',
      actions: [
        { label: 'Dismiss', color: 'yellow', handler: () => { /* console.log('wooow') */ } }
      ]
    })
  }
}
const notifSuccess = (resp) => {
  const msg = resp ? resp.data.message : 'Sucees Wow!, Kerja Bagus!'
  Notify.create({
    message: msg,
    icon: 'thumb_up',
    position: 'bottom-right',
    actions: [
      { label: 'Dismiss', color: 'yellow', handler: () => { /* console.log('wooow') */ } }
    ]
  })
}
const notifErrVue = (msg) => {
  Notify.create({
    message: msg,
    icon: 'sms_failed',
    position: 'bottom-right',
    color: 'negative',
    actions: [
      { label: 'Dismiss', color: 'yellow', handler: () => { /* console.log('wooow') */ } }
    ]
  })
}

const waitLoad = (cond) => {
  if (cond === 'show') {
    Loading.show({
      message: 'Harap bersabar. Menunggu...',
      boxClass: 'bg-primary text-white',
      spinner: QSpinnerCube,
      spinnerColor: 'yellow'
    })
  } else {
    Loading.hide()
  }
}

export { notifSuccess, notifErr, notifErrVue, waitLoad }
