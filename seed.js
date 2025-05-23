require('dotenv').config();
const mongoose = require('./config/db'); // MongoDB connection
const Department = require('./app/models/Department');
const User = require('./app/models/User'); // Make sure this path is correct
const bcrypt = require('bcrypt');

async function seedInitialData() {
    try {
        // Seed Departments
        const defaultDepartments = ['Training', 'HR', 'Operations', 'Finance', 'Facilities', 'Admin'];
        for (const name of defaultDepartments) {
            const existing = await Department.findOne({ name });
            if (!existing) {
                const newDept = new Department({ name });
                await newDept.save();
                console.log(`Added department: ${name}`);
            }
        }

        // Seed Admin User
        const existingUser = await User.findOne({ email: 'admin@yesonit.com' });
        if (!existingUser) {
            const adminDept = await Department.findOne({ name: 'Admin' });
            if (!adminDept) {
                throw new Error('Admin department not found.');
            }

            const hashedPassword = await bcrypt.hash('admin@123', 10);
            const newUser = new User({
                name: 'John Doe',
                email: 'admin@yesonit.com',
                password: hashedPassword,
                accessLevel: 5,
                department: adminDept._id // Associate with Admin department
            });

            await newUser.save();
            console.log('Admin user created and assigned to Admin department.');
        } else {
            console.log('Admin user already exists.');
        }

        process.exit(0);
    } catch (err) {
        console.error('Error during seeding:', err);
        process.exit(1);
    }
}

seedInitialData();