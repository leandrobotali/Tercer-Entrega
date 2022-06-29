import mongoose from 'mongoose'
import logger from '../helpers/logger.js'

const { MONGODB_USER, MONGODB_PASS, MONGODB_HOST, MONGODB_DATABASE } = process.env;

const MONGODB_URI = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASS}@${MONGODB_HOST}/${MONGODB_DATABASE}`

export default mongoose.connect(MONGODB_URI)
.then(db => logger.info('database is connected'))
.catch(err => {
    logger.error('connection error')
    process.exit(1)
});