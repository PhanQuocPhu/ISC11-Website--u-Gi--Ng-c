
var AWS = require('aws-sdk');
AWS.config.update({
    region: "us-west-2",
    accessKeyId: "AKIAIPKTQD44TJXEEIKQ",
    secretAccessKey: "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",
    endpoint: "https://dynamodb.us-west-2.amazonaws.com"
});
var docClient = new AWS.DynamoDB.DocumentClient();
/* GET home page. */
exports.detail = function (req, res, tenSP) {
    var params = {
        TableName : "SanPham",
        KeyConditionExpression: "#tenSP = :ten ",
        ExpressionAttributeNames:{
            "#tenSP": "tenSP"
        },
        ExpressionAttributeValues: {
            ":ten": tenSP
        }
    };
    docClient.query(params, function(err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        } else {
            console.log("Query succeeded.");
            data.Items.forEach(function(item) {
                console.log(data.Items);
               res.render("Detail", {data:data.Items});
            });
        }
    });
}