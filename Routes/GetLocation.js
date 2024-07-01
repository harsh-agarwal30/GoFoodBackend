const express = require('express');
const router = express.Router();
const axios = require('axios');

// Get logged in User details, Login Required.
router.post('/getlocation', async (req, res) => {
    try {
        const { lat, long } = req.body.latlong;

        console.log(lat, long);

        const response = await axios.get(
            `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=74c89b3be64946ac96d777d08b878d43`
        );

        const { results } = response.data;
        if (results.length === 0) {
            return res.status(404).json({ error: "Location not found" });
        }

        const components = results[0].components;
        const { village, county, state_district, state, postcode } = components;
        const location = `${village}, ${county}, ${state_district}, ${state} ${postcode}`;

        console.log(location);
        res.json({ location });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
