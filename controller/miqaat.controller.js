const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createMiqaat(req, res) {
  const { name, url } = req.body;
  const miqaat = [
    {
      name: name,
      url: url,
    },
  ];

  try {
    const createMiqaat = await prisma.miqaat.createMany({
      data: miqaat,
    });
    console.log(createMiqaat);
    return res.status(201).send({ message: "Miqaat created" });
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .send({ message: "Internal server error: " + e.message });
  }
}

async function getLastMiqaat(req, res) {
  try {
    const miqaat = await prisma.miqaat.findFirst({
      where: {
        closed: false,
      },
      orderBy: {
        createdDate: "desc",
      },
    });
    return res.status(201).send(miqaat);
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .send({ message: "Internal server error: " + e.message });
  }
}

async function deleteMiqaats(req, res) {
  try {
    await prisma.miqaat.deleteMany({});
    return res.status(200).send({ message: "Miqaats deleted" });
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .send({ message: "Internal server error: " + e.message });
  }
}

async function closeMiqaat(){
    try {
        const lastMiqaat = await prisma.miqaat.findFirst({
            where: {
              closed: false,
            },
            orderBy: {
              createdDate: "desc",
            },
          });

          if(lastMiqaat.name == 'DEFAULT'){
            return res.status(409).send('Cannot close default miqaat');
          }

        await prisma.miqaat.update({
        where: {
            sysid: lastMiqaat.sysid,
        },
        data: {
            closed: true,
        },
        });
        return res.status(200).send({ message: "Miqaat closed" });
    } catch (e) {
        console.log(e);
        return res
        .status(500)
        .send({ message: "Internal server error: " + e.message });
    }
    
}

module.exports = {
  createMiqaat,
  getLastMiqaat,
  deleteMiqaats,
  closeMiqaat
};
