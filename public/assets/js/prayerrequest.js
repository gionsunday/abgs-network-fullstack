$(document).ready(() => {
  "use strict";

  var prayerEmail = $("#prayer_email");
  var prayerName = $("#prayer_name");
  var prayer = $("#prayer");
  const prayerSendBtn = $("#prayer_btn");

  prayerSendBtn.click(async (e) => {
    e.preventDefault();
    prayerSendBtn.text("Sending prayer...");

    try {
      const data = await axios.post("absg/prayers/create", {
        name: prayerName.val(),
        email: prayerEmail.val(),
        prayer: prayer.val(),
      });
      console.log(data);

      prayerSendBtn.text("prayer Sent!");
      prayerSendBtn.text("Thank You!");
      prayerName.val("");
      prayerEmail.val("");
     
      prayer.val("");
      prayerSendBtn.text("Send Another Request ");
    } catch (error) {
      console.log(error);
    }
  });
});
