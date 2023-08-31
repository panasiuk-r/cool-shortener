const charSet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
const urlLength = 5
 
const createUrl = (url: string): string => {
	url = url || ''
	let shortUrl = 'http://xpl.ac/'
  for (let i = 0; i < urlLength; i++) {
		shortUrl += charSet[Math.floor(Math.random() * charSet.length)]
 	}
 	return shortUrl
 }

const isValidUrl = (url: string): boolean => {
	const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
  
  return urlPattern.test(url)
}

export { createUrl, isValidUrl }
