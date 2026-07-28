const { test } = require('node:test');
const assert = require('node:assert');
const http = require('node:http');
const { server } = require('../server.js');

function closeServer() {
  return new Promise((resolve) => server.close(resolve));
}

test('GET / responde 200 con un mensaje y una version', async () => {
  await new Promise((resolve) => server.listen(0, resolve));
  const { port } = server.address();

  const response = await new Promise((resolve, reject) => {
    http
      .get(`http://localhost:${port}/`, (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => resolve({ status: res.statusCode, data }));
      })
      .on('error', reject);
  });

  const parsed = JSON.parse(response.data);

  // Envolvemos las aserciones para garantizar que el servidor se cierre
  try {
    assert.strictEqual(response.status, 200);
    assert.ok(parsed.message, 'la respuesta debe incluir un mensaje');
    assert.ok(parsed.version, 'la respuesta debe incluir una version');
  } finally {
    await closeServer(); // ¡Esto se ejecutará siempre, falle o no el test!
  }
});

test('una ruta inexistente responde 404', async () => {
  await new Promise((resolve) => server.listen(0, resolve));
  const { port } = server.address();

  const response = await new Promise((resolve, reject) => {
    http
      .get(`http://localhost:${port}/no-existe`, (res) => {
        res.resume();
        resolve({ status: res.statusCode });
      })
      .on('error', reject);
  });

  assert.strictEqual(response.status, 404);

  await closeServer();
});
