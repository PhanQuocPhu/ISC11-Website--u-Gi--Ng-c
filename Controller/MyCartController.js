
var docClient = new AWS.DynamoDB.DocumentClient();
/* GET home page. */
module.exports = function Cart(oldCart) {
    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;

    this.add = function (item, id) {
        var storedItem = this.items[id];
        if (!storedItem) {
            storedItem = this.item[id] = {item: item, qty: 0, price: 0};
        }
        storedItem.qty++;
        storedItem.price = storedItem.item.price + storedItem.qty;
        this.totalQty++;
        this.totalPrice += storedItem.price;

    };
    this.generateArray = function () {
        var arr = [];
        for (var id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    };
    this.findProduct = function (req, res, tenSP, next) {
        var params = {
            TableName: "SanPham",
            KeyConditionExpression: "#tenSP = :ten ",
            ExpressionAttributeNames: {
                "#tenSP": "tenSP"
            },
            ExpressionAttributeValues: {
                ":ten": tenSP
            }
        };
        docClient.query(params, function (err, data) {
            if (err) {
                console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
            } else {
                console.log("Query succeeded.");
                data.Items.forEach(function (item) {
                    var cookie= {
                        masp : item.maSP,
                        tensp : tenSP,
                        URL : item.url,
                        giasp : item.giaSP,
                        mota : item.mota,
                        maloai : item.maLoai
                    };
                    cookieArray.push(cookie);
                    saveCookie(res, "Cart" , cookieArray , 24*60*60*1000);
                })
                res.redirect("/MyCart2");
            }
        });
    };
function  saveCookie (res , name , value , maxAge) {
       res.cookie(name , value, {maxAge : maxAge})
    };
 this.removeItemCart = function(req,res, tenSP) {
     var cookie = req.cookies.Cart;
     cookie.forEach(function (item) {
         var cookieee= {
             masp : item.maSP,
             tensp : tenSP,
             URL : item.url,
             giasp : item.giaSP,
             mota : item.mota,
             maloai : item.maLoai
         };
         if (cookieee.tensp == tenSP){
             cookieArray.splice(cookieee,1);
             saveCookie(res , "Cart", cookieArray,24*60*60*1000);
             res.redirect("/MyCart2");
         }
     })

}
}
