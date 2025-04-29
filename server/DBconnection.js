
//config.js
import mongoose from 'mongoose';
import 'dotenv/config';

export const dbConnection =async()  => {
    try{
        await mongoose.connect(process.env.URL_NODE,{
            //useNewUrlParser : true,   //deprecated 
            //useUnifiedTopology : true,  //deprecated 
            //useCreateIndex : true,   //obsolet
            //useFindAndModify : false   //obsolet
        })
        console.log('Connected to database');
        

    }catch(err){
        console.error(`Error connecting to database: ${err}`);
        throw new Error(`Error connecting to database: ${err}`);
    }
}
