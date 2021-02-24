const fs = require('fs');
const { promisify } = require('util');
const path = require('path');

const readFilePromisify = promisify(fs.readFile);
const writeFilePromisify = promisify(fs.writeFile);

const userDataPath = path.join(process.cwd(),  'dataBase', 'users.json');

const readFile = async() => {
    const userData = await readFilePromisify(userDataPath);

    return JSON.parse(userData.toString());
}

module.exports = {
    getAllUsers :  async() => {
      return await readFile();
    },

    createUser: async (userObject) => {
        const userData = await readFilePromisify(userDataPath);

        const { name, password, gender } = userObject;

        const newUser =  {
            name : name,
            password: password,
            gender: gender
        }

        if (Object.entries(userData).length) {
            let users = JSON.parse(userData);

            users.push(newUser);

            await  writeFilePromisify(userDataPath, JSON.stringify(users));
            return;
        }

       await writeFilePromisify(userDataPath, JSON.stringify([newUser]));

    },

    getUserById: async(userId) => {
        const users = await readFile();

        return users[userId];
    },

    getUserByQuery: async(key, value) => {
        const users = await readFile();

        return users.filter(item => item[key].toLowerCase() === value.toLowerCase());

    },

    deleteUser: async(userId) => {
        const users = await readFile();

        users.splice(userId, 1);

        await  writeFilePromisify(userDataPath, JSON.stringify(users));
    }

}
