import express, {Request, Response, Application} from 'express'
import 'dotenv/config';
import { db } from './db';
import { users } from './db/schema';

const app : Application = express()

// By including app.use(express.json()), you ensure that your Express application can handle JSON data sent in the request body automatically, making it easier to work with JSON-based APIs.
app.use(express.json())

// OUR ROUTES IMPORT
import userRoutes from './routes/user.routes'
import postsRoutes from './routes/post.routes'

app.use('/api/users', userRoutes)
app.use('/api/posts', postsRoutes)

export {app}