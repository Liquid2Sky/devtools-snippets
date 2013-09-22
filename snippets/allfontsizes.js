// allfontsizes.js
// https://github.com/bgrins/devtools-snippets
// Print out font sizes used in elements on the page.

(function() {
    var allFontsizes = {};
    var props = ["font-size"];
    var skipFontsize = {
        "0": 1,
        "0px": 1
    };

    [].forEach.call(document.querySelectorAll("*"), function(node) {
        var nodeColors = {};
        props.forEach(function(prop) {
            var fontsize = window.getComputedStyle(node, null)
                .getPropertyValue(prop);
            if (fontsize && !skipFontsize[fontsize]) {
                if (!allFontsizes[fontsize]) {
                    allFontsizes[fontsize] = {
                        count: 0,
                        nodes: []
                    };
                }
                if (!nodeColors[fontsize]) {
                    allFontsizes[fontsize].count++;
                    allFontsizes[fontsize].nodes.push(node);
                }
                nodeColors[fontsize] = true;
            }
        });
    });

    var allFontsizeSorted = [];
    for (var i in allFontsizes) {
        allFontsizeSorted.push({
            key: i,
            value: allFontsizes[i]
        });
    }
    allFontsizeSorted = allFontsizeSorted.sort(function(a, b) {
        return b.value.count - a.value.count;
    });

    console.group("All font sizes used in elements on the page");
    allFontsizeSorted.forEach(function(c) {
        console.groupCollapsed(c.key + " (" + c.value.count + " times)");
        c.value.nodes.forEach(function(node) {
            console.log(node);
        });
        console.groupEnd();
    });
    console.groupEnd("All font sizes used in elements on the page");
})();