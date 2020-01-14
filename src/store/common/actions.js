/**
 * @description clear all state and localStorage
 * @author AnhTQ
 * @date 2019-12-22
 * @export
 * @param {*} { commit }
 */
export function clearDataAction({ commit }) {
  commit('clearDataMutation');
}

/**
 * @description validate datetime
 * @author AnhTQ
 * @date 2020-01-01
 * @export
 * @param {*} context
 * @param {*} date
 * @returns {boolean}
 */
export function isInvalidDatetimeAction(context, date) {
  const year = date.substring(0, 4);
  const month = date.substring(5, 7);
  const day = date.substring(8, 10);

  const inValidYear = year.match(/[0-9]{4}/g) === null || parseInt(year) < 1;
  const inValidMonth =
    month.match(/[0-9]{2}/g) === null ||
    (parseInt(month) < 1 || 12 < parseInt(month));
  const inValidDay =
    day.match(/[0-9]{2}/g) === null ||
    (parseInt(day) < 1 || 31 < parseInt(day));

  return day === ''
    ? inValidYear || inValidMonth
    : inValidYear || inValidMonth || inValidDay;
}
