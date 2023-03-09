const fetchWeatherData = (searchString, messageOne, messageTwo) => {
    // let url = './weather?address=' + searchString;
    messageOne.textContent= "Searching For Weather";
    let url = './weather?address=' + searchString;
    fetch(url).then((res) => {

        res.json().then((data) => {
            if(data.error) {
                messageOne.textContent = error;
            }
            else {
                console.log("data object is", data);
                let messageOneText = "Temperature in " + data.location + " is " + data.temperature  + ' degrees farenheight. The humidity is ' + data.humidity +
                " degrees farenheight.";
                messageOne.textContent = messageOneText;
            }
        })
    })
}
window.onload = () => {
    const weatherForm = document.querySelector('form');
    const search = document.querySelector("input");
    const messageOne = document.querySelector("#message-one");
    const messageTwo = document.querySelector("#message-two");
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    fetchWeatherData(location, messageOne, messageTwo);
    console.log(location);

})

}