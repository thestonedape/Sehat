import {test} from 'node:test';
import assert from 'node:assert/strict';
import {requestPrediction} from '../src/utils/predictionApi.mjs';

test('preserves successful prediction fields', async () => {
  const result = {predicted_class: 'Eczema', confidence: 0.6, all_predictions: [{class_name: 'Eczema', confidence: 0.6}], model_version: 'v2'};
  assert.deepEqual(await requestPrediction('https://example.test', new FormData(), async () => Response.json(result)), result);
});
test('API failures reject instead of manufacturing a prediction', async () => {
  for (const status of [413, 415, 422, 429, 500, 503]) {
    await assert.rejects(requestPrediction('https://example.test', new FormData(), async () => new Response('', {status})));
  }
});
test('network failures and malformed results never become predictions', async () => {
  await assert.rejects(requestPrediction('https://example.test', new FormData(), async () => {throw new TypeError('offline');}));
  await assert.rejects(requestPrediction('https://example.test', new FormData(), async () => Response.json({message: 'starting'})));
});
