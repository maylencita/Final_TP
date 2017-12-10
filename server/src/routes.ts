import * as express from 'express'
import { index } from './templates'
import * as Api from './controllers/ApiController'

const router = express.Router()

router.get('/', Api.getState)

router.get('/ping', Api.ping)

router.post('/login', Api.registerUser)

router.get('/users', Api.getUsers)

router.get('/channels', Api.getChannels)

router.put('/channels', Api.addChannel)

router.get('/channels/:channelId/questions', Api.readChannel)

router.put('/channels/:channelId/questions', Api.addQuestion)

router.put('/channels/:channelId/questions/:questionId', Api.sendAnswer)

router.post('/channels/:channelId/questions/:questionId/note', Api.noteQuestion)

router.post('/channels/:channelId/answers/:answerId/note', Api.noteAnswer)

router.get('/questions', Api.getQuestions)

export default router