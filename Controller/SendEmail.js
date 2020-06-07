
var AWS = require('aws-sdk');
var nodemailer = require('nodemailer');
AWS.config.update({
    region: "us-west-2",
    accessKeyId: "AKIAIPKTQD44TJXEEIKQ",
    secretAccessKey: "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",
    endpoint: "https://dynamodb.us-west-2.amazonaws.com"
});
var docClient = new AWS.DynamoDB.DocumentClient();
/* GET home page. */
exports.sendEmail = function (req, res, email) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'vosiluanse@gmail.com',
            pass: 'Luancute111'
        }
    });
    var paramsp = {
                TableName: "KhachHang",
                FilterExpression: "#email =:value",
                ExpressionAttributeNames: {
                    "#email": "email"
                },
                ExpressionAttributeValues: {
                    ":value": email
                }
            }
            var KH ={};
    docClient.scan(paramsp, function (err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        } else {
            data.Items.forEach(function (item) {
                console.log(item.tenKH);
                var cart = req.cookies.Cart;
                var mailOptions = {
                    from: 'vosiluanse@gmail.com',
                    to: email,
                    subject: 'Sending Email from LTS Aution',
                    html: '<h1>Xin chào '+ item.tenKH +' </h1>'+'\n'+
                        '<p>Bạn đã thắng trong phiên đấu giá và đặt hàng thành công.</p>'
                        // cart.forEach(function (itemsp) {
                        //
                        // })+
                        // '<table>'+
                        // '<tr>' +
                        // '<td>Tên sản phẩm :</td>' +
                        // '<td>'+itemsp.tensp+'</td>' +
                        // '</tr>' +
                        // '<tr>' +
                        // '<td>Giá :</td>' +
                        // '<td>'+itemsp.giasp+'</td>' +
                        // '</tr>'

                };
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
            })

        }

    })
};
exports.sendEmailDuyetSP = function (req, res, email) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'vosiluanse@gmail.com',
            pass: 'Luancute111'
        }
    });
    var paramsp = {
        TableName: "KhachHang",
        FilterExpression: "#email =:value",
        ExpressionAttributeNames: {
            "#email": "email"
        },
        ExpressionAttributeValues: {
            ":value": email
        }
    }
    var KH ={};
    docClient.scan(paramsp, function (err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        } else {
            data.Items.forEach(function (item) {
                console.log(item.tenKH);
                var cart = req.cookies.Cart;
                var mailOptions = {
                    from: 'vosiluanse@gmail.com',
                    to: email,
                    subject: 'Sending Email from LTS Aution',
                    html: '<h1>Xin chào '+ item.tenKH +' </h1>'+'\n'+
                        '<p>Bạn đã thắng trong phiên đấu giá và đặt hàng thành công.</p>'
                    // cart.forEach(function (itemsp) {
                    //
                    // })+
                    // '<table>'+
                    // '<tr>' +
                    // '<td>Tên sản phẩm :</td>' +
                    // '<td>'+itemsp.tensp+'</td>' +
                    // '</tr>' +
                    // '<tr>' +
                    // '<td>Giá :</td>' +
                    // '<td>'+itemsp.giasp+'</td>' +
                    // '</tr>'

                };
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
            })

        }

    })
}