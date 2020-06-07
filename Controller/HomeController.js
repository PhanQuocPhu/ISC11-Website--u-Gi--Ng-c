var AWS = require('aws-sdk');
var bodyParser = require("body-parser");
var multer = require("multer");
var sanpham = [];
AWS.config.update({
    region: "us-west-2",
    accessKeyId: "AKIAIPKTQD44TJXEEIKQ",
    secretAccessKey: "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",
    endpoint: "https://dynamodb.us-west-2.amazonaws.com"
});
var docClient = new AWS.DynamoDB.DocumentClient();
/* GET home page. */
exports.load = function (req, res) {
    var params = {
        TableName: "SanPham"
    };
    docClient.scan(params, function (err1, data) {
        if (err1) {
            console.error("Unable to query. Error:", JSON.stringify(err1, null, 2));
        } else {
            // data.Items.forEach(function (item) {
            //     querySP(item);
            //
            // })
            // sanpham.forEach(function (sp) {
                res.render("Home", {data:data.Items});
                console.log(sanpham);
            // })
        }
    })
}

function querySP(item) {
    var paramsp = {
        TableName: "SanPham",
        FilterExpression: "#masp =:maSP",
        ExpressionAttributeNames: {
            "#masp": "maSP"
        },
        ExpressionAttributeValues: {
            ":maSP": item.maSP
        }
    }
    docClient.scan(paramsp, function (err, data1) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err1, null, 2));
        } else {
            data1.Items.forEach(function (sp) {
                var phien = {
                    maPhienDG : item.maPhienDG,
                    giaDauGia : item.giaDauGia,
                    sp : sp,
                    ngayDG : item.ngayDG,
                    thoigianDG : item.thoigianDG
                }
                sanpham.push(sp);
             //   console.log(sanpham);
            })
        }
    })
}

exports.loadComputer = function (req, res, tenLoai) {
    var params = {
        TableName: "LoaiSanPham",
        KeyConditionExpression: "#tl =:yyyy",
        ExpressionAttributeNames: {
            "#tl": "tenLoai",
        },
        ExpressionAttributeValues: {
            ":yyyy": tenLoai,
        }
    };
    docClient.query(params, function (err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        } else {
            console.log(data.Items);
        }
        data.Items.forEach(function (item) {
            var idloai = item.maLoai;
            var paramsp = {
                TableName: "SanPham",
                FilterExpression: "#yr =:end_yr",
                ExpressionAttributeNames: {
                    "#yr": "maLoai"
                },
                ExpressionAttributeValues: {
                    ":end_yr": idloai
                }
            }
            docClient.scan(paramsp, function (err1, data1) {
                if (err1) {
                    console.error("Unable to query. Error:", JSON.stringify(err1, null, 2));
                } else {
                    console.log(data1.Items);
                    res.render('Home', {data: data1.Items});
                }
            })
        })
    })
}
exports.search = function (req, res, value) {
    var params = {
        TableName: "SanPham",
        KeyConditionExpression: "#tenSP =:t",
        ExpressionAttributeNames: {
            "#tenSP": "tenSP"
        },
        ExpressionAttributeValues: {
            ":t": value
        }
    }
    docClient.query(params, function (err1, data1) {
        if (err1) {
            console.error("Unable to query. Error:", JSON.stringify(err1, null, 2));
        } else {
            res.render('Home', {data: data1.Items});
            console.log(data1.Items);

        }
    })
}

