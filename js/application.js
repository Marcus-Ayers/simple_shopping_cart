$(document).ready(function () {
  var total = 0;

  var sum = function () {
    var prices = $(".item-price");
    var qty = $(".item-quantity");

    for (i = 0; i < qty.length; i++) {
      var price = Number($(prices[i]).text().replace(/\$/, ""));
      var subtotal = Number($(qty[i]).val()) * price;
      if (subtotal != 0) {
        $($(".item-subtotal")[i]).text("$" + subtotal);
      } else {
        $($(".item-subtotal")[i]).text("$--.--");
      }
      total += subtotal;
    }
    $(".total-item-price").text("$ " + total);
    var addSpace = " ";
    var spaces = total.toString();
    spaces = spaces.length;
    spaces = 12 - spaces;
    for (i = 0; i < spaces; i++) {
      addSpace += " ";
    }
    return total;
  };

  var addItem = function (name, cost) {
    name = name.charAt(0).toUpperCase() + name.slice(1);
    $("tbody").append(`<tr> 
    <td class="item">${name}</td>
    <td class="price">$${cost}</td>
    <td class="quantity">
      <label>QTY</label><input type="number" min="0" value="1"/>
      <button class="btn btn-light btn-sm remove">Remove</button>
    </td>
    <td class="subtotal"></td>
    </tr>
    `);
  };

  $("body").on("click", ".remove", function (event) {
    $(this).closest("tr").remove();
    updateTotalCart();
  });
  $(document).on("click", "#fork", function () {
    addItem($("#name").val(), $("#cost").val());
  });
});
