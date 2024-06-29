const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

const seed = require("./seed.controller");

async function createUser(req,res){
    const { itsId, name } = req.body;
    const user =[{
        name: name,
        itsId: itsId,
        password: itsId,
        passwordSalt: await bcrypt.hash(itsId, 10),
        isAdmin: false
    }];


    try{
         // Check if the user exists
         const user = await prisma.users.findUnique({
            where: {
                itsId: itsId
            }
        });

        if (user) {
            return res.status(409).send('User already exists');
        }

        const createUser = await prisma.users.createMany({
            data: user,
        });
        console.log(createUser);
        return res.status(201).send({ message: "User created" });
    }
    catch(e){
        console.log(e);
        return res.status(500).send({ message: "Internal server error: " + e.message });
    }

}

async function deleteUser(req,res){
    const { id } = req.params;
    try{

         // Check if the user exists
         const user = await prisma.users.findUnique({
            where: {
                itsId: id
            }
        });

        if (user) {
            if(user.isAdmin){
                return res.status(409).send('Cannot delete admin user');
            }
        }

        if(!user){
            return res.status(409).send('User not found');
        }

        const deleteUser = await prisma.users.delete({
            where: {
                itsId: id
            }
        });
        console.log(deleteUser);
        return res.status(200).send({ message: "User deleted" });
    }
    catch(e){
        console.log(e);
        return res.status(500).send({ message: "Internal server error: " + e.message });
    }
}

async function deleteUsers(req,res){
    try{
        await prisma.users.deleteMany({});
        await seed.seedUsers();
        return res.status(200).send({ message: "Users deleted" });

    }
    catch(e){
        console.log(e);
        return res.status(500).send({ message: "Internal server error: " + e.message });
    }

}

module.exports = {
    createUser,
    deleteUser,
    deleteUsers
}