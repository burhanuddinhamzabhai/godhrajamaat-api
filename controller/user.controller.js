const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

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

module.exports = {
    createUser,
    deleteUser
}