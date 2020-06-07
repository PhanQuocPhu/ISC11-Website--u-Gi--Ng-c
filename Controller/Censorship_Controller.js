var express = require('express');
var AWS = require('aws-sdk');
AWS.config.update({
    region: "us-west-2",
    accessKeyId: "AKIAIPKTQD44TJXEEIKQ",
    secretAccessKey: "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",
    endpoint: "https://dynamodb.us-west-2.amazonaws.com"
});
var docClient = new AWS.DynamoDB.DocumentClient();

// exports.insertSP=function(req, res, tensp, loai, gia, hinh, mota) {
//     var params = {
//         TableName: "SanPhamCho",
//         Item: {
//             "maSP": ""+count,
//             "tenSP": tensp,
//             "loaiSP": loai,
//             "giaSP": gia,
//             "url": hinh,
//             "moTa": mota
//         }
//     };
//     docClient.put(params, function (err, data) {
//         if (err) {
//             console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
//         } else {
//             // console.log(data.Items);
//             res.render('Notification');
//             count+=1;
//         }
//
//     })
// }

exports.loadLoaiSP = function (req, res) {
    var params = {
        TableName: "LoaiSanPham"
    };
    docClient.scan(params, function (err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        } else {
            // console.log(data.Items);
            res.render('MyPost', {data1: data.Items});
        }

    })
}
exports.xacnhanSP=function(req, res,ten) {
    var params = {
        TableName: "SanPhamCho",
        KeyConditionExpression: "#tenSP = :ten",
        ExpressionAttributeNames:{
            "#tenSP": "tenSP"
        },
        ExpressionAttributeValues: {
            ":ten": ten
        }
    };
    docClient.query(params, function (err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        } else {
            console.log("thang do ne"+data.Items);
            saveProduct(data);
            deleteProduct(data);
            res.redirect("/Censorship");
        }

    })
}

function saveProduct(data) {
    data.Items.forEach(function (item) {
        var params = {
            TableName: "SanPhamDuyet",
            Item: {
                "maSP": item.maSP,
                "tenSP": item.tenSP,
                "loaiSP": item.loaiSP,
                "giaSP": item.giaSP,
                "url": item.url,
                "moTa": item.moTa,
                "tgDangBai":item.tgDangBai
            }
        };
        docClient.put(params, function (err, data) {
            if (err) {
                console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
            } else {
                console.log("Thêm Oke");
            }

        })
    })
}

exports.huySP=function(req, res,tenSP) {
    var params = {
        TableName: "SanPhamCho",
        KeyConditionExpression: "#tenSP = :ten",
        ExpressionAttributeNames:{
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
            // console.log(data.Items);
            deleteProduct(data);
            res.redirect("/Censorship");
        }

    })
}

function deleteProduct(data) {
    data.Items.forEach(function (item) {
        var params = {
            TableName: "SanPhamCho",
            Key:{
                "tenSP": item.tenSP,
                "maSP": item.maSP
            },
        };
        docClient.delete(params, function (err, data) {
            if (err) {
                console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
            } else {
                console.log(" Xóa Oke");
            }

        })
    })
}

