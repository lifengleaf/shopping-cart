const added_items = []

$("button.add-btn").on("click", function(){
    let this_item = {}
    let item_name = $(this).siblings(".product-name").text();
    // discard the $ sign and change string to number
    let item_price = Number($(this).siblings(".product-price").text().slice(1,));
    
    let isExisting;
    for(var i=0; i<added_items.length; i++){
        if(added_items[i].name == item_name){
            added_items[i].quantity += 1;
            isExisting = true;
            break;
        }
    }
    if(isExisting != true){
        this_item.name = item_name;
        this_item.price = item_price;
        this_item.quantity = 1;
        added_items.push(this_item);
    }

    $(".cart").empty();

    added_items.forEach(function(item) {
        $(".cart").append("<p>" + item.name + "</p>");
        $(".cart").append("<p>" + item.price * item.quantity + "</p>");
    }, this);  

    let subtotal = added_items.reduce(function(prev, elem){
        return prev + elem.price*elem.quantity;
    }, 0)

    $("#subtotal").html(subtotal);
    const taxRate = 0.1;
    $("#tax").html((subtotal*taxRate).toFixed(2));
    $("#total").html((subtotal*(1+taxRate)).toFixed(2));
})

