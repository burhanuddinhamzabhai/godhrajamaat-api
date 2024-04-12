const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

async function seedUsers(){

    const users =[{
        name:'Burhanuddin Mulla Hamzabhai',
        itsId: '60460544',
        password: '60460544',
        passwordSalt: await bcrypt.hash('60460544', 10),
        isAdmin: true
    }];


    try{
        const createUsers = await prisma.users.createMany({
            data: users,
        });
        console.log(createUsers);
    }
    catch(e){
        console.log(e);
    }

}

module.exports = {
    seedUsers
}