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
    const lastMiqaat = await prisma.miqaat.findFirst({
      where: {
        closed: false,
      },
      orderBy: {
        createdDate: "desc",
      },
    });
    if (lastMiqaat) {
      await prisma.activeMiqaatUsers.updateMany({
        where: {
          miqaatId: lastMiqaat.sysid,
        },
        data: {
          active: false,
        },
      });
    }

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
    await prisma.miqaat.deleteMany({
      where: {
        name: {
          not: "DEFAULT",
        },
      },
    });

    await prisma.activeMiqaatUsers.deleteMany();

    return res.status(200).send({ message: "Miqaats deleted" });
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .send({ message: "Internal server error: " + e.message });
  }
}

async function closeMiqaat() {
  try {
    const lastMiqaat = await prisma.miqaat.findFirst({
      where: {
        closed: false,
      },
      orderBy: {
        createdDate: "desc",
      },
    });

    if (lastMiqaat.name == "DEFAULT") {
      return res.status(409).send("Cannot close default miqaat");
    }
    await prisma.miqaat.update({
      where: {
        sysid: lastMiqaat.sysid,
      },
      data: {
        closed: true,
      },
    });

    await prisma.activeMiqaatUsers.updateMany({
      where: {
        miqaatId: lastMiqaat.sysid,
      },
      data: {
        active: false,
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

async function getActiveMiqaatUsers(req, res) {
  try {
    const lastMiqaat = await prisma.miqaat.findFirst({
      where: {
        closed: false,
      },
      orderBy: {
        createdDate: "desc",
      },
    });

    const activeUsers = await prisma.activeMiqaatUsers.findMany({
      take: 20,
      where: {
        miqaatId: lastMiqaat.sysid,
      },
      orderBy: {
        loggedInAt: "desc",
      },
    });

    return res.status(200).send(activeUsers);
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .send({ message: "Internal server error: " + e.message });
  }
}

async function deleteSession(req, res) {
  const { itsId, miqaatId } = req.body;
  try {
    const session = await prisma.activeMiqaatUsers.updateMany({
      where: {
        itsId: itsId,
        miqaatId: miqaatId,
      },
      data: {
        active: false,
      },
    });

    return res.status(200).send({ message: "Session deleted" });
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .send({ message: "Internal server error: " + e.message });
  }
}

async function findActiveUser(req, res) {
  const { filterExpression } = req.query;
  try {
    const activeUser = await prisma.activeMiqaatUsers.findMany({
      where: {
        OR: [
          { itsId: { contains: filterExpression } },
          { name: { contains: filterExpression } },
        ],
      },
    });
    return res.status(200).send(activeUser);
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
  closeMiqaat,
  getActiveMiqaatUsers,
  deleteSession,
  findActiveUser,
};
