tinymce.PluginManager.add('example', function(editor, url) {

    editor.addButton('example', {
        text: 'My button',
        icon: false,
        onclick: function() {
            editor.windowManager.open({
                title: 'Example plugin',
                body: [
                    { type: 'textbox', name: 'title', label: 'Title' }
                ],
                onsubmit: function(e) {
                    editor.insertContent('Title: ' + e.data.title);
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
});