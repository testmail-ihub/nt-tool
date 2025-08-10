const fs = require('fs');

// Read and clean data
function cleanData(inputPath, outputPath) {
    const rawData = fs.readFileSync(inputPath, 'utf-8');
    const users = JSON.parse(rawData);

    const cleanedUsers = users
        .filter(user => user.email) // Filter out entries missing an email
        .map(user => ({
            ...user,
            name: user.name
                .toLowerCase()
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')
        }));

    fs.writeFileSync(outputPath, JSON.stringify(cleanedUsers, null, 2));
    console.log('Data cleaned and written to', outputPath);
}

// Define input and output paths
const inputPath = 'input/users.json';
const outputPath = 'output/cleanedData.json';

// Ensure output directory exists
fs.mkdirSync('output', { recursive: true });

// Execute the cleaning function
cleanData(inputPath, outputPath);