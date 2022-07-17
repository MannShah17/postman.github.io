console.log('Project 6 From JS');

//Utility functions
// 1.utility function to get dom

function getElementFromString(string) {
  let div = document.createElement('div');
  div.innerHTML = string;
  return div.firstElementChild;
}

//Initialize nember of parameters
let addedParamsCount = 0;

let parametersBox = document.getElementById('parametersBox');
//hide the parameters box initially
parametersBox.style.display = 'none';

//If the user clicks on params hide the json box

let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click', () => {
  document.getElementById('requestJsonBox').style.display = 'none';
  document.getElementById('parametersBox').style.display = 'block';
})


//If the user clicks on json hide the params box 
let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click', () => {
  document.getElementById('parametersBox').style.display = 'none';
  document.getElementById('requestJsonBox').style.display = 'block';
})

//if the user clicks on plus button add more parameters

let addParam = document.getElementById('addParam');
addParam.addEventListener('click', () => {
  let params = document.getElementById('params');
  let string = `<div class="row g-3">
  <legend>Parameter ${addedParamsCount+2}</legend>
  <div class="col">
    <input type="text" class="form-control" placeholder="Enter parameter ${addedParamsCount+2} key" aria-label="First name"
      id="parameterKey ${addedParamsCount+2}">
  </div>
  <div class="col">
    <input type="text" class="form-control" placeholder="Enter parameter ${addedParamsCount+2} value" aria-label="Last name"
      id="parameterValue${addedParamsCount+2}">
  </div>
  <button class="btn btn-primary deleteParam">-</button>
</div>`

  //convert the element string to DOM node

  let paramElement = getElementFromString(string);
  params.appendChild(paramElement);

  //Add event listner to remove the parameter on clicking -

  let deleteParam = document.getElementsByClassName('deleteParam');
  for (item of deleteParam) {
    item.addEventListener('click', (e) => {
      e.target.parentElement.remove();
    })
  }
  addedParamsCount++;
})

// If the user clicks on submit button

let submit = document.getElementById('submit');
submit.addEventListener('click', () => {
  //show please wait in the response box to request 
  document.getElementById('responseJsonText').value = 'Please Wait...Fetching response'

  //Fetch all the values user has entered
  let url = document.getElementById('url').value;
  let requestType = document.querySelector("input[name='requestType']:checked").value;
  let contentType = document.querySelector("input[name='contentType']:checked").value;



  //If user has used params option instead of json collect all the parameters

  if (contentType == 'params') {
    data = {};
    for (let i = 0; i < addedParamCount + 1; i++) {
      if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
        let key = document.getElementById('parameterKey' + (i + 1)).value;
        let value = document.getElementById('parametervalue' + (i + 1)).value;
        data[key] = value;
      }
      data = JSON.stringify(data);
    }
  } else {
    data = document.getElementById('requestJsonText').value;
  }
  // log all the values in the console for debugging
  console.log('url is', url);
  console.log('requesst is ', requestType);
  console.log('content type is', contentType);
  console.log('data', data);
})