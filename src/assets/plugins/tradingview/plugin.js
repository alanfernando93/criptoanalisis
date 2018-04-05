tinymce.PluginManager.add('tradingview', function(editor, url){
    editor.addButton('tradingview', {
        text: 'Tradingview',
        icon: 'image',
        onclick: function() {
            var dom = editor.dom, data = {};
            var img = document.createElement('img');
            var widthdef = "640";
            var heightdef = "400";
            editor.windowManager.open({
                title: 'Tradingview Image',
                body: [
                    { type: 'textbox', name: 'id', label: 'Charts Id : ' },
                    {
                        type: 'container',
                        label: 'Dimensions',
                        layout: 'flex',
                        direction: 'row',
                        align: 'center',
                        spacing: 5,
                        items: [
                            {name: 'width', type: 'textbox', maxLength: 5, size: 3, ariaLabel: 'Width'},
                            {type: 'label', text: 'x'},
                            {name: 'height', type: 'textbox', maxLength: 5, size: 3, ariaLabel: 'Height'}
                        ]
                    }
                ],
                onsubmit: function(e) {
                    data = {
                        id : e.data.id,
                        src : "https://tradingview.com/i/"+e.data.id+"/",
                        width : e.data.width ? e.data.width : widthdef,
                        height : e.data.height ? e.data.height : heightdef
                    }
                    // editor.setContent(img);
                    editor.focus();
                    editor.selection.setContent(dom.createHTML('img', data));
                    imgElm = dom.get(data.id);
					dom.setAttrib(imgElm, 'id', null);
                }
            });
        }
    });
    editor.addMenuItem('example', {
        text: 'Example plugin',
        context: 'tools',
        onclick: function() {
            editor.windowManager.open({
                title: 'TinyMCE site',
                url: 'https://www.tinymce.com',
                width: 800,
                height: 600,
                buttons: [{
                    text: 'Close',
                    onclick: 'close'
                }]
            });
        }
    });

    return {
        getMetadata: function() {
            return {
                title: "Example plugin",
                url: "http://exampleplugindocsurl.com"
            };
        }
    };
})