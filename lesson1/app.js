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

const moveFile = (filePath) => {
    fs.readdir(filePath, ((err, files) => {
        if (err) return err;
        files.forEach(file => {
            fs.readFile(filePath + `/${file}`, (err1, data) => {
                if (err){
                    console.log(err);
                    return err;
                }
                let user = JSON.parse(data);
                 (user.gender === 'female')
                   ? fs.rename(filePath + `/${file}`,`${userFemalePath}/${file}`, e => console.log(e))
                   : fs.rename(filePath + `/${file}`,`${userMalePath}/${file}`, e => console.log(e));
            });
        });
    }))
}
moveFile(userFemalePath);
moveFile(userMalePath);

// *****************************TASK 2****************************************************

fs.mkdir(`${__dirname}/task2/dir1/dir2/dir3/dir4`, {recursive: true}, err => {
    if (err) return err;
})

const pathFile = path.join(__dirname, 'task2', 'dir1', 'dir2');
const newPath = path.join(__dirname, 'task2', 'file_folder');
const data = 'Hello Node!';

fs.writeFile(`${pathFile}/file1.txt`, data, err => {
    if (err) return err;
})

fs.writeFile(`${pathFile}/dir3/file2.txt`, data, err => {
    if (err) return err;
})

fs.writeFile(`${pathFile}/dir3/dir4/file3.txt`, data, err => {
    if (err) return err;
})

fs.writeFile(`${pathFile}/dir3/dir4/file4.txt`, data, err => {
    if (err) return err;
})

const moveFiles = (filePath) => {
    fs.readdir(filePath, ((err, files) => {
        if (err) return err;
        files.forEach(file => {
            fs.stat(filePath + `/${file}`, ((err1, stats) => {
                if (err) return err;
                if (stats.isDirectory()) {
                    let folder = filePath + `/${file}`;
                    moveFiles(folder)
                } else {
                    fs.rename(filePath + `/${file}`, newPath + `/${file}`, e => {
                        if (e) return e;
                    })
                }
            }))
        })
    }))
}
const folderPath = path.join(__dirname, 'task2', 'dir1')
moveFiles(folderPath)
