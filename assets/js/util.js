
tpl = {

    // Hash of preloaded templates for the app
    templates:{},

    // Recursively pre-load all the templates for the app.
    // This implementation should be changed in a production environment. All the template files should be
    // concatenated in a single file.
    loadTemplates:function (names, callback) {

        var that = this;

        var loadTemplate = function (index) {
            var name = names[index];
            $.get('app/template/' + name + '.html', function (data) {
                that.templates[name] = data;
                index++;
                if (index < names.length) {
                    loadTemplate(index);
                } else {
                    callback();
                }
            });
        }

        loadTemplate(0);
    },

    // Get template by name from hash of preloaded templates
    get:function (name) {
        return this.templates[name];
    }

};

function make_base_auth(user, password) {
  var tok = user + ':' + password;
  var hash = Base64.encode(tok);
  return "Basic " + hash;
}

JSON.stringify = JSON.stringify || function (obj) {
    var t = typeof (obj);
    if (t != "object" || obj === null) {
        // simple data type
        if (t == "string") obj = '"'+obj+'"';
        return String(obj);
    }
    else {
        // recurse array or object
        var n, v, json = [], arr = (obj && obj.constructor == Array);
        for (n in obj) {
            v = obj[n]; t = typeof(v);
            if (t == "string") v = '"'+v+'"';
            else if (t == "object" && v !== null) v = JSON.stringify(v);
            json.push((arr ? "" : '"' + n + '":') + String(v));
        }
        return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
    }
};
