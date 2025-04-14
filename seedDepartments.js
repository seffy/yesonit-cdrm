require('dotenv').config();
const mongoose = require('./config/db'); // Ensure this connects to your MongoDB
const Department = require('./models/Department');

async function seedDepartments() {
    try {
        // Optional: Check if any department is already in the collection
        const count = await Department.countDocuments();
        if (count === 0) {
            const departments = ['Training', 'HR', 'Operations', 'Finance', 'Facilities'];

            // Insert each department
            for (const name of departments) {
                const newDepartment = new Department({ name });
                await newDepartment.save();
                console.log(`Added department: ${name}`);
            }
        } else {
            console.log('Departments already exist in the database.');
        }
        process.exit(0);
    } catch (err) {
        console.error('Error seeding departments:', err);
        process.exit(1);
    }
}

seedDepartments();