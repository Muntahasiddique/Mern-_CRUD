const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const UserModel = require('./models/Users');

// Configure storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Colorful startup message
console.log('\x1b[36m%s\x1b[0m', '🚀 Starting server...');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// MongoDB connection
mongoose.connect("mongodb+srv://muntahamirza890:dbMuntahaPass@mydb.bcxy0.mongodb.net/crudmern")
  .then(() => console.log('\x1b[32m%s\x1b[0m', '🍃 MongoDB connected successfully'))
  .catch(err => console.error('\x1b[31m%s\x1b[0m', '❌ MongoDB connection error:', err));

// Colorful route logging middleware
app.use((req, res, next) => {
  const methodColors = {
    GET: '\x1b[32m',    // Green
    POST: '\x1b[34m',   // Blue
    PUT: '\x1b[33m',    // Yellow
    DELETE: '\x1b[31m'  // Red
  };
  console.log(`${methodColors[req.method] || '\x1b[37m'}${req.method}\x1b[0m ${req.path}`);
  next();
});

// Enhanced routes with filtering
app.get('/', async (req, res) => {
  try {
    const { name, email, age, sort, order = 'asc' } = req.query;
    const filter = {};
    
    if (name) filter.name = { $regex: name, $options: 'i' };
    if (email) filter.email = { $regex: email, $options: 'i' };
    if (age) filter.age = age;

    const sortOptions = {};
    if (sort) sortOptions[sort] = order === 'asc' ? 1 : -1;

    const users = await UserModel.find(filter).sort(sortOptions);
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/getUser/:id', async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/createUsers", upload.single('profilePicture'), async (req, res) => {
  try {
    const userData = {
      ...req.body,
      profilePicture: req.file ? `/images/${req.file.filename}` : null
    };
    const user = await UserModel.create(userData);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to create user" });
  }
});

app.put('/updateUser/:id', upload.single('profilePicture'), async (req, res) => {
  try {
    const updateData = { ...req.body };
    
    if (req.file) {
      updateData.profilePicture = `/images/${req.file.filename}`;
    }

    const user = await UserModel.findByIdAndUpdate(
      req.params.id, 
      updateData, 
      { new: true }
    );
    
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/deleteUser/:id', async (req, res) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log('\x1b[35m%s\x1b[0m', `🌐 Server running on port ${PORT}`);
});