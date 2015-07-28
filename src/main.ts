declare var chance:any;

class SparkForce{
	private static TITLE : string = 'SparkForce';
	private static VERSION : string = '0.0';
	private static RENDER_WIDTH : number = 160;
	private static RENDER_HEIGHT : number = 120;
	
	private ctx : CanvasRenderingContext2D;
	constructor(canvas: HTMLCanvasElement){
		console.log("Initializing");
		document.title = SparkForce.TITLE + ' (' + SparkForce.VERSION + ')';
		
		this.ctx = canvas.getContext('2d');
		this.ctx.canvas.width = SparkForce.RENDER_WIDTH;
		this.ctx.canvas.height = SparkForce.RENDER_HEIGHT;
	
		window.requestAnimationFrame(this.render.bind(this));
	}
	
	render(){
		window.requestAnimationFrame(this.render.bind(this));
		this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
		var now : number = new Date().getTime();
		
	}
}