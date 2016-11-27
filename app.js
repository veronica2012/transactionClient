var app = angular.module('transactionApp', []);

app.controller('TransactionController', ['$scope', '$location', '$http',  function ($scope, $location, $http) {

        var baseUrl =  $location.protocol() + "://" + $location.host() + ($location.port() ? ':'+$location.port() : ''),
            apiUrl = '/transactionAPI/index.php/transaction';

        $scope.showMessages = {
            successMessage: false,
            errorMessage: false
        };


        $scope.errorMessage = '';

        $scope.model = {
            email: '',
            amount: ''
        };

        var processError = function(error) {
            var composedError, item;
            if (angular.isArray(error)) {
                var values = [];
                angular.forEach(error, function(i) {
                    values.push(i);
                })

                composedError = values.join(" ");

            } else if (angular.isObject(error)) {
                composedError = '';
                for (item in error) {
                    var values = [];
                    angular.forEach(error, function(i) {
                        values.push(i);
                    })
                    composedError += values.join(" ");
                }
            } else {
                composedError = error;
            }
            return composedError;
        };


        $scope.logTransaction = function(form) {
            $scope.errorMessage = '';

            $scope.showMessages = {
                successMessage: false,
                errorMessage: false
            };

            $http.post(baseUrl + apiUrl, $scope.model)
                .success(function(response) {
                    var data = response.data ? response.data : {};
                if(data.result == true) {
                    $scope.showMessages.successMessage = true;
                }else{
                    if(data.errors) {
                        $scope.errorMessage = processError(data.errors);
                    }else {
                        $scope.errorMessage = 'Something went wrong!';
                    }

                    $scope.showMessages.errorMessage = true;

                }
            })
                .error(function(error) {
                    $scope.errorMessage = processError(error);
                    $scope.showMessages.errorMessage = true;
                })

                .finally(function() {
                    $scope.model = {
                        email: '',
                        amount: ''
                    };

                    form.$setPristine();
                })
        };
}]
);