//GETS THE TOTAL PRICE OF ALL THE ITEMS
var total = 0;

var totalPrice = function () {
  var prices = $(".item-price");
  var qtys = $(".quantity");

  total = 0;

  for (i = 0; i < qtys.length; i++) {
    var price = Number($(prices[i]).text().replace(/\$/, ""));
    var subtotal = Number($(qtys[i]).val()) * price;
    if (subtotal != 0) {
      $($(".total-item-price")[i]).text("$" + subtotal);
    } else {
      $($(".total-item-price")[i]).text("$--.--");
    }
    total += subtotal;
  }
  $("#totalCart").text("$ " + total);
  var addspace = "";
  var spaces = total.toString();
  spaces = spaces.length;
  spaces = 12 - spaces;
  for (i = 0; i < spaces; i++) {
    addspace += " ";
  }

  return total;
};
$(document).ready(function () {
  totalPrice();
  var timeout;
  $("body").on("input", "tr input", function () {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      totalPrice();
    }, 500);
  });

  var addItem = function (name, cost) {
    name = name.charAt(0).toUpperCase() + name.slice(1);
    $("tbody").append(`<tr> 
    <td class="item-name">${name}</td>
    <td class="item-price">$${cost}</td>
    <td class="item-quantity">
    <label>QTY</label
    ><input class="quantity" type="number" min="0" value="1" />
    <button class="btn btn-danger btn-sm remove">Remove</button>
    </td>
    <td class="total-item-price"></td>
    </tr>
    `);
    totalPrice();
  };

  $("body").on("click", ".remove", function (event) {
    $(this).closest("tr").remove();
    totalPrice();
  });
  $(document).on("click", "#add", function () {
    addItem($("#name").val(), $("#cost").val());
    totalPrice();

    //CLEARS THE INPUTS AND PUTS THE CURSUR BACK IN THE 'ITEM' INPUT FIELD
    document.getElementById("name").value = "";
    document.getElementById("cost").value = "";
    document.getElementById("name").focus();
    document.getElementById("name").select();
  });
});
