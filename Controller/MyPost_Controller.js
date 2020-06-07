var express = require('express');
var AWS = require('aws-sdk');
AWS.config.update({
    region: "us-west-2",
    accessKeyId: "AKIAIPKTQD44TJXEEIKQ",
    secretAccessKey: "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",
    endpoint: "https://dynamodb.us-west-2.amazonaws.com"
});
var docClient = new AWS.DynamoDB.DocumentClient();

var CUSTOMEPOCH = 1300000000000; // artificial epoch
function generateRowId(shardId /* range 0-64 for shard/slot */) {
    var ts = new Date().getTime() - CUSTOMEPOCH; // limit to recent
    var randid = Math.floor(Math.random() * 512);
    ts = (ts * 64);   // bit-shift << 6
    ts = ts + shardId;
    return (ts * 512) + (randid % 512);
}
exports.insertSP=function(req, res, tensp, loai, gia, hinh, mota,time) {
    var id = generateRowId(5);
    var newid = ""+id;
    var params = {
        TableName: "SanPhamCho",
        Item: {
            "maSP": newid,
            "tenSP": tensp,
            "loaiSP": loai,
            "giaSP": gia,
            "url": hinh,
            "moTa": mota,
            "tgDangBai":time
        }
    };
    docClient.put(params, function (err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        } else {
            // console.log(data.Items);
            res.render('Notification');
        }

    })
}

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


