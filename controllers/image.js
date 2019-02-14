const Clarifai = require('clarifai');
//API key
const app = new Clarifai.App({
 apiKey: '4c59f14c310543d9ac5076b8fb674e43'
});

const handleApiCall = (req, res) => {
	app.models
	.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	.then(data => res.json(data))
	.catch(err => res.status(400).json('unable to work with API'))
}


const handleImage = (req, res, db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries').then(entries => {
  	res.json(entries[0]);
  })
  .catch(err => res.status(400).json('unable to get entry'))
}

module.exports = {
	handleImage: handleImage,
	handleApiCall: handleApiCall
}