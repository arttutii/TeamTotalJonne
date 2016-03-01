angular.module('theApp')
    .controller('ModalInstanceController', function ($scope, $uibModalInstance, $log, mediaitems, item) {
        $scope.item = item;
        $scope.mediaitems = mediaitems;
        $scope.selectedItem = {
            item: $scope.mediaitems[0]
        };

        $log.info('item title: ' + item.title);

        $scope.ok = function () {
            $uibModalInstance.close($scope.selectedItem.item);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

    });
