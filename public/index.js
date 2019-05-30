const btnPost = document.querySelector('#btnSend')
const txtControlNumber = document.querySelector('#txtControlNumber')
const txtResult = document.querySelector('#txtResult')

btnPost.addEventListener('click', (e) => {
    axios.post('/api/assets', {
      controlNumber: txtControlNumber.value,
      category: '5ceefc8810af9d0920e50b27',
      isWithoutControlNumber: false
      })
      .then(function (response) {
        txtResult.value = "se armo la machaca"
      })
      .catch(function (error) {
        console.log(error);
      });
},false)
