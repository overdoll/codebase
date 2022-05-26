import ServerError from './ServerError/ServerError'
import data from './__locale__/en'
import { loadTranslations } from '@//:modules/locale'

loadTranslations(data)

export default ServerError
