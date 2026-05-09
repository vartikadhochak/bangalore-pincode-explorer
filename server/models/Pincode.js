import mongoose from 'mongoose';

const pincodeSchema = new mongoose.Schema({
  area: String,
  pincode: String,
});

const Pincode = mongoose.model('Pincode', pincodeSchema);

export default Pincode;