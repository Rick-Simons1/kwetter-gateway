import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    http_req_duration: ['p(95)<500'], // 95 percent of response times must be below 500ms
  },
  scenarios: {
    different_scaling: {
      exec: 'AllMessageTest',
      executor: 'ramping-vus',
      startVUs: 100,
      stages: [
        { duration: '1m', target: 250 },
        { duration: '2m30s', target: 500 },
        { duration: '1m', target: 0 },
      ],
    },
    different_scaling_profile: {
      exec: 'MessageByUserProfile',
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '30s', target: 20 },
        { duration: '1m30s', target: 10 },
        { duration: '20s', target: 0 },
      ],
    },
  },
};

export function AllMessageTest() {
  var headers = {
    Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjdwT3pnODduMXlvSFlLU2VoT3kzRCJ9.eyJuaWNrbmFtZSI6InJpY2tzaW1vbnMxMjM0NSIsIm5hbWUiOiJyaWNrc2ltb25zIiwicGljdHVyZSI6Imh0dHBzOi8vcy5ncmF2YXRhci5jb20vYXZhdGFyLzUxYTEzYTY5MzA2NGNjNjg1ZWE0NTViM2Q0ZTY0ZmJiP3M9NDgwJnI9cGcmZD1odHRwcyUzQSUyRiUyRmNkbi5hdXRoMC5jb20lMkZhdmF0YXJzJTJGcmkucG5nIiwidXBkYXRlZF9hdCI6IjIwMjItMDYtMThUMTI6NDg6MzcuNzU4WiIsImVtYWlsIjoicmlja3NpbW9uczEyMzQ1QHlhaG9vLm5sIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJpc3MiOiJodHRwczovL2Rldi1pdDJxZ3pyby51cy5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NjI0ZWRiM2ZlZmMxNmIwMDY4NDZmOGNhIiwiYXVkIjoieE5iZ1R6ZW1Hck1Ta0h5T2YwZndGUmMzOXQwQ0Y1QVEiLCJpYXQiOjE2NTU1NTc5NTgsImV4cCI6MTY1NTU5Mzk1OCwibm9uY2UiOiJkMHhUYm05Sk1rVmlURGhGWDE5R2VVVkRWRU5zY0ZSRVIzVlFiWE14TlRkd1lYVkRXRTF5ZWpKQk5nPT0ifQ.E_krJkA59WRQZe3V-wFzBLsPz3uLVwyd77TqbvQXUYjiwtlInOCt4GzDAgm8kSgMyt8SM-0-q5y-qq4WH6v9xx11pKL-LKB8tUG8JX37NX16WaqNhvUfZ5L9ZMuiwtHlcZiv_WNICbbZjcn_KI1AUtrmAO5qpIjrDrxw0x-tC4iYKWhNp-Cm7NNs1xld9WTKW_ClSQDqoPvOhOkGwpsE-kVH7GeYvLHHebqJP2DDOhJxTg5K9sabtaO6fEefx--VdPiBsKNa9xHsF3ffS1-Wwj6XSFdUOndjqixF-Gwr-ocZAB96WT0KFJpuUITLoZHghW8m5hsZIyM9kclPGY1SgQ`,
  };

  const res = http.get('http://20.105.24.28/message', { headers: headers });
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}

export function MessageByUserProfile() {
  var headers = {
    Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjdwT3pnODduMXlvSFlLU2VoT3kzRCJ9.eyJuaWNrbmFtZSI6InJpY2tzaW1vbnMxMjM0NSIsIm5hbWUiOiJyaWNrc2ltb25zIiwicGljdHVyZSI6Imh0dHBzOi8vcy5ncmF2YXRhci5jb20vYXZhdGFyLzUxYTEzYTY5MzA2NGNjNjg1ZWE0NTViM2Q0ZTY0ZmJiP3M9NDgwJnI9cGcmZD1odHRwcyUzQSUyRiUyRmNkbi5hdXRoMC5jb20lMkZhdmF0YXJzJTJGcmkucG5nIiwidXBkYXRlZF9hdCI6IjIwMjItMDYtMThUMTI6NDg6MzcuNzU4WiIsImVtYWlsIjoicmlja3NpbW9uczEyMzQ1QHlhaG9vLm5sIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJpc3MiOiJodHRwczovL2Rldi1pdDJxZ3pyby51cy5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NjI0ZWRiM2ZlZmMxNmIwMDY4NDZmOGNhIiwiYXVkIjoieE5iZ1R6ZW1Hck1Ta0h5T2YwZndGUmMzOXQwQ0Y1QVEiLCJpYXQiOjE2NTU1NTc5NTgsImV4cCI6MTY1NTU5Mzk1OCwibm9uY2UiOiJkMHhUYm05Sk1rVmlURGhGWDE5R2VVVkRWRU5zY0ZSRVIzVlFiWE14TlRkd1lYVkRXRTF5ZWpKQk5nPT0ifQ.E_krJkA59WRQZe3V-wFzBLsPz3uLVwyd77TqbvQXUYjiwtlInOCt4GzDAgm8kSgMyt8SM-0-q5y-qq4WH6v9xx11pKL-LKB8tUG8JX37NX16WaqNhvUfZ5L9ZMuiwtHlcZiv_WNICbbZjcn_KI1AUtrmAO5qpIjrDrxw0x-tC4iYKWhNp-Cm7NNs1xld9WTKW_ClSQDqoPvOhOkGwpsE-kVH7GeYvLHHebqJP2DDOhJxTg5K9sabtaO6fEefx--VdPiBsKNa9xHsF3ffS1-Wwj6XSFdUOndjqixF-Gwr-ocZAB96WT0KFJpuUITLoZHghW8m5hsZIyM9kclPGY1SgQ`,
  };

  const res = http.get(
    'http://20.105.24.28/message/all/624edb3fefc16b006846f8ca',
    { headers: headers },
  );
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}
