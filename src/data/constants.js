const SEMESTER_START = new Date("2026-06-15");
const TOTAL_DAYS = 98;
const SCHEDULE_LEN = 23;

const DAY_NAMES = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const DAY_FULL  = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

const SEED_CHECKED = (() => {
  const c = {};
  for (let d = 1; d <= 14; d++)
    for (let i = 0; i < SCHEDULE_LEN; i++)
      c[`d${d}-i${i}`] = true;
  return c;
})();

export { SEMESTER_START, TOTAL_DAYS, SCHEDULE_LEN, DAY_NAMES, DAY_FULL, SEED_CHECKED };
