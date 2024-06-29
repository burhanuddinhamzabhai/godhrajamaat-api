const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const secret = process.env.JWT_SECRET;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


async function login(req,res){
    // Get the data from the request
    const { itsId, password } = req.body;

    if (!itsId || !password
        || itsId.trim() === '' || password.trim() === '') {
        return res.status(400).send("Invalid input");
    }

    try {
        // Check if the user exists
        const user = await prisma.users.findUnique({
            where: {
                itsId: itsId
            }
        });

        if (!user) {
            return res.status(404).send('User not found');
        }

        if(user.freezed){
            return res.status(400).send('User no longer active');
        }

        // Check if the password is correct
        const passwordMatch = await bcrypt.compare(password, user.passwordSalt);
        if (!passwordMatch) {
            return res.status(401).send('Invalid credentials');
        }

        const token = jwt.sign({ userId: user.sysid }, secret, {
            expiresIn: '3h',
            });

            const lastMiqaat = await prisma.miqaat.findFirst({
                where: {
                    closed: false
                },
                orderBy: {
                    createdDate: 'desc'
                }
            });
            console.log(lastMiqaat)

            const isUserActive = await prisma.activeMiqaatUsers.findFirst({
                where:{
                    itsId: user.itsId,
                    miqaatId: lastMiqaat.sysid,
                    active:true
                }
            });
            
            if(isUserActive){
                return res.status(400).send('User already active');
            }

            const addToActiveMiqaat = await prisma.activeMiqaatUsers.create({
                data:{
                    miqaatId: lastMiqaat.sysid,
                    itsId: user.itsId,
                    name: user.name,
                    active:true
                }
            })
            console.log(addToActiveMiqaat)
        //return response with token and user info
        return res.send({user:{name:user.name,itsId:user.itsId, isAdmin: user.isAdmin}, token: token});

    } catch (error) {
        return res.status(500).send('Error logging in');
    } finally {
        await prisma.$disconnect();
    }
}

async function logout(req,res){
    try {
        const { itsId } = req.body;
        const lastMiqaat = await prisma.miqaat.findFirst({
            where: {
                closed: false
            },
            orderBy: {
                createdDate: 'desc'
            }
        });

        console.log(lastMiqaat,itsId)

        console.log(await prisma.activeMiqaatUsers.findFirst({
            where:{
                itsId: itsId,
                miqaatId: lastMiqaat.sysid
            }
        
        }))

        const removeFromActiveMiqaat = await prisma.activeMiqaatUsers.updateMany({
            data:{
                active:false
            },
            where: {
                miqaatId: lastMiqaat.sysid,
                itsId: itsId
            }
        })

        console.log(removeFromActiveMiqaat)

        return res.status(200).send({message:'User logged out'});

    } catch (error) {
        return res.status(500).send('Error logging out');
    } finally {
        await prisma.$disconnect();
    }

}

module.exports = {
    login,
    logout
}
