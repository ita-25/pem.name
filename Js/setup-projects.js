// setup-projects.js - Run this to create your project structure
const fs = require('fs');
const path = require('path');

const projectStructure = {
    'web': [
        'appliguru.jpg',
        'frontline-schools.jpg', 
        'imptech-academy.jpg',
        'pem-studio.jpg',
        'pem-dev.jpg'
    ],
    'graphics': [
        'logo-design-1.jpg',
        'flyer-design-1.jpg',
        'social-media-1.jpg'
    ],
    'writing': [
        'sample-report.jpg'
    ]
};

// Create directories
Object.keys(projectStructure).forEach(category => {
    const dirPath = path.join(__dirname, 'images', 'projects', category);
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        console.log(`Created directory: ${dirPath}`);
    }
});

console.log('Project structure created!');
console.log('Now add your images to the respective folders.');