const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

async function seedInit(){

    const users =[{
        name:'Burhanuddin Mulla Hamzabhai',
        itsId: '60460544',
        password: '60460544',
        passwordSalt: await bcrypt.hash('60460544', 10),
        isAdmin: true
    }];

    const miqaat = [{
        name: 'DEFAULT',
        url: 'abc',
        closed: false
    }]


    try{
        await prisma.users.deleteMany({});
        const createUsers = await prisma.users.createMany({
            data: users,
        });
        console.log(createUsers);
        
        await prisma.miqaat.deleteMany({});
        const createMiqaat = await prisma.miqaat.createMany({
            data: miqaat,
        });

        console.log(createMiqaat)

    }
    catch(e){
        console.log(e);
    }

}

module.exports = {
    seedInit
}