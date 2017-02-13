首先了解设么是knn算法
#### KNN算法(k-nearest-neighbor,邻近算法)
1. 算法描述：
  - 依公式计算 Item 与 D1、D2 … …、Dj 之相似度。得到Sim(Item, D1)、Sim(Item, D2)… …、Sim(Item, Dj)。  
  - 将Sim(Item, D1)、Sim(Item, D2)… …、Sim(Item, Dj)排序，若是超过相似度阈值t则放入邻居案例集合NN。  
  - 自邻居案例集合NN中取出前k名，依多数决，得到Item可能类别。

![](https://upload.wikimedia.org/wikipedia/commons/e/e7/KnnClassification.svg)
待测样本（绿色圆圈）既可能分到红色三角形类，也可能分到蓝色正方形类。如果k取3，从图可见，待测样本的3个邻居在实线的内圆里，按多数投票结果，它属于红色三角形类，票数1:2.但是如果k取5，那么待测样本的最邻近的5个样本在虚线的圆里，按表决法，它又属于蓝色正方形类，票数2（红色三角形）:3（蓝色正方形）。

####  插件用法
  - 首先引入训练数据文件（data.js），以及knn插件文件（knn.js）。
````javascript
	<script src="data.js"></script>
	<script src="knn.js"></script>
````

  - 接着直接使用就可以了。
````javascript
knn( trainData , k , predX , predY  ) //此函数会直接返回预测值。
````
很多朋友问到为啥不做可视化？因为我懒啊
### 自己写了一个demo：[http://chenhanming.com/project/KNN/demo.html](http://chenhanming.com/project/KNN/demo.html "KNN算法实现根据《绩点》和《创新加分》预测获得几等奖学金")
