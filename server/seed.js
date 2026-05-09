import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import Pincode from './models/Pincode.js';

dotenv.config();

const data = JSON.parse(
  fs.readFileSync('./data/bangalorePincodes.json', 'utf-8')
);

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    await Pincode.deleteMany();
    await Pincode.insertMany(data);

    console.log('Database Seeded');

    process.exit();
  })
  .catch(err => console.log(err));