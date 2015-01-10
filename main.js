(function(){
	var fs = require('fs');
	function HearthStoneLogger(){
		var that = {},
		configFile = 'log.config',

		getConfigDir = function(){
			//TODO osx
			return process.env.LOCALAPPDATA+'/Blizzard/Hearthstone';
		},
		configExist = function(){
			return fs.existsSync(getConfigDir()+'/'+configFile);
		},
		createConfig = function(callback){
			//TODO 32bit && osx 
			if (configExist()) return; 
			fs.renameSync(
				process.cwd()+'/'+configFile,
				getConfigDir()+'/'+configFile
				);
		}
		;
		that.createConfig = createConfig;
		return that; 
	}


	HearthStoneLogger().createConfig(); 

})();