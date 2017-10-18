// Display correct details tab based on selection
const tabs = document.querySelectorAll('.type');
const tabPages = document.querySelectorAll('.details');
let count = 0;
tabs.forEach(tab => tab.addEventListener('click', changeTab));

function changeTab(e) {
  //Change the active tab icon at the top
  tabs.forEach(tab => tab.classList.remove('active'));
  e.target.classList.add('active');
  //Change the actual tab
  tabPages.forEach(page => page.classList.remove('active-page'));
  let chosenTab = e.target.innerHTML.toLowerCase();
  let activatedPage = document.querySelector(`.${chosenTab}`);
  if(activatedPage) activatedPage.classList.add('active-page');
}

// Get form data
document.querySelector('.submit').addEventListener('click', function(e) {
  e.preventDefault();
  let formData = [];
  const form = document.querySelector('form');
  // Count current people in queue
  const queue = document.querySelector('.queue-customers')
  count++;
  formData.push((count));

  //Check tab selected
  const customerType = document.querySelector('.active').innerHTML;
  formData.push(customerType);
  switch (customerType) {
    case 'Citizen':
      const select = document.querySelector('select');
      const title = select.options[select.selectedIndex].value;
      const firstName = form['firstName'].value;
      const surname = form['lastName'].value;
      if (firstName && surname) {
        formData.push(`${title} ${firstName} ${surname}`);
      } else {
        alert('Please fill out both your first name and last name');
        return;
      }
      break;
    case 'Organisation':
      const organisation = form['organisation'].value;
      if (organisation) {
        formData.push(organisation);
      } else {
        alert('Please fill out your organisation name');
        return;
      }
      break;
    case 'Anonymous':
      formData.push('Anonymous');
      break;
  };


  // Get radios selection
  const radios = form['service'];
  let checked = false;
  radios.forEach(radio => {
    if (radio.checked) {
      checked = true;
      formData.push(radio.value);
    }
  })
  // Force it to be selected
  if (checked === false) {
    alert('Please select a service');
    return;
  }

  // Timestamp it
  let now = new Date();
  let minutes = now.getMinutes();
  let hours = now.getHours();
  if (minutes < 10) minutes = `0${minutes}`;
  formData.push(`${hours}:${minutes}`);


  // Append to Queue
  var node = document.createElement("DIV");
  node.classList.add('queue-customer');
  queue.appendChild(node);
  const current = queue.lastElementChild;
  for (i = 0; i < formData.length; i++) {
    var node = document.createElement("DIV");
    if (typeof formData[i] === 'number') {
      node.classList.add('customer-info','id');
    } else {
      node.classList.add('customer-info');
    }
    node.innerHTML = formData[i];
    current.appendChild(node);
  }

});
