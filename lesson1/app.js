const fs = require('fs');
const path = require('path');
const User = require('./task1/user');

fs.mkdir(`${__dirname}/task1`, err => {
    if (err) return err;
})

const anna = new User('Anna', 32, 'female');
const vova = new User('Vova', 24, 'male');
const max = new User('Max', 18, 'male');
const vika = new User('Vika', 23, 'female');
const viktor = new User('Viktor', 42, 'male');
const karina = new User('Karina', 15, 'female');

const userMalePath = path.join(__dirname, 'task1', '2000');
const userFemalePath = path.join(__dirname, 'task1', '1800');

fs.writeFile(`${userMalePath}/Anna.json`, JSON.stringify(anna), err => {
    if (err) return err;
})

fs.writeFile(`${userFemalePath}/Vova.json`, JSON.stringify(vova), err => {
    if (err) return err;
})

fs.writeFile(`${userMalePath}/Max.json`, JSON.stringify(max), err => {
    if (err) return err;
})

fs.writeFile(`${userMalePath}/Vika.json`, JSON.stringify(vika), err => {
    if (err) return err;
})

fs.writeFile(`${userFemalePath}/Viktor.json`, JSON.stringify(viktor), err => {
    if (err) return err;
})

fs.writeFile(`${userFemalePath}/Karina.json`, JSON.stringify(karina), err => {
    if (err) return err;
})

fs.readdir(userFemalePath, ((err, files) => {
    if (err) return err;
    files.forEach(file => {
       fs.readFile(`${userFemalePath}/${file}`, (err1, data) => {
           if (err){
               console.log(err);
               return err;
           }
           let user = JSON.parse(data);
           if (user.gender === 'male') {
              fs.rename(`${userFemalePath}/${file}`,`${userMalePath}/${file}`, e => {
                  if (e) {
                      console.log(e);
                      return e;
                  }
              });
           }
       });
    });
}))

fs.readdir(userMalePath, ((err, files) => {
    if (err) return err;
    files.forEach(file => {
        fs.readFile(`${userMalePath}/${file}`, (err1, data) => {
            if (err){
                console.log(err);
                return err;
            }
            let user = JSON.parse(data);
            if (user.gender === 'female') {
                fs.rename(`${userMalePath}/${file}`,`${userFemalePath}/${file}`, e => {
                    if (e) {
                        console.log(e);
                        return e;
                    }
                });
            }
        });
    });
}))

// *****************************TASK 2****************************************************

