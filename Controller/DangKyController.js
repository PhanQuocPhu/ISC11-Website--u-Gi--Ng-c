var AWS = require('aws-sdk');
AWS.config.update({
    region: "us-west-2",
    accessKeyId: "AKIAIPKTQD44TJXEEIKQ",
    secretAccessKey: "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",
    endpoint: "https://dynamodb.us-west-2.amazonaws.com"
});
var docClient = new AWS.DynamoDB.DocumentClient();
/* GET home page. */
var CUSTOMEPOCH = 1300000000000; // artificial epoch
function generateRowId(shardId /* range 0-64 for shard/slot */) {
    var ts = new Date().getTime() - CUSTOMEPOCH; // limit to recent
    var randid = Math.floor(Math.random() * 512);
    ts = (ts * 64);   // bit-shift << 6
    ts = ts + shardId;
    return (ts * 512) + (randid % 512);
}

exports.DangKy = function (req, res, matkhau,ten,email,sdt) {
    var id = generateRowId(5);
    var id2 = generateRowId(5);
    var maTK = ""+id;
    var maKH = ""+id2;
    var paramtk = {
        TableName: "TaiKhoan",
        Item: {
            "maTK": maTK,
            "maKH": maKH,
            "matKhau": matkhau,
            "taiKhoan": email
        }
    };
    docClient.put(paramtk, function (err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        } else {
            console.log("Thêm tài khoản Oke");
        }
    })
    var paramKH = {
        TableName: "KhachHang",
        Item: {
            "maKH": maKH,
            "tenKH": ten,
            "email": email,
            "sdt": sdt
        }
    };
    docClient.put(paramKH, function (err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        } else {
            console.log("Thêm Khách hàng Oke");
        }
    })
    res.redirect("/");
}
