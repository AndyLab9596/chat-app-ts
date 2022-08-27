import 'express-async-errors';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import express, { Application } from 'express';
import connectDB from './database/connectDB';
import notFoundMiddleware from './middleware/not-found';
import errorHandlerMiddleware from './middleware/error-handler';
import userRoutes from './routes/userRoutes';
/**
 * Initial Config
 */
dotenv.config();
const app: Application = express();

if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
}

app.use(cors());
app.use(express.json());

/**
 * 
 */

app.get('/api/v1', (req, res) => {
    res.send('Connecting to back end')
})

app.use('/api/v1/user', userRoutes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;
const start = async () => {
    try {
        // Connect to DB
        await connectDB(process.env.MONGO_URL as string);
        app.listen(port, () => {
            console.log(`App is listening on port ${port}`)
        })
    } catch (error) {
        console.log(error);
    }
}

start();