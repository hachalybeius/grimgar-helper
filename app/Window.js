const BrowserWindow = require("electron").BrowserWindow;

module.exports = class Window {

	/**
	 * Create a new window with the given index.html file as a main file
	 * @param {number} index 
	 * @see setIndex
	 */
	constructor(index){
		this._browserWindow = undefined;
		this._index = index;
		this._open = false;
		this._width = 0;
		this._height = 0;
	}

	/**
	 * Opens the window
	 */
	open(){
		this._browserWindow = new BrowserWindow({show: false, webPreferences: {nodeIntegration: false} });
		this._browserWindow.node
		this._browserWindow.setSize(this._width, this._height);
		this._browserWindow.loadFile(this._index);
		this._browserWindow.webContents.openDevTools();
		this._browserWindow.on("closed", () => this.close());
		this._open = true;
	}

	async ready_(){
		return new Promise((resolve, reject) => {
			this._browserWindow.once("ready-to-show", resolve);
		});
	}


	/**
	 * Show the window
	 */
	show(){
		this._browserWindow.show();
	}

	/**
	 * Called when the window is closed. Do not call directly
	 */
	close(){
		this._browserWindow = undefined;
		this._open = false;
	}

	/**
	 * Set the width of the window. The height will not change
	 * @param {number} width 
	 */
	setWidth(width){
		this._width = width;
		this._browserWindow.setSize(this._width, this._height);
	}

	/**
	 * Set the height of the window. The width will not change
	 * @param {number} height 
	 */
	setHeight(height){
		this._height = height;
		this._browserWindow.setSize(this._width, this._height);
	}

	/**
	 * Set the size of the window
	 * @param {number} width
	 * @param {number} height
	 */
	setSize(width, height){
		this.setWidth(width);
		this.setHeight(height);
	}

	/**
	 * Whether to set the window to fullscreen or not
	 * @param {boolean} bool
	 */
	setFullscreen(bool){
		this._browserWindow.setFullScreen(bool);
	}

	/**
	 * Set the index.html file from which to start the site
	 * @param {string} index 
	 */
	setIndex(index){
		this._index = index;
	}

	/**
	 * Whether the window is open
	 */
	isOpen(){
		return this._open;
	}
}