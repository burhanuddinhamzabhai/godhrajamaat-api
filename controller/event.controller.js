const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createEvent(req,res){
    const { name,url} = req.body;
    const event =[{
        name: name,
        url: url
    }];


    try{
        const createEvent = await prisma.event.createMany({
            data: event,
        });
        console.log(createEvent);
        return res.status(201).send({ message: "Event created" });
    }
    catch(e){
        console.log(e);
        return res.status(500).send({ message: "Internal server error: " + e.message });
    }

}

async function getLastEvent(req,res){
    try{
        const event = await prisma.event.findFirst({
            orderBy: {
                createdDate: 'desc'
            }
        });
        return res.status(201).send(event);
    }
    catch(e){
        console.log(e);
        return res.status(500).send({ message: "Internal server error: " + e.message });
    }
}

async function deleteEvents(req,res){
    try{
        await prisma.event.deleteMany({});
        return res.status(200).send({ message: "Events deleted" });
    }
    catch(e){
        console.log(e);
        return res.status(500).send({ message: "Internal server error: " + e.message });
    }
}

module.exports = {
    createEvent,
    deleteEvents,
    getLastEvent
}