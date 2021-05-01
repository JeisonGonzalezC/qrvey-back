import mongoose from 'mongoose';
import config from '../src/config/config';

export async function connect() {
    try {
        await mongoose.connect(config.DB_CONNECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('>>> Database connected');
    }
    catch (error) {
        console.error('Error', error);
    }
}