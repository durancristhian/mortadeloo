import $ from 'jquery'

const $errorNotificationTemplate = $('#error-notification-template')
const $notificationsContainer = $('#notifications-container')

export function error (message) {
  let notification = $errorNotificationTemplate.clone()
  notification.text(message).appendTo($notificationsContainer).removeClass('hide')

  setTimeout(() => notification.addClass('hide'), 3000)
}
