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
 * @description Decode Emoji Text
 * @author AnhTQ
 * @date 2020-02-26
 * @export
 * @param {*} text
 * @returns
 */
export function decodeEmojiText(text) {
  if (!text) return '';
  return text.replace(/\\u[\dA-F]{4}/gi, function(match) {
    return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
  });
}

/**
 * @description Encode Emoji Text
 * @author AnhTQ
 * @date 2020-02-26
 * @export
 * @param {*} str
 * @returns
 */
export function encodeEmojiText(str) {
  return str
    .split('')
    .map(function(value) {
      var temp = value
        .charCodeAt(0)
        .toString(16)
        .toUpperCase();
      if (temp.length === 2) {
        return '\\u00' + temp;
      } else if (temp.length === 3) {
        return '\\u0' + temp;
      } else if (temp.length === 4) {
        return '\\u' + temp;
      }
      return value;
    })
    .join('');
}
