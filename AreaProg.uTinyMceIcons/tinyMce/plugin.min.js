tinymce.PluginManager.requireLangPack('uTinyMceIcons', 'en');

tinymce.PluginManager.add('uTinyMceIcons', function (editor, url) {
    var translate = tinymce.util.I18n.translate;
    var controller = {};
    
    editor.on('init', function () {
        var element = editor.iframeElement;

        while (element && element.getAttribute("ng-controller") !== "Umbraco.PropertyEditors.RTEController") {
            element = element.parentElement;
        }

        var template = angular.element('<div ng-controller="uTinyMceIconsOverlayController"><umb-overlay ng-if="overlay.show" model="overlay" view="overlay.view" position="right"></umb-overlay></div>');

        var $injector = angular.element('html').injector();
        var $compile = $injector.get('$compile');
        var $rootScope = $injector.get('$rootScope');

        $rootScope.$apply(function () {
            var content = $compile(template)($rootScope.$new());
            angular.element(element).append(content);
            controller = content.scope();
        });
        
        document.getElementsByTagName('head')[0].appendChild(editor.dom.create('link', {
            rel: 'stylesheet',
            href: url + '/css/fontawesome.min.css'
        }));


        editor.iframeElement.contentDocument.getElementsByTagName('head')[0].appendChild(editor.dom.create('link', {
            rel: 'stylesheet',
            href: url.substring(0, url.indexOf('/lib/') + 5) + 'font-awesome/css/font-awesome.min.css'
        }));

        editor.iframeElement.contentDocument.getElementsByTagName('head')[0].appendChild(editor.dom.create('link', {
            rel: 'stylesheet',
            href: url + '/css/tinymce-fa.css'
        }));
    });

    editor.addButton('uTinyMceIcons', {
        icon: 'flag',
        tooltip: translate('Icons'),
        onclick: function () {
            controller.showPane(editor);
        }
    });
});