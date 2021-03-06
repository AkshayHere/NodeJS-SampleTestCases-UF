import axios from 'axios';

// Test Parameters
const querys = {
  offset: 1,
  limit: 6
};
const classCode = 'C1';

it('Get Student Details by Class Code | GET', async () => {
  await axios.get('http://localhost:3000/api/class/' + classCode + '/students',
    {
      params: querys
    }
  )
    .then(function (response) {
      // console.log(response.status);
      // console.log(response.data);
      expect.assertions(3);
      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('count');
      expect(response.data).toHaveProperty('students');
    })
    .catch(function (error) {
      console.log('error');
      console.log(error);
    });
});