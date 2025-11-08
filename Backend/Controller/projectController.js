// Try to use Prisma if available and configured; otherwise fall back to an in-memory store
let prisma = null;
try {
  const { PrismaClient } = require('@prisma/client');
  prisma = new PrismaClient();
} catch (err) {
  console.warn('Prisma client not available or not generated; using in-memory fallback.');
}

// Simple in-memory fallback store
const inMemoryProjects = [];

const usePrisma = () => !!(prisma && prisma.project);

exports.createProject = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (usePrisma()) {
      const project = await prisma.project.create({ data: { name, description } });
      return res.json(project);
    }

    const newProject = { id: String(Date.now()), name, description };
    inMemoryProjects.push(newProject);
    return res.json(newProject);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to create project' });
  }
};

exports.getProjects = async (req, res) => {
  if (usePrisma()) {
    const projects = await prisma.project.findMany();
    return res.json(projects);
  }
  return res.json(inMemoryProjects);
};

exports.getProjectById = async (req, res) => {
  const id = req.params.id;
  if (usePrisma()) {
    const project = await prisma.project.findUnique({ where: { id } });
    return res.json(project);
  }
  const project = inMemoryProjects.find((p) => p.id === id);
  return res.json(project || null);
};

exports.deleteProject = async (req, res) => {
  const id = req.params.id;
  if (usePrisma()) {
    await prisma.project.delete({ where: { id } });
    return res.json({ message: 'Project deleted successfully' });
  }
  const idx = inMemoryProjects.findIndex((p) => p.id === id);
  if (idx !== -1) inMemoryProjects.splice(idx, 1);
  return res.json({ message: 'Project deleted successfully (in-memory)' });
};
