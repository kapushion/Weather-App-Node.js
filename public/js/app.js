console.log('client side js')

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data) =>{
//         console.log(data)
//     } )
// })


const weatherForm = document.querySelector('form')

const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value

    message1.textContent = ''
    message2.textContent = ''

    if(location) {
        fetch('http://localhost:3000/weather?address='+location).then((response)=>{
            response.json().then((data)=>{
                if(data.error) {
                   message1.textContent = data.error
                } else{

                    message1.textContent = 'Location: ' + data.location
                    message2.textContent = 'Forecast: ' + data.forecast
                }
            })
            .catch((error)=>console.log(error))
        })
    } else {
        console.log('please provide a address')
    }




})