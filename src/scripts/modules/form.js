// Extract data from form
function getDataObject(form) {
  const iterator = new FormData(form).entries();
  const data = [...iterator];
  const dataObject = data.reduce((object, element) => {
    const key = element[0];
    const value = element[1];
    object[key] = value;
    return object;
  }, {});

  return dataObject;
}

function addOverlayEvents() {
  const overlay = document.querySelector('.overlay');

  overlay.focus();

  overlay.addEventListener('click', (event) => {
    if (event.target.className === 'overlay') overlay.remove();
  });

  overlay.addEventListener('keydown', (event) => {
    if (event.keyCode === 27) overlay.remove();
  });
}

export { getDataObject, addOverlayEvents };
