declare var chance:any;

class SparkForce{
	private title : string = 'SparkForce';
	private version : string = '0.0';
	private renderWidth : number = 160;
	private renderHeight : number = 120;
	
	private entities: Entity[] = [];
	
	private ctx : CanvasRenderingContext2D;
	constructor(canvas: HTMLCanvasElement){
		console.log("Initializing");
		document.title = this.title + ' (' + this.version + ')';
		
		this.ctx = canvas.getContext('2d');
		this.ctx.canvas.width = this.renderWidth;
		this.ctx.canvas.height = this.renderHeight;
		
		for(var i = 0; i < 10; i++){
			this.entities.push(new Entity(
				new PositionComponent(chance.integer({min:0, max:this.renderHeight}), chance.integer({min:0, max:this.renderHeight})),
				new HitboxComponent(0, 0, chance.integer({min:2, max:7}), chance.integer({min:2, max:7}))
			));
		}
	
		window.requestAnimationFrame(this.render.bind(this));
	}
	
	render(){
		window.requestAnimationFrame(this.render.bind(this));
		this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
		
		this.ctx.fillStyle = 'orange';
		this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
		
		this.entitiesWith([PositionComponent, HitboxComponent]).forEach(entity => {
			let position: PositionComponent = entity.getComponent<PositionComponent>(PositionComponent);
			let hitbox: HitboxComponent = entity.getComponent<HitboxComponent>(HitboxComponent);
			
			let baseX = position.x + hitbox.x;
			let baseY = position.y + hitbox.y;
			
			this.ctx.fillStyle = 'green';
			this.ctx.moveTo(baseX, baseY);
			this.ctx.beginPath();
			hitbox.points.forEach(point => {
				this.ctx.lineTo(baseX + point.x, baseY + point.y);
			});
			this.ctx.fill();
			this.ctx.closePath();
		});
	}
	
	entitiesWith(componentTypes: any[]): Entity[]{
		return this.entities.filter(entity => {
			return entity.hasComponents(componentTypes);
		});
	}
}

class Entity{
	private components: Component[] = [];
	constructor(...components: Component[]){
		components.forEach(c => {
			this.components.push(c);
		});
	}
	getComponents <T> (t: any): T[]{
		return <T[]> this.components.filter(c => {
			return (c instanceof t);
		});
	}
	getComponent <T> (t: any): T{
		return this.getComponents<T>(t)[0];
	}
	hasComponent (t: any): boolean{
		return this.getComponents(t).length > 0;
	}
	hasComponents (ts: any[]): boolean{
		return ts.every(t => {
			return this.hasComponent(t);
		});
	}
}

interface Component{
	
}

class Point{
	public x: number; 
	public y: number;
	constructor(x, y){
		this.x = x || 0;
		this.y = y || 0;
	}
}



class Polygon{
	public points: Point[] = [];
	constructor(...points:Point[]){
		points.forEach(p => {
			this.points.push(p);
		});
	}
}

class Rectangle extends Polygon{
	constructor(x: number, y: number, width: number, height: number){
		super(
			new Point(x, y),
			new Point(x+width, y),
			new Point(x+width, y+height),
			new Point(x, y+height)
		);
	}
	
	get x(){
		return this.points[0].x;
	}
	
	get y(){
		return this.points[0].y;
	}
}

class PositionComponent extends Point implements Component{
	constructor(x, y){
		super(x, y);
	}
}

class HitboxComponent extends Rectangle implements Component{
	constructor(x: number, y: number, width: number, height: number){
		super(x, y, width, height);
		
	}
}
