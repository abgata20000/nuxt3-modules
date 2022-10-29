import camelcaseKeysOrg from 'camelcase-keys'
// MEMO: snakecase-keysに日本語キーを使うと消えてしまう不具合があったのでcamelmase-keysも一応ラップして使うようにしておく
export const camelcaseKeys = (input, options) => {
  return camelcaseKeysOrg(input, options)
}
