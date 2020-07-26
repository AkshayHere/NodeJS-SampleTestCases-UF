import axios from 'axios';

it('Export All Teacher\'s Workload | GET', async () => {
  await axios.get('http://localhost:3000/api/reports/workload')
    .then(function (response) {
      // console.log(response);
      // console.log(response.status);
      // console.log(response.data);
      expect.assertions(2);
      expect(response.status).toBe(200);
      expect(Array.isArray(response.data)).toBe(true);
    })
  // .catch(function (error) {
  //   console.log('error');
  //   console.log(error);
  // });
});