Transaction Client is a client for Transaction API

AngularJs is required for this application, so I've added lib it to project in case you don't have access to it.

Application sends requests to http://currentHost:currentPort/transactionAPI/index.php/transaction.

If you have Transaction API on another host, you should change baseUrl in app.js

I didn't create special configs, because this app is very simple.