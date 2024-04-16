$(document).ready(() => {
  const news_submit_btn = $("#newssubmitbtn");
  var digging_deep = "";
  var livestreams_alert = "";
  var burning_q_and_a = "";
  var blog_posts = "";
  var special_events = "";
  var emailIn = $("#news_email");
  var F_nameIn = $("#news_f_name");
  var L_nameIn = $("#news_l_name");

  news_submit_btn.click(async () => {
    news_submit_btn.text("Subscribing...");
    if ($('input[id="digging_deep"]').is(":checked")) {
      // checked
      digging_deep = "Digging Deep";
    } else {
      // unchecked
      digging_deep = "";
    }
    if ($('input[id="livestream_alerts"]').is(":checked")) {
      // checked
      livestreams_alert = "Livestream Alerts";
    } else {
      // unchecked
      livestreams_alert = "";
    }
    if ($('input[id="livestream_alerts"]').is(":checked")) {
      // checked
      livestreams_alert = "Livestream Alerts";
    } else {
      // unchecked
      livestreams_alert = "";
    }
    if ($('input[id="burning_question"]').is(":checked")) {
      // checked
      burning_q_and_a = "Burning Question and Answer Episodes";
    } else {
      // unchecked
      burning_q_and_a = "";
    }
    if ($('input[id="blog_posts"]').is(":checked")) {
      // checked
      blog_posts = "Weekly Blog Posts";
    } else {
      // unchecked
      blog_posts = "";
    }
    if ($('input[id="invents"]').is(":checked")) {
      // checked
      special_events = "Info’s on Special Invents";
    } else {
      // unchecked
      special_events = "";
    }

    try {
      const sub_data = await axios.post("/absg/newsletter/create", {
        email: emailIn.val(),
        name: F_nameIn.val() + " " + L_nameIn.val(),
        digging_deep: digging_deep,
        livestreams: livestreams_alert,
        burning_q_and_a: burning_q_and_a,
        weeky_blogs: blog_posts,
        special_events: special_events,
      });
      console.log(sub_data);
      emailIn.val("");
      F_nameIn.val("");
      L_nameIn.val("");

      news_submit_btn.text("Successful!");
      news_submit_btn.attr("backgroundColor", "green");
      news_submit_btn.text("Subscribe Now");
    } catch (error) {
      console.log(error);
    }
  });
});
