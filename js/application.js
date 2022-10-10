var calculateSubTotal = function (ele) {
  var quantityItem = Number(`${$(ele).find(".item-quantity input").val()}`);
  var priceItem = Number(
    `${$(ele).children(".item-price").text()}`.replace(/[^0-9.-]+/g, "")
  );

  var subTotal = quantityItem * priceItem;
  if (subTotal >= 0) {
    $(ele)
      .children(".total-item-price")
      .html(`$${parseFloat(Math.round(subTotal * 100) / 100).toFixed(2)}`);
  }

  return subTotal;
};
var sum = function (acc, x) {
  return acc + x;
};
var updateTotalCart = function () {
  var allSubTotals = [];

  $("tbody tr").each(function (i, ele) {
    var subTotal = calculateSubTotal(ele);
    allSubTotals.push(subTotal || 0); // push result of subtotal function to array or a zero if NaN
  });

  if (allSubTotals.length == 0) {
    $("#totalCart").html(`$--.--`);
  } else {
    var totalCart = allSubTotals.reduce(sum);
    $("#totalCart").html(
      `$${parseFloat(Math.round(totalCart * 100) / 100).toFixed(2)}`
    );
  }
};
$(document).ready(function () {
  updateTotalCart();
  var timeout;
  $("body").on("input", "tr input", function () {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      updateTotalCart();
    }, 500);
  });

  var addItem = function (name, cost) {
    name = name.charAt(0).toUpperCase() + name.slice(1);
    $("tbody").append(`<tr> 
    <td class="item-name">${name}</td>
    <td class="item-price">$${cost}</td>
    <td class="item-quantity">
      <label>QTY</label><input type="number" min="0" value="1"/>
      <button class="btn btn-danger btn-sm remove">Remove</button>
    </td>
    <td class="total-item-price"></td>
    </tr>
    `);
    updateTotalCart();
  };

  $("body").on("click", ".remove", function (event) {
    $(this).closest("tr").remove();
    updateTotalCart();
  });
  $(document).on("click", "#fork", function () {
    addItem($("#name").val(), $("#cost").val());
    updateTotalCart();
    document.getElementById("name").value = "";
    document.getElementById("cost").value = "";
    document.getElementById("name").focus();
    document.getElementById("name").select();
  });
});
