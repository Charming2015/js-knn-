var Node = function(object){
	for(var key in  object ){
		this[key] = object[key];
	}
};

// 计算未知点与所有点的距离
Node.prototype.measureDistances = function( all_x_range_obj , all_y_range_obj ){
	var x_range = all_x_range_obj.max - all_x_range_obj.min;
	var y_range = all_y_range_obj.max - all_y_range_obj.min;

	for(var i in this.neighbors ){
		var neighbor = this.neighbors[i];

		var delta_x = (neighbor.perX - this.perX) / x_range;
		var delta_y = (neighbor.perY - this.perY) / y_range;

		neighbor.distance = Math.sqrt( delta_x * delta_x + delta_y * delta_y );
	}
}

// 根据距离进行排序。
Node.prototype.sortByDistance = function(){
	this.neighbors.sort( function(a,b){
		return a.distance - b.distance;
	} )
}

// 归类
Node.prototype.guessType = function(k){
	var types = [];
	for( var i in this.neighbors.slice(0,k) ){
		var neighbor = this.neighbors[i]
		if( !types[neighbor.type] ){
			types[neighbor.type] = 0;
		}

		types[neighbor.type] += 1;
		
	}

	var guess = {type : false , count:0};
	for(var type in types ){
		if(types[type] > guess.count ){
			guess.type = type;
			guess.count = types[type];
		}
	}

	this.guess = guess;
	return types;
}
// NodeList 构造器把 k，也就是kNN中的k作为唯一参数。
var NodeList = function(k){
	this.nodes = [];
	this.k = k;
}


// 负责把 node 压进 this.nodes 数组中
NodeList.prototype.add = function(node){
	this.nodes.push(node)
}


// 特征归一化,找出特征值的最大最小值
NodeList.prototype.calculateRanges = function(){
	this.allX = {min:1000000 , max : 0};
	this.allY = {min:1000000 , max : 0};

	for(var i in this.nodes){
		if( this.nodes[i].perX < this.allX.min ){
			this.allX.min = this.nodes[i].perX
		}
		if( this.nodes[i].perX > this.allX.max ){
			this.allX.max = this.nodes[i].perX ;
		}
		if( this.nodes[i].perY > this.allY.max ){
			this.allY.max = this.nodes[i].perY;
		}
		if( this.nodes[i].perY < this.allY.min ){
			this.allY.min = this.nodes[i].perY;
		}
	}
}


NodeList.prototype.determineUnknown = function(){
	// 特征归一化
	this.calculateRanges();
	/*
	 * 循环所有节点（nodes），并判断未知节点的类型
	*/
	// typeResult;
	for( var i in this.nodes ){
		if( ! this.nodes[i].type ){
			/*
			如果节点的类型未知，则克隆节点列表，并计算距离。
			*/
			// 克隆节点列表
			this.nodes[i].neighbors = [];
			for(var j in this.nodes ){
				if( ! this.nodes[j].type ) continue;
				this.nodes[i].neighbors.push( new Node(this.nodes[j]) );
			}

			// 测量距离
			this.nodes[i].measureDistances( this.allX , this.allY  );
			// 通过距离进行排序
			this.nodes[i].sortByDistance();

			// 猜测类型
			var  typeResult = this.nodes[i].guessType(this.k)
			// console.log( typeResult )
		}
	}
}

function knn( trainData , k , predX , predY  ){
	var drawOrNot = drawOrNot == undefined ? false : true;
	var newNodes = new NodeList(k);
	for (var i in trainData)
    {
        newNodes.add( new Node(trainData[i]) );
    }

	newNodes.add( new Node({perX: predX, perY: predY, type: false}) );
    newNodes.determineUnknown();

    var resultType = newNodes.nodes[newNodes.nodes.length-1].guess.type;
    return resultType;
}


