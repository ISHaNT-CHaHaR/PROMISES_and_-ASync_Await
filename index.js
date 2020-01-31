const fs = require('fs');
const superagent = require('superagent');
const readFilePro = (file) => {
   return new Promise((resolve, reject) => {
      //Promise~ it is.
      fs.readFile(file, (err, data) => {
         if (err) {
            reject(`I could not find that file.`);
         }
         resolve(data);
      });
   });
};

const writeFilePro = (file, data) => {
   return new Promise((reject, resolve) => {
      fs.writeFile(file, data, (err) => {
         if (err) {
            console.log('Could not write a file!');
         }
         resolve(`success`);
      });
   });
};

readFilePro(`${__dirname}/dog.txt`)
   .then((data) => {
      console.log(`Breed: ${data}`);

      return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
   })
   .then((res) => {
      console.log(res.body.message);

      fs.writeFile('dog-ig.txt', res.body.message, (err) => {
         console.log(`Random dog image save to file!`);
      });
   })

   .catch((err) => {
      console.log(err.message);
   });
