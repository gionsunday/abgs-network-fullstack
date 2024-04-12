$(document).ready(() => {
  "use strict";

  var messageEmail = $("#message_email");
  var messagePhone = $("#message_phone");
  var messageName = $("#message_name");
  var messageSubject = $("#message_subject");
  var message = $("#message");
  const messageSendBtn = $("#message_btn");

  messageSendBtn.click(async (e) => {
    e.preventDefault();
    messageSendBtn.text("Sending Message...");

    try {
      const data = await axios.post("absg/messages/create", {
        name: messageName.val(),
        email: messageEmail.val(),
        phone: messagePhone.val(),
        subject: messageSubject.val(),
        message: message.val(),
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  });
});
