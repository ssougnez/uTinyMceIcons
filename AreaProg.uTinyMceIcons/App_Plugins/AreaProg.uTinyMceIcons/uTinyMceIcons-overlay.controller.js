(function () {
    function uTinyMceIconsOverlayController($scope) {
        var element = null;

        var isCurrentElementAnIcon = function () {
            return element.outerHTML.indexOf('<span class="fa') === 0;
        };

        $scope.editor = null;

        $scope.overlay = {
            view: "/App_Plugins/AreaProg.uTinyMceIcons/uTinyMceIcons-overlay-content.html",
            show: false,
            submit: function () {
                var classes = "fa fa-" + $scope.overlay.data.icon;

                if ($scope.overlay.data.fixedWidth === true) {
                    classes += ' fa-fw';
                }

                if ($scope.overlay.data.spin === true) {
                    classes += ' fa-spin';
                }

                if ($scope.overlay.data.size !== "normal") {
                    classes += ' fa-' + $scope.overlay.data.size;
                }

                if (isCurrentElementAnIcon() === true) {
                    element.className = classes;

                    if ($scope.overlay.data.ariaHidden === true) {
                        element.setAttribute("aria-hidden", "true");
                    }
                    else {
                        element.removeAttribute("aria-hidden");
                    }
                }
                else {
                    $scope.editor.execCommand('mceInsertContent', false, '<span class="' + classes + '"' + ($scope.overlay.data.ariaHidden === true ? ' aria-hidden="true"' : '') + '>&#8203;</span>');
                }

                $scope.overlay.show = false;
            }
        };

        $scope.showPane = function (editor) {
            $scope.editor = editor;

            $scope.overlay.show = true;
            $scope.overlay.data = {
                size: "normal",
                spin: false,
                fixedWidth: false,
                ariaHidden: true
            };

            element = $scope.editor.selection.getNode();

            if (isCurrentElementAnIcon()) {
                var classes = element.className.split(' ');

                for (var i = 0; i < classes.length; ++i) {
                    var className = classes[i];

                    if (className.indexOf("fa-") === 0) {
                        switch (className) {
                            case "fa-fw":
                                $scope.overlay.data.fixedWidth = true;
                                break;

                            case "fa-spin":
                                $scope.overlay.data.spin = true;
                                break;

                            case "fa-lg":
                            case "fa-2x":
                            case "fa-3x":
                            case "fa-4x":
                            case "fa-5x":
                                $scope.overlay.data.size = className.substring(3);
                                break;

                            default:
                                $scope.overlay.data.icon = className.substring(3);
                                break;
                        }
                    }
                }

                if (element.outerHTML.indexOf("aria-hidden") < 0) {
                    $scope.overlay.data.ariaHidden = false;
                }
            }
        };
    }

    angular
        .module("umbraco")
        .controller("uTinyMceIconsOverlayController", ["$scope", uTinyMceIconsOverlayController]);
})();