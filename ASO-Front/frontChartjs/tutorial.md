#又快又好！巧用ChartJS打造你的实用折线图

#最终效果

![chartjs-1][]

本示例利用官方示例改造而成，生成**带图示**的折线图，标出各折线的名称，可以**筛选**想要显示的折线。


要实现最终效果，我们要分三步走：
1.  生成折线图；
2.  生成自定义提示；
3.  生成图示（折线显示控制板）
![chartjs-2][]

#生成折线图

首先，我们要设置折线图的位置。

    <div style="width:50%">
        <div id="line-legend">
        </div>
        <div>
            <canvas id="line-chart" height="450px" width="800px"></canvas>
        </div>
    </div>

我们将图表放置于id为<code>line-chart</code>的<code>canvas</code>中，而图例则在id为<code>line-legend</code>的<code>div</code>中。

接着，我们要生成折线图。

设置x轴数据

    var x_labels = ["January","February","March","April","May","June","July"];

设置y轴数据

    var default_datasets = [
            {
                label: "My First dataset",
                fillColor : "rgba(220,220,220,0.2)",
                strokeColor : "rgba(220,220,220,1)",
                pointColor : "rgba(220,220,220,1)",
                pointStrokeColor : "#fff",
                pointHighlightFill : "#fff",
                pointHighlightStroke : "rgba(220,220,220,1)",
                data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
            },
            {
                label: "My Second dataset",
                fillColor : "rgba(151,187,205,0.2)",
                strokeColor : "rgba(151,187,205,1)",
                pointColor : "rgba(151,187,205,1)",
                pointStrokeColor : "#fff",
                pointHighlightFill : "#fff",
                pointHighlightStroke : "rgba(151,187,205,1)",
                data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
            }
        ];

将x轴和y轴的数据打包成**数据包**：

     var lineChartData = {
        labels : x_labels,
        datasets : default_datasets
     };

设置显示的效果(这里是直接从官网示例里copy过来的:-)

     var lineChartOptions = {
        //Boolean - If we should show the scale at all
        showScale: true,
        ...
        //Boolean - whether to make the chart responsive to window resizing
        responsive: true,
    };

生成折线图

    var lineChartCanvas = chart.get(0).getContext("2d");
    var lineChart = new Chart(lineChartCanvas);
    var line_chart_handle = lineChart.Line(lineChartData, lineChartOptions);

本阶段效果

![chartjs-5][]

以上示例可参考[官方教程](https://http://www.chartjs.org/docs/)。

#自定义提示

刚才我们成功地绘制了一张图表，但是基本图表中的提示只显示了折线的颜色和值，我们还希望能把折线的名称也加上，那到底该怎么做呢？

很简单，这个功能属于图表的要显示的效果，还记得刚才我们设置的<code>lineChartOptions</code>吗，它就是设定显示效果的参数。只要在其中设定一项新的参数<code>multiTooltipTemplate</code>即可，该参数用于自定义数据提示tooltip。

     multiTooltipTemplate: "<%if (datasetLabel){%><%=datasetLabel%>: <%}%><%= value %>"

上面的代码是什么意思呢？大致可以看出，是给<code>multiTooltipTemplate</code>赋了一个值，而这个值就是我们想要显示的数据的样式。你大概猜到了，<code>datasetLabel</code>其实就是折线标题的变量。

![chartjs-3][]

该功能虽然简单，但**基本上出图表都会用到**，所以在此专门用一节来说明。

#生成图示

终于到达我们的重头戏，现在要来实现图示功能了。

我们再将这个大目标划分为两个具体的小目标：
首先，我们先将图示展示出来；
接着，点击图示之后，动态显示或隐藏指定的折线。

##添加展示图示

我们之前已经设置好了图例所在，现在填入两个checkbox。

    <div id="line-legend">
      <ul class="line-legend">
        <li class="checkbox-five">
          <input type="checkbox" name="line-legend" value="0" checked="checked">
          <label for="line-legend" style="background-color:rgba(220, 220, 220, 1);">
          </label>
          <span>My First dataset</span>
        </li>
        <li class="checkbox-five">
          <input type="checkbox" name="line-legend" value="1" checked="checked">
          <label for="line-legend" style="background-color:rgba(151, 187, 205, 1);">
          </label>
          <span>My Second dataset</span>
        </li>
      </ul>
    </div>

##添加曲线选项事件响应

为两条折线添加了checkbox，但点击了它折线也没有变化。没关系，我们现在来为折线添加上事件响应，使得图表能自由显示或是隐藏折线。

    // 给图例中的选框增加事件响应
    // 被选中的则显示其对应折线，未选中的不显示
    $('[name = \'line-legend\']:checkbox').each(function(key, value) {
        // 设置所有的checkbox为选中
        $(this).attr('checked', true);
        // 设置checkbox被取消选择之后，将该曲线消除
        $(this).click(function() {
            // 显示相应的折线
        } else {
            // 删除被选中折线上的点
        }
    });

现在我们为checkbox添加上了事件响应，具体的响应事件将在下一节说明。

##ChartJS数据结构

要想知道如何让折线从图表中显示出来，或是消息，首先要来了解曲线的数据结构。
ChartJS里的点是由数据包构成的，而一个数据包分成两部分：一块包含点的信息，一块用于显示该点。

![chartjs-4][]

了解了ChartJS上折线图的数据结构，大家也就明白了：显示一条折线，即是添加<code>points</code>>；隐藏一条折线，即是将其<code>points</code>去除。

所以，当某一条曲线被选中时，我们就根据该曲线的信息生成新的点；

    if ($(this).is(':checked')) {
        // 插入被选中折线上的点
        $.each(y_datasets[index].data, function(key, value) {
          line_chart_handle.datasets[index].points.push(new line_chart_handle.PointClass({
            value : value,
            label : lineChartData.labels[key],
            datasetLabel : lineChartData.datasets[index].label,
            x: line_chart_handle.scale.calculateX(line_chart_handle.scale.valuesCount + 1),
            y: line_chart_handle.scale.endPoint,
            strokeColor : line_chart_handle.datasets[index].pointStrokeColor,
            fillColor : line_chart_handle.datasets[index].pointColor
          }));
        });
    }

当一条曲线被取消选中时，我们只需要将这条曲线上的点到清空即可。

    else {
        // 删除被选中折线上的点
        for (var i = line_chart_handle.datasets[index].points.length - 1; i >= 0; i--) {
          line_chart_handle.datasets[index].points.shift();
        }
    }

大功告成！

#示例下载
下载地址

[chartjs-1]:chartjs-1.png
[chartjs-2]:chartjs-2.png
[chartjs-3]:chartjs-3.png
[chartjs-4]:chartjs-4.png
[chartjs-5]:chartjs-5.png