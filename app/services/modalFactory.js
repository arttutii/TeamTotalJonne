angular.module("theApp")
    .factory("ModalFactory", ["$compile", "$uibModalInstance", "$scope", function ($compile, $uibModalInstance, $scope) {
        return function (item) {
            $log.info(item);
            var modalInstance = $uibModal.open({
                scope: $scope,
                templateUrl: 'views/mediaitemModal.html',
                controller: 'ModalInstanceController',
                size: 'lg',
                resolve: {
                    mediaitems: function () {
                        return $scope.mediaitems;
                    },
                    item: function () {
                        return item;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });

        };
    }]);
