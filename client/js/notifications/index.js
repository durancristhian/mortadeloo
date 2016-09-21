import $ from 'jquery'

const $errorNotificationTemplate = $('#error-notification-template')
const $notificationsContainer = $('#notifications-container')

export function error (message) {
  let notification = $errorNotificationTemplate.clone()
  notification.text(message).appendTo($notificationsContainer).removeClass('dn')

  setTimeout(() => notification.addClass('dn'), 5000)
}
