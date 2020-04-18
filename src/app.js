const express = require('express');
const cors = require('cors');

const { uuid, isUuid } = require('uuidv4');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get('/repositories', (request, response) => {
  // TODO
  return response.json(repositories);
});

app.post('/repositories', (request, response) => {
  // TODO
  const { title, url, techs } = request.body;

  const repo = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };

  repositories.push(repo);

  return response.json(repo);
});

app.put('/repositories/:id', (request, response) => {
  // TODO
  const { title, url, techs, likes } = request.body;
  const { id } = request.params;
  if (!isUuid(id)) {
    return response.status(400).json({ Error: 'Invalid id!' });
  }
  const repoIndex = repositories.findIndex((repo) => repo.id === id);

  if (repoIndex === -1) {
    return response.status(400).json({ Error: 'Repository Id not found!' });
  }

  if (likes) {
    return response.json({ likes: repositories[repoIndex].likes });
  }

  const repo = {
    id,
    url,
    title,
    techs,
  };

  repositories[repoIndex] = repo;

  return response.json(repo);
});

app.delete('/repositories/:id', (request, response) => {
  // TODO
  const { id } = request.params;
  if (!isUuid(id)) {
    return response.status(400).json({ Error: 'Invalid id!' });
  }

  const repoIndex = repositories.findIndex((repo) => repo.id === id);

  if (repoIndex === -1) {
    return response.status(400).json({ Error: 'Repository Id not found!' });
  }

  repositories.splice(repoIndex, 1);

  return response.status(204).send();
});

app.post('/repositories/:id/like', (request, response) => {
  // TODO
  const { id } = request.params;
  if (!isUuid(id)) {
    return response.status(400).json({ Error: 'Invalid id!' });
  }

  const repoIndex = repositories.findIndex((repo) => repo.id === id);

  if (repoIndex === -1) {
    return response.status(400).json({ Error: 'Id not found!' });
  }

  repositories[repoIndex] = {
    ...repositories[repoIndex],
    likes: repositories[repoIndex].likes + 1,
  };

  return response.json({ likes: repositories[repoIndex].likes });
});

module.exports = app;
