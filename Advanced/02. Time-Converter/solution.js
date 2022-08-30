function attachEventsListeners() {
  const daysBtn = document.getElementById("daysBtn");
  const hoursBtn = document.getElementById("hoursBtn");
  const minutesBtn = document.getElementById("minutesBtn");
  const secondsBtn = document.getElementById("secondsBtn");

  daysBtn.addEventListener("click", onClick);
  hoursBtn.addEventListener("click", onClick);
  minutesBtn.addEventListener("click", onClick);
  secondsBtn.addEventListener("click", onClick);

  const rations = {
    days: 1,
    hours: 24,
    minutes: 1440,
    seconds: 86400,
  };

  const days = document.getElementById("days");
  const hours = document.getElementById("hours");
  const minutes = document.getElementById("minutes");
  const seconds = document.getElementById("seconds");

  function convert(value, unit) {
    let days = value / rations[unit];
    return {
      days: days,
      hours: days * rations.hours,
      minutes: days * rations.minutes,
      seconds: days * rations.seconds,
    };
  }

  function onClick(event) {
    const inputField =
      event.target.parentElement.querySelector('input[type="text"]');

    const time = convert(Number(inputField.value), inputField.id);

    days.value = time.days;
    hours.value = time.hours;
    minutes.value = time.minutes;
    seconds.value = time.seconds;
  }
}
