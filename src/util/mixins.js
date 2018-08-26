import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
TimeAgo.locale(en)
const timeAgo = new TimeAgo('en-US')
const $ = require('jquery')
const toastr = require('toastr')

const mixins = {
  isLocalAddress (host) {
    return host === '0.0.0.0' || host === 'localhost'
  },

  textEllipsis (str, maxLength, { side = 'end', ellipsis = '...' } = {}) {
    if (str.length > maxLength) {
      switch (side) {
        case 'start':
          return ellipsis + str.slice(-(maxLength - ellipsis.length))
        case 'end':
        default:
          return str.slice(0, maxLength) + ellipsis
      }
    }
    return str
  },

  truncateNumber (num, digits) {
    var re = new RegExp('^-?\\d+(?:.\\d{0,' + (digits || -1) + '})?')
    return num.toString().match(re)[0]
  },

  formatNumber (n, c, d, t) {
    var i, j, s
    c = isNaN(c = Math.abs(c)) ? 2 : c
    d = d === undefined ? '.' : d
    t = t === undefined ? ',' : t
    s = n < 0 ? '-' : ''
    i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c)))
    j = (j = i.length) > 3 ? j % 3 : 0

    return s + (j ? i.substr(0, j) + t : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + t) + ((c && ((n - i) > 0)) ? d + Math.abs(n - i).toFixed(c).slice(2) : '')
  },

  showNotification (title, text, type, duration = 0, delay = 0, showProgressBar = false, cleanUpFirst = false) {
    if (cleanUpFirst) {
      // eslint-disable-next-line
      toastr.remove()
    }

    setTimeout(function () {
      toastr.options = {
        'closeButton': true,
        'debug': false,
        'newestOnTop': true,
        'progressBar': true,
        'positionClass': 'toast-top-center',
        'preventDuplicates': true,
        'showDuration': '1000',
        'hideDuration': '1000',
        'timeOut': '5000',
        'extendedTimeOut': '0',
        'showEasing': 'swing',
        'hideEasing': 'linear',
        'showMethod': 'slideDown',
        'hideMethod': 'slideUp'
      }
      // eslint-disable-next-line
      toastr[type](text, title, {timeOut: duration, progressBar: showProgressBar})
    }, delay)
  },

  showNotificationAlt (title, text, type, duration = 0, delay = 0, showProgressBar = false, cleanUpFirst = false) {
    if (cleanUpFirst) {
      // eslint-disable-next-line
      toastr.remove()
    }

    setTimeout(function () {
      toastr.options = {
        'closeButton': true,
        'debug': false,
        'newestOnTop': true,
        'progressBar': true,
        'positionClass': 'toast-bottom-center',
        'preventDuplicates': true,
        'showDuration': '1000',
        'hideDuration': '1000',
        'timeOut': '5000',
        'extendedTimeOut': '0',
        'showEasing': 'swing',
        'hideEasing': 'linear',
        'showMethod': 'slideDown',
        'hideMethod': 'slideUp'
      }
      // eslint-disable-next-line
      toastr[type](text, title, {timeOut: duration, progressBar: showProgressBar})
    }, delay)
  },

  clearNotifications (delay = null) {
    if (!delay) {
      toastr['clear']()
      return
    }

    setTimeout(function () {
      // eslint-disable-next-line
      toastr['clear']()
    }, delay)
  },

  removeNotifications (delay = null) {
    if (!delay) {
      toastr['remove']()
      return
    }

    setTimeout(function () {
      // eslint-disable-next-line
      toastr['remove']()
    }, delay)
  },

  capitalizeFirstChar (str) {
    return str.replace(/^./, function (match) {
      return match.toUpperCase()
    })
  },

  getCamFeed (url) {
    return new Promise((resolve, reject) => {
      window.camFeed = new Image()

      window.camFeed.onload = () => {
        delete window.camFeed
        resolve(url)
      }

      window.camFeed.onerror = () => {
        reject(new Error('static/img/animated/no-signal.gif'))
      }

      window.camFeed.src = url
    })
  },

  timeAgo (dateObj) {
    return timeAgo.format(dateObj)
  },

  mutateCard (e) {
    let target = $(e.target).parent()

    /** collapse card */
    if ($(target).attr('data-toggle') === 'card-collapse') {
      let $card = $(target).closest('div.card')

      $card.toggleClass('card-collapsed')
    }

    /** fullscreen card */
    if ($(target).attr('data-toggle') === 'card-fullscreen') {
      let $card = $(target).closest('div.card')

      $card.toggleClass('card-fullscreen').removeClass('card-collapsed')

      if ($card.hasClass('card-fullscreen')) {
        $('html, body').css('overflowY', 'hidden')
      } else {
        $('html, body').css('overflowY', 'auto')
      }
    }

    /** remove card */
    if ($(target).attr('data-toggle') === 'card-remove') {
      let $card = $(target).closest('div.card')

      $card.remove()
    }
  }
}

export default mixins
