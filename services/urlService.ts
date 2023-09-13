import { Model } from 'sequelize'

import { redis } from '../db/connection'
import { Url, UrlAttributes } from '../models/Url'
import { createUrl, isValidUrl } from '../helpers/helper'

const addUrl = async (url: string): Promise<string> => {
  try {
    if (!isValidUrl(url)) {
      throw new Error('Invalid URL format')
    }
    
    let shortUrl: string = createUrl(url)
    const newUrl: Model<UrlAttributes> | null = await Url.create({ originalUrl: url, shortUrl: shortUrl })

    await redis.set(newUrl.getDataValue('shortUrl'), newUrl.getDataValue('originalUrl'))
    
    return shortUrl || ''
  } catch (error: any) {
    throw error
  }
}

const getUrl = async (url: string): Promise<string> => {
  try {
    url = url || ''

    const redisUrl: string | null = await redis.get(url)
    if (redisUrl) {
    	return redisUrl
		}

    const mysqlUrl: Model<UrlAttributes> | null = await Url.findByPk(url)
    if (mysqlUrl) {
      await redis.set(mysqlUrl.getDataValue('shortUrl'), mysqlUrl.getDataValue('originalUrl'))
      return mysqlUrl.getDataValue('originalUrl') || ''
    } else {
    	throw new Error('URL not found')
		}
  } catch (error: any) {
		throw error
	}
}

export { addUrl, getUrl }