jQuery.noConflict();
jQuery(document).ready(function ($) {
  $(".calculate-action").on("click", function () {
    if ($(".calc-action-svg").hasClass("arrow-svg")) {
      // clean error styling css classes
      cleanErrorCss();
      if (checkInputValidity()) return;
      // caluculate the age
      calculateAge();
      // Transition the calculate age button with width and opacity
      handleTransition("redo");
    } else {
      // Transition the calculate age button with width and opacity
      handleTransition("arrow");

      // Reset input values to nothing
      $(".input-year").val("");
      $(".input-month").val("");
      $(".input-day").val("");

      // Reset output values to --
      $(".years-output").text("--");
      $(".months-output").text("--");
      $(".days-output").text("--");

      // Clean Error Classes
      cleanErrorCss();
    }
    // Toggle te svg for calculate button when the arrow svg is present
    $(".calc-action-svg").toggleClass("arrow-svg");
    $(".calc-action-svg").toggleClass("redo-svg");
  });

  // Change to arrow svg if the user types into input fields
  $(".input-div").on("keydown", function () {
    if ($(".calc-action-svg").hasClass("redo-svg")) {
      $(".calc-action-svg").toggleClass("arrow-svg");
      $(".calc-action-svg").toggleClass("redo-svg");
      handleTransition("arrow");
    }
  });

  // Calculate Age
  function calculateAge() {
    let y1 = $(".input-year").val();
    let m1 = $(".input-month").val();
    let d1 = $(".input-day").val();

    let date = new Date();
    let d2 = date.getDate();
    let m2 = 1 + date.getMonth();
    let y2 = date.getFullYear();
    let month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (d1 > d2) {
      d2 = d2 + month[m2 - 1];
      m2 = m2 - 1;
    }
    if (m1 > m2) {
      m2 = m2 + 12;
      y2 = y2 - 1;
    }
    let d = d2 - d1;
    let m = m2 - m1;
    let y = y2 - y1;

    // If the input date exceeds the present day calls error function
    if (d < 0 || m < 0 || y < 0) {
      addErrorClasses("day", "Date exceeds present.");
      addErrorClasses("month", "Date exceeds present.");
      addErrorClasses("year", "Date exceeds present.");
      return;
    }

    // Animates the numbers to count to the passed number
    animateValue($(".years-output"), 0, y, 500);
    setTimeout(() => {
      animateValue($(".months-output"), 0, m, 200);
    }, 500);
    setTimeout(() => {
      animateValue($(".days-output"), 0, d, 1000);
    }, 700);
  }

  // Animate te counting up for number output
  function animateValue(obj, start, end, duration) {
    if (end > 10) start = end - 10;
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      obj.text(Math.floor(progress * (end - start) + start));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  // Check if the input is in the correct format
  function checkInputValidity() {
    let y = $(".input-year").val();
    let m = $(".input-month").val();
    let d = $(".input-day").val();
    let month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (d > 31 || d < 1) {
      addErrorClasses("day", "Must be a valid date");
    } else {
      if (d > month[m - 1] || m < 1 || m > 12) {
        addErrorClasses("month", "Must be a valid date");
      }
    }

    if (d === "") addErrorClasses("day", "Empty field.");
    if (m === "") addErrorClasses("month", "Empty field.");
    if (y === "") addErrorClasses("year", "Empty field.");

    if ($(".input-text").hasClass("error-text-color")) return true;
  }

  // Function to clean the css error styling
  function cleanErrorCss() {
    $(".error-date").text("");
    $(".input-div").removeClass("error-border-color");
    $(".input-text").removeClass("error-text-color");
  }

  // Function to add error styling with css classes
  function addErrorClasses(dmy, text) {
    $(`.error-${dmy}`).text(text);
    if (!$(`.input-${dmy}`).hasClass("error-border-color")) {
      $(`.input-${dmy}`).addClass("error-border-color");
    }
    if (!$(`.input-text-${dmy}`).hasClass("error-text-color")) {
      $(`.input-text-${dmy}`).addClass("error-text-color");
    }
  }

  // Function to transition the calculate button form arrow to redo and vice versa
  function handleTransition(elem) {
    $(`.calc-action-svg`).css("transform", "scale(.3)");
    $(`.calc-action-svg`).css("opacity", ".5");
    setTimeout(() => {
      $(".calc-action-svg").attr("src", `assets/images/${elem}-icon.svg`);
      $(`.calc-action-svg`).css("transform", "scale(1)");
      $(`.calc-action-svg`).css("opacity", "1");
    }, 600);
  }
});
