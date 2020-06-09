
var docClient = new AWS.DynamoDB.DocumentClient();
/* GET home page. */
exports.Login = function (req, res, ten,pwd) {
    var params = {
        TableName : "TaiKhoan",

    };
    docClient.scan(params, function(err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        } else {
            console.log("Query succeeded.");
            data.Items.forEach(function(item) {
                console.log(data.Items);
                if (item.matKhau == pwd && item.taiKhoan == ten){
                    res.cookie ("account",item.taiKhoan, 1000*60*60*24);
                    res.cookie ("KeyLogin",true, 1000*60*60*24);
                    console.log("Login succsess");
                    var paramkh = {
                        TableName: "KhachHang",

                    }
                    docClient.scan(paramkh, function (err1, data1) {
                        if (err1) {
                            console.error("Unable to query. Error:", JSON.stringify(err1, null, 2));
                        } else {
                           // console.log(data1.Items);
                            req.session.username = data1.Items[0].tenKH;
                            data1.Items.forEach(function (itemm) {
                                if (itemm.maKH == item.maKH){
                                    res.redirect("/");
                                    console.log("Welcom "+itemm.tenKH+" to my shop");
                                }
                            })
                        }
                    })
                }
            });
        }
    });
}
