console.log("client side js file loaded");
// fetch('https://puzzle.mead.io/puzzle').then((res) => {
//     res.json().then((data) => {
//         console.log(data);
//     })

// })
const fetchWeatherData = (searchString, messageOne, messageTwo) => {
    // let url = './weather?address=' + searchString;
    let url = '/weather?address=' + searchString;
    fetch(url).then((res) => {

        res.json().then((data) => {
            if(data.error) {
                messageOne.textContent = error;
            }
            else {
                messageOne.textContent = data.location;
            }
        })
    })
}

window.onload = () => {
    const weatherFrom = document.querySelector('form');
    const search = document.querySelector("input");
    const messageOne = document.querySelector("#message-one");
    const messageTwo = document.querySelector("#message-two");
    messageOne.textContent= "Loading Message";
weatherFrom.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    fetchWeatherData(location, messageOne, messageTwo);
    console.log(location);

})

}