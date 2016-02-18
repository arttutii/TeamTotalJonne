angular.module('theApp')
    .controller('ModalInstanceController', function ($scope, $uibModalInstance, $log, images, pic) {
        $scope.pic = pic;
        $scope.images = images;
        $scope.selectedItem = {
            pic: $scope.images[0]
        };

        $log.info('pic title: ' + pic.title);

        $scope.ok = function () {
            $uibModalInstance.close($scope.selectedItem.pic);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel ');
        };

    });
