jQuery(function () {
  jQuery(".dinheiro").maskMoney({
    prefix: "R$ ",
    thousands: ".",
    decimal: ",",
  });
});

jQuery(function () {
  jQuery(".porcentagem").maskMoney({
    suffix: "%",
    precision: 0,
  });
});

$(document).ready(function () {
  var elements = document.getElementsByTagName("INPUT");
  for (var i = 0; i < elements.length; i++) {
    elements[i].oninvalid = function (e) {
      e.target.setCustomValidity("");
      if (!e.target.validity.valid) {
        e.target.setCustomValidity("Este campo deve ser preenchido");
      }
    };
    elements[i].oninput = function (e) {
      e.target.setCustomValidity("");
    };
  }
});
