module.exports = {
	transpileDependencies: [
		'vuetify'
	],
	publicPath: "/",
	outputDir: "../backend/public",
	devServer: {
		proxy: {
			'/api': {
				target: 'http://localhost',
			},
		}
	},
	chainWebpack: config => {
        config.plugin('html').tap(args => {
            args[0].title = 'apache vue test'
            return args;
        })
    }
}
