angular.module('theApp')
    .directive('uploadModal', function () {
        function link() {
            $("#uploadFile").fileinput({
                'showUpload': false,
                'showClose': false,
                'allowedFileTypes': ['image', 'video', 'audio'],
                'allowedPreviewTypes': ['image', 'video', 'audio'],
                'maxFileCount': 1
            });
        }
        return {
            replace: true,
            restrict: 'E',
            templateUrl: 'views/uploadModal.html',
            link: link
        };
    });
