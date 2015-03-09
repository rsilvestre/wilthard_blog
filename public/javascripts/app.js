require.config({
    baseUrl: '/javascripts',
    paths: {
        // the left side is the module ID,
        // the right side is the path to
        // the jQuery file, relative to baseUrl.
        // Also, the path should NOT include
        // the '.js' file extension. This example
        // is using jQuery 1.9.0 located at
        // js/lib/jquery-1.9.0.js, relative to
        // the HTML page.
        jquery: 'lib/jquery-2.1.3',
        moment: "lib/moment-with-locales.min",
        app: 'app'
    }
});
require(['app/check_submit']);
