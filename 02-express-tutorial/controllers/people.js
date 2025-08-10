// controllers/people.js
const { people } = require('../data');

// GET all people
const getPeople = (req, res) => {
  res.status(200).json(people);
};

// POST add a person
const addPerson = (req, res) => {
  const { name } = req.body;

  if (!name || name.trim() == "") {
    return res.status(400).json({ success: false, message: "Please provide a valid name of a person" });
  }

  const newPerson = { id: people.length + 1, name: name.trim() };
  people.push(newPerson);
  res.status(201).json({ success: true, name: name.trim() });
};

// GET person by ID
const getPersonById = (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(404).json({ message: 'Person not found' });

  const person = people.find(p => p.id === id);
  if (!person) return res.status(404).json({ message: 'Person not found' });

  res.status(200).json(person);
};

// PUT update person by ID
const updatePerson = (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;

  if (isNaN(id)) return res.status(404).json({ message: 'Person not found' });

  const person = people.find(p => p.id === id);
  if (!person) return res.status(404).json({ message: 'Person not found' });

  if (!name) {
    return res.status(400).json({ success: false, message: 'Please provide a name of a person' });
  }

  person.name = name;
  res.status(200).json({ success: true, person });
};

// DELETE person by ID
const deletePerson = (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(404).json({ message: 'Person not found' });

  const idx = people.findIndex(p => p.id === id);
  if (idx === -1) return res.status(404).json({ message: 'Person not found' });

  // remove the item (mutate original array)
  people.splice(idx, 1);

  // Optional: adjust ids (not required, but note: ids will have gaps otherwise)
  // people.forEach((p, i) => p.id = i + 1);

  res.status(200).json({ success: true, people });
};

module.exports = { getPeople, addPerson, getPersonById, updatePerson, deletePerson };
