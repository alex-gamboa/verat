const btnPost = document.querySelector('#btnSend')

btnPost.addEventListener('click', (e) => {
    axios.post('/api/tickets', {
        description: 'this is a ticket from axios'
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
},false)
