var express = require('express');
var router = express.Router();
var AWS = require('aws-sdk');
AWS.config.update({
    region: "us-west-2",
    accessKeyId: "AKIAIPKTQD44TJXEEIKQ",
    secretAccessKey: "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",
    endpoint: "https://dynamodb.us-west-2.amazonaws.com"
});


var docClient = new AWS.DynamoDB.DocumentClient();
/* GET home page. */
router.get('/thucai', function (req, res, next) {
    //var maloaitim = res.params("maloaitim");
    // var maloaitim = 1;
    var params = {
        TableName: "LoaiSanPham",
        KeyConditionExpression: "#tl =:yyyy",
        ExpressionAttributeNames: {
            "#tl": "tenLoai",
        },
        ExpressionAttributeValues: {
            ":yyyy": "có dây",
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
            console.log(idloai);
            var paramsp = {
                TableName: "SanPham",
                KeyConditionExpression:"#tenSp=:ten",
                FilterExpression: "#yr =:end_yr",
                ExpressionAttributeNames: {
                    "#tenSp": "tenSP",
                    "#yr": "maLoai"
                },
                ExpressionAttributeValues: {
                    ":ten": "Chuột",
                    ":end_yr": idloai
                }
            }
            docClient.query(paramsp, function(err1, data1){
                if(err1){
                    console.error("Unable to query. Error:", JSON.stringify(err1, null, 2));
                }else{
                    console.log(data1.Items);
                }
            })
        })
    })
});
module.exports = router;