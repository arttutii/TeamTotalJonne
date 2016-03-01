angular.module("theApp")
    .directive("addRow", function ($compile, $templateRequest) {
        return function (scope, element, attrs) {
            element.bind("click", function () {
                var el = $compile(angular.element("<mediaitems-row></mediaitems-row>"))(scope);
                angular.element(document.getElementById("gallery")).append(el);
            });
        };
    });
