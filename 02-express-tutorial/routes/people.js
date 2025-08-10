const  express = require('express');
const router = express.Router();

const { getPeople, addPerson, getPersonById, updatePerson, deletePerson } = require('../controllers/people');

// GET /api/v1/people -all people
router.get('/', getPeople);

//POST /api/v1/people - add person
router.post('/', addPerson);

// GET /api/v1/people/:id - get person by id
router.get('/:id', getPersonById);

//PUT /api/v1/people/:id - update person
router.put('/:id', updatePerson);

//DELETE /api/v1/people/:id - delete person
router.delete('/:id', deletePerson);

module.exports = router;