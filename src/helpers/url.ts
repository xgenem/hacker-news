export function cleanUrl(url: string) {
  if (!url) {
    return ''
  }
  let _url = new URL(url)

  _url.hostname.replace('www.', '')

  if (_url.hostname === 'github.com') {
    return _url.hostname + '/' + _url.pathname.split('/')[1]
  }
  
  return _url.hostname.replace('www.', '')
}
