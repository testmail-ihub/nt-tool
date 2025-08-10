const fs = require('fs');

const cleanData = () => {
  try {
    const rawData = fs.readFileSync('input/data.json', 'utf8');
    const data = JSON.parse(rawData);

    const cleanedData = data.filter(user => user.email).map(user => ({
      ...user,
      name: user.name.toTitleCase()
    }));

    fs.writeFileSync('output/cleanedData.json', JSON.stringify(cleanedData, null, 2));
    console.log('Data cleaned and saved successfully!');
  } catch (error) {
    console.error('Error cleaning data:', error);
  }
};

String.prototype.toTitleCase = function() {
  return this.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

cleanData();