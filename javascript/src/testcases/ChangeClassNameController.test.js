import axios from 'axios';

// Test Parameters
const classCode = 'P1-1';
const jsonBody = {
  'className': 'TEST1'
};

it('Change Class Name by Class Code | PUT', async () => {
  await axios.put('http://localhost:3000/api/class/' + classCode, jsonBody, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(function (response) {
      // console.log(response);
      // console.log(response.status);
      expect.assertions(2);
      // 204
      expect(response.status).toBe(204);
      // Expecting NO CONTENT
      expect(response.data).toBe('');
    });
  // .catch(function (error) {
  //   console.log('error');
  //   console.log(error);
  // });
});