module.exports = {

    server: {
        baseDir: './dist',
        routes : {
            '/vendor' : './node_modules'
        }
    },
    ghostMode: {
        clicks: false,
        links: false,
        forms: false,
        scroll: false
    },
    open: true,
    timestamps: true,
    fileTimeout: 1000,
    injectChanges: true,
    scrollThrottle: 0,
    notify: true,
};