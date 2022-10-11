$(document).ready(function () {
  var total = 0;

  //GETS THE TOTAL PRICE OF ALL THE ITEMS
  var totalPrice = function () {
    var itemPrice = $(".item-price");
    var itemQuantity = $(".quantity");
    total = 0;

    //LOOPS THROUGH ALL THE ITEMS IN THE LIST TO GET THE ITEM TOTAL AND SUB TOTAL
    for (i = 0; i < itemQuantity.length; i++) {
      var price = Number($(itemPrice[i]).text().replace(/\$/, ""));
      var subtotal = Number($(itemQuantity[i]).val()) * price;
      if (subtotal != 0) {
        $($(".total-item-price")[i]).text("$" + subtotal);
      } else {
        $($(".total-item-price")[i]).text("$--.--");
      }
      total += subtotal;
    }
    $("#sum-total").text("$ " + total);

    return total;
  };

  //CHANGES THE TOTAL PRICE WHEN YOU CHANGE THE QUANTITY
  //ALSO SETS A DELAY BEFORE THE NUMBER CHANGES
  totalPrice();
  var timeout;
  $("body").on("input", ".quantity", function () {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      totalPrice();
    }, 300);
  });

  //THE HTML THAT IS ADDED WHEN ADDING SOMETHING TO THE LIST
  var addItem = function (name, cost) {
    name = name.charAt(0).toUpperCase() + name.slice(1);
    $("tbody").append(`<tr> 
    <td class="item-name">${name}</td>
    <td class="item-price">$${cost}</td>
    <td>
    <label>QTY</label
    ><input class="quantity" type="number" min="0" value="1" />
    <button class="btn btn-danger btn-sm remove">Remove</button>
    </td>
    <td class="total-item-price"></td>
    </tr>
    `);
    totalPrice();
  };

  //CLICKING THE REMOVE BUTTON REMOVES FROM THE LIST
  $("body").on("click", ".remove", function () {
    $(this).closest("tr").remove();
    totalPrice();
  });

  //CLICKING THE ADD BUTTON ADDS TO THE LIST
  $("body").on("click", "#add", function () {
    addItem($("#name").val(), $("#cost").val());
    totalPrice();
    //CLEARS THE INPUTS AND PUTS THE CURSUR BACK IN THE 'ITEM' INPUT FIELD
    document.getElementById("name").value = "";
    document.getElementById("cost").value = "";
    document.getElementById("name").focus();
    document.getElementById("name").select();
  });
});
