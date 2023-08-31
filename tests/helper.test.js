const { createUrl, isValidUrl } = require('../helpers/helper')

describe('isValidUrl function', () => {
  it('should return true for a valid URL', () => {
    const validUrl = 'http://example.com'
    expect(isValidUrl(validUrl)).toBe(true)
  })

  it('should return false for an invalid URL', () => {
    const invalidUrl = 'invalid-url'
    expect(isValidUrl(invalidUrl)).toBe(false)
  })

  it('should return true for URLs with different protocols', () => {
    expect(isValidUrl('http://example.com')).toBe(true)
    expect(isValidUrl('https://example.com')).toBe(true)
    expect(isValidUrl('ftp://example.com')).toBe(true)
  })

  it('should return true for URLs with subdomains', () => {
    expect(isValidUrl('http://sub.example.com')).toBe(true)
  })

  it('should return true for URLs with different top-level domains', () => {
    expect(isValidUrl('http://example.com')).toBe(true)
    expect(isValidUrl('http://example.org')).toBe(true)
    expect(isValidUrl('http://example.net')).toBe(true)
  })

  it('should return true for URLs with query parameters', () => {
    expect(isValidUrl('http://example.com/page?param=value')).toBe(true)
  })

  it('should return true for URLs with fragments', () => {
    expect(isValidUrl('http://example.com#section')).toBe(true)
  })

  it('should return false for URLs missing protocol', () => {
    expect(isValidUrl('example.com')).toBe(false)
  })

  it('should return false for URLs with spaces', () => {
    expect(isValidUrl('http://example with space.com')).toBe(false)
  })
})
