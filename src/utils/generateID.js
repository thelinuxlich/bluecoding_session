import { customAlphabet } from 'nanoid'
const nanoid = customAlphabet('1234567890abcdef', 10)

/**
 * 
 * @return {string}
 */
const generateID = () => nanoid()

export default generateID