import express from 'express';
import axios from 'axios';
import Pincode from '../models/Pincode.js';

const router = express.Router();

/* Search by pincode */
router.get('/pincode/:code', async (req, res) => {
  try {

    const localResult = await Pincode.find({
      pincode: req.params.code
    });

    if (localResult.length > 0) {
      return res.json(localResult);
    }

    const response = await axios.get(
      `https://api.postalpincode.in/pincode/${req.params.code}`
    );

    const postOffice = response.data[0].PostOffice;

    if (!postOffice) {
      return res.json([]);
    }

    const formatted = postOffice.map((item) => ({
      area: item.Name,
      pincode: item.Pincode,
    }));

    res.json(formatted);

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

/* Search by area */
router.get('/area/:name', async (req, res) => {
  try {

    const localResult = await Pincode.find({
      area: {
        $regex: req.params.name,
        $options: 'i'
      }
    });

    if (localResult.length > 0) {
      return res.json(localResult);
    }

    const response = await axios.get(
      `https://api.postalpincode.in/postoffice/${req.params.name}`
    );

    const postOffice = response.data[0].PostOffice;

    if (!postOffice) {
      return res.json([]);
    }

    const formatted = postOffice.map((item) => ({
      area: item.Name,
      pincode: item.Pincode,
    }));

    res.json(formatted);

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

export default router;