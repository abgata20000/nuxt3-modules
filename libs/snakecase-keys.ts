import snakecaseKeysOrg from 'snakecase-keys'
// MEMO: snakecase-keysに日本語キーを使うと消えてしまう不具合があったのでラップして調整をいれて使うようにしておく
export const snakecaseKeys = (obj, options = {}) => {
  const jpRegex = /[\u30A0-\u30FF\u3040-\u309F\u3005-\u3006\u30E0-\u9FCF]+/
  const myOptions = Object.assign({ deep: true, exclude: [jpRegex], parsingOptions: {} }, options)
  return snakecaseKeysOrg(obj, myOptions)
}
