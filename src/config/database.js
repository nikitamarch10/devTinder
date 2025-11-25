const mongoose = require('mongoose');

const connectDB = async() => {
    await mongoose.connect('mongodb+srv://nikitaasinghin_db_user:oI3ip7oXUVuSu5sb@namastenode.bx4dbdt.mongodb.net/devTinder');
};

module.exports = connectDB;