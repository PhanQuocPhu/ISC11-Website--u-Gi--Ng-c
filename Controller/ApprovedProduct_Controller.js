var express = require('express');
var AWS = require('aws-sdk');
AWS.config.update({
    region: "us-west-2",
    accessKeyId: "AKIAIPKTQD44TJXEEIKQ",
    secretAccessKey: "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",
    endpoint: "https://dynamodb.us-west-2.amazonaws.com"
});
var docClient = new AWS.DynamoDB.DocumentClient();

exports.loadSPDuocDuyet= function (req, res) {
    var params = {
        TableName: "SanPhamDuyet"
    };
    docClient.scan(params, function (err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        } else {
            // console.log(data.Items);
            res.render('ApprovedProduct', {data1: data.Items});
        }

    })
};
exports.loadSPKH= function (req, res) {
    var params = {
        TableName: "SanPhamDuyet"
    };
    docClient.scan(params, function (err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        } else {
            // console.log(data.Items);
            res.render('ApprovedProduct', {data1: data.Items});
        }

    })
};
exports.loadSPCty= function (req, res) {
    var params = {
        TableName: "SanPham"
    };
    docClient.scan(params, function (err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        } else {
            // console.log(data.Items);
            res.render('ApprovedProduct', {data1: data.Items});
        }

    })
};
