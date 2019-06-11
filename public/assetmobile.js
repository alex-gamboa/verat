const btnSubmit = document.querySelector('#btnSubmit')
const txtControlNumber = document.querySelector('#txtControlNumber')
const txtMarca = document.querySelector('#txtMarca')
const txtModelo = document.querySelector('#txtModelo')
const cbxCategory = document.querySelector('#cbxCategory')
const cbxTipo = document.querySelector('#cbxTipo')
const modal = document.querySelector('#exampleModal')
const containerData = document.querySelector('#container-data')
const containerWithoutControl = document.querySelector('#container-without-control-number')
const containerSubmit = document.querySelector('#container-submit')
const chckWithoutControlNumber = document.querySelector('#chck-without-control')
const cbxArea = document.querySelector('#cbxArea')
const cbxUser = document.querySelector('#cbxUser')


let adding = false

axios.get('/api/assetCategories')
    .then(response => {

        response.data.forEach(category => {
            let option = document.createElement('option')
            option.text = category.name
            option.value = category.name
            cbxCategory.add(option)
        })

        cbxCategory.selectedIndex = -1
    })
    .catch(function (error) {
        console.log(error);
    });

axios.get('/api/assetAreas')
    .then(response => {

        response.data.forEach(area => {
            let option = document.createElement('option')
            option.text = area.name
            option.value = area.name
            cbxArea.add(option)
        })

        cbxArea.selectedIndex = -1
    })
    .catch(function (error) {
        console.log(error);
    });

axios.get('/api/users')
    .then(response => {

        response.data.forEach(user => {
            let option = document.createElement('option')
            option.text = user.fullName
            option.value = user.fullName
            cbxUser.add(option)
        })

        cbxUser.selectedIndex = -1
    })
    .catch(function (error) {
        console.log(error);
    });

cbxCategory.addEventListener('change', e => {
    axios.get('/api/assetKinds/' + cbxCategory.options[cbxCategory.selectedIndex].value)
        .then(response => {

            for (let i = cbxTipo.options.length - 1; i >= 0; i--) {
                // select.options[i] = null;
                cbxTipo.options[i] = null
            }

            for (let index = 0; index < response.data.length; index++) {
                let option = document.createElement('option')
                option.text = response.data[index].name
                option.value = response.data[index].name
                cbxTipo.add(option)
            }

            cbxTipo.selectedIndex = -1
        })
        .catch(function (error) {
            console.log(error);
        });
})

btnSubmit.addEventListener('click', (e) => {
    axios
        .post('/api/assets', {
            controlNumber: txtControlNumber.value,
            category: cbxCategory[cbxCategory.selectedIndex].value,
            kind: cbxTipo[cbxTipo.selectedIndex].value,
            brand: txtMarca.value,
            model: txtModelo.value,
            isWithoutControlNumber: false,
            serialNumber: document.querySelector('#txtSerialNumber').value,
            user: null,
            area: "",
            barcode: document.querySelector('#txtBarcode').value,
            quantity: document.querySelector('#txtQuantity').value
        })
        .then(function (response) {
            showMessage(`activo ${ txtControlNumber.value } agregado.`)
            cleanView()
        })
        .catch(function (error) {
            console.log(error);
        });
},false)

txtControlNumber.addEventListener('keydown', (e) => {
    if (e.keyCode == 13) {
        axios.get('/api/assets/' + txtControlNumber.value)
        .then(response => {
            if(!response.data.length) {
                chckWithoutControlNumber.checked = false
                containerWithoutControl.style.display = "none"
                containerData.style.display = "block"
                containerSubmit.style.display = "block"
                adding = true
            }
            else {
                axios.post('/api/assets/contabilizar' , {
                    asset: txtControlNumber.value
                })
                .then( () => {
                    showMessage(`activo ${ txtControlNumber.value } contabilizado.`)
                    cleanView()
                })
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }
})

chckWithoutControlNumber.addEventListener('click', (e) => {
    if (chckWithoutControlNumber.checked) {
        containerData.style.display = "block"
        containerSubmit.style.display = "block"
        containerWithoutControl.style.display = "block"
    }
    else {
        if (adding) {
            containerWithoutControl.style.display = "none"
        }
        else {
            containerWithoutControl.style.display = "none"
            containerData.style.display = "none"
            containerSubmit.style.display = "none"
        }
    }
})

function showMessage(message) {
    document.querySelector('#infoMessage').innerHTML = message
    $("#exampleModal").modal()
}

function cleanView() {
    containerWithoutControl.style.display = "none"
    containerData.style.display = "none"
    containerSubmit.style.display = "none"
    chckWithoutControlNumber.checked = false
    adding = false
    txtControlNumber.value = ""
}
