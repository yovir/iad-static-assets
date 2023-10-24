/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../src/js/widgets/cards/widget-1.js":
/*!*******************************************!*\
  !*** ../src/js/widgets/cards/widget-1.js ***!
  \*******************************************/
/***/ ((module) => {

                "use strict";
                // Class definition
                var DaiChartsWidget1 = function () {
                    var chart = {
                        self: null,
                        rendered: false
                    };
                    // Private methods
                    var initChart = function (chart) {
                        var element = document.getElementById("dai_charts_widget_1");

                        if (!element) {
                            return;
                        }

                        var labelColor = KTUtil.getCssVariableValue('--bs-gray-800');
                        var borderColor = KTUtil.getCssVariableValue('--bs-border-dashed-color');
                        var maxValue = 18;

                        var options = {
                            series: [{
                                name: 'Sessions',
                                data: [50, 30, 25, 15, 5]
                            }],
                            chart: {
                                fontFamily: 'inherit',
                                type: 'bar',
                                height: 350,
                                toolbar: {
                                    show: false
                                }
                            },
                            plotOptions: {
                                bar: {
                                    borderRadius: 8,
                                    horizontal: true,
                                    distributed: true,
                                    barHeight: 50,
                                    dataLabels: {
                                        position: 'bottom' // use 'bottom' for left and 'top' for right align(textAnchor)
                                    }
                                }
                            },
                            dataLabels: {  // Docs: https://apexcharts.com/docs/options/datalabels/
                                enabled: true,
                                textAnchor: 'start',
                                offsetX: 0,
                                formatter: function (val, opts) {
                                    var val = val;
                                    var Format = wNumb({
                                        //prefix: '$',
                                        //suffix: ',-',
                                        thousand: '.'
                                    });

                                    return Format.to(val);
                                },
                                style: {
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    align: 'left',
                                }
                            },
                            legend: {
                                show: false
                            },
                            colors: ['#3E97FF', '#F1416C', '#50CD89', '#FFC700', '#7239EA'],
                            xaxis: {
                                categories: ["Organisasi #1", "Organisasi #2", 'Organisasi #3', 'Organisasi #4', 'Organisasi #5'],
                                labels: {
                                    formatter: function (val) {
                                        return val
                                    },
                                    style: {
                                        colors: labelColor,
                                        fontSize: '14px',
                                        fontWeight: '600',
                                        align: 'left'
                                    }
                                },
                                axisBorder: {
                                    show: false
                                }
                            },
                            yaxis: {
                                labels: {
                                    formatter: function (val, opt) {
                                        if (Number.isInteger(val)) {
                                            var percentage = parseInt(val * 100 / maxValue).toString();
                                            return val + ' - ' + percentage + '%';
                                        } else {
                                            return val;
                                        }
                                    },
                                    style: {
                                        colors: labelColor,
                                        fontSize: '14px',
                                        fontWeight: '600'
                                    },
                                    offsetY: 2,
                                    align: 'left'
                                }
                            },
                            grid: {
                                borderColor: borderColor,
                                xaxis: {
                                    lines: {
                                        show: true
                                    }
                                },
                                yaxis: {
                                    lines: {
                                        show: false
                                    }
                                },
                                strokeDashArray: 4
                            },
                            tooltip: {
                                style: {
                                    fontSize: '12px'
                                },
                                y: {
                                    formatter: function (val) {
                                        return val;
                                    }
                                }
                            }
                        };

                        chart.self = new ApexCharts(element, options);

                        // Set timeout to properly get the parent elements width
                        setTimeout(function () {
                            chart.self.render();
                            chart.rendered = true;
                        }, 200);
                    }

                    // Public methods
                    return {
                        init: function () {
                            initChart(chart);

                            // Update chart on theme mode change
                            KTThemeMode.on("kt.thememode.change", function () {
                                if (chart.rendered) {
                                    chart.self.destroy();
                                }

                                initChart(chart);
                            });
                        }
                    }
                }();

                // Webpack support
                if (true) {
                    module.exports = DaiChartsWidget1;
                }

                // On document ready
                KTUtil.onDOMContentLoaded(function () {
                    DaiChartsWidget1.init();
                });


                /***/
            }),

/***/ "../src/js/widgets/charts/widget-17.js":
/*!*********************************************!*\
  !*** ../src/js/widgets/charts/widget-17.js ***!
  \*********************************************/
/***/ ((module) => {

                "use strict";


                // Class definition
                var DaiChartsWidget2 = (function () {
                    // Private methods
                    var initChart = function () {
                        // Check if amchart library is included
                        if (typeof am5 === "undefined") {
                            return;
                        }

                        var element = document.getElementById("dai_charts_widget_2");

                        if (!element) {
                            return;
                        }

                        var root;

                        var init = function () {
                            // Create root element
                            // https://www.amcharts.com/docs/v5/getting-started/#Root_element
                            root = am5.Root.new(element);

                            // Set themes
                            // https://www.amcharts.com/docs/v5/concepts/themes/
                            root.setThemes([am5themes_Animated.new(root)]);

                            // Create chart
                            // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
                            // start and end angle must be set both for chart and series
                            var chart = root.container.children.push(
                                am5percent.PieChart.new(root, {
                                    startAngle: 180,
                                    endAngle: 360,
                                    layout: root.verticalLayout,
                                    innerRadius: am5.percent(50),
                                })
                            );

                            // Create series
                            // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
                            // start and end angle must be set both for chart and series
                            var series = chart.series.push(
                                am5percent.PieSeries.new(root, {
                                    startAngle: 180,
                                    endAngle: 360,
                                    valueField: "value",
                                    categoryField: "category",
                                    alignLabels: false,
                                })
                            );

                            series.labels.template.setAll({
                                fontWeight: "400",
                                fontSize: 13,
                                fill: am5.color(KTUtil.getCssVariableValue('--bs-gray-500'))
                            });

                            series.states.create("hidden", {
                                startAngle: 180,
                                endAngle: 180,
                            });

                            series.slices.template.setAll({
                                cornerRadius: 5,
                            });

                            series.ticks.template.setAll({
                                forceHidden: true,
                            });

                            // Set data
                            // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
                            series.data.setAll([
                                { value: 100, category: "Laki-laki", sliceSettings: { fill: am5.color(0x0d6efd), stroke: am5.color(0x0d6efd) } },
                                { value: 25, category: "Perempuan", sliceSettings: { fill: am5.color(0xd63384), stroke: am5.color(0xd63384) } }
                            ]);

                            series.appear(1000, 100);
                        }

                        am5.ready(function () {
                            init();
                        });

                        // Update chart on theme mode change
                        KTThemeMode.on("kt.thememode.change", function () {
                            // Destroy chart
                            root.dispose();

                            // Reinit chart
                            init();
                        });
                    };

                    // Public methods
                    return {
                        init: function () {
                            initChart();
                        },
                    };
                })();

                // Webpack support
                if (true) {
                    module.exports = DaiChartsWidget2;
                }

                // On document ready
                KTUtil.onDOMContentLoaded(function () {
                    DaiChartsWidget2.init();
                });


                // dai_charts_widget_3
                //
                // Create root and chart
                var root = am5.Root.new("dai_charts_widget_3");

                root.setThemes([
                    am5themes_Animated.new(root)
                ]);

                var chart = root.container.children.push(
                    am5percent.PieChart.new(root, {
                        layout: root.verticalLayout,
                        startAngle: -180,
                        endAngle: 0,
                        layout: root.verticalLayout,
                        innerRadius: am5.percent(50)
                    })
                );

                // Define data
                var data = [{
                    category: "Laki-laki",
                    value: 80,
                    sliceSettings: {
                        fill: am5.color(0x50C5B7),
                        stroke: am5.color(0x50C5B7)
                    }
                }, {
                    category: "Perempuan",
                    value: 45,
                    sliceSettings: {
                        fill: am5.color(0x9CEC5B),
                        stroke: am5.color(0x9CEC5B)
                    }
                }];

                // Create series
                var series = chart.series.push(
                    am5percent.PieSeries.new(root, {
                        startAngle: -180,
                        endAngle: 0,
                        name: "Series",
                        valueField: "value",
                        categoryField: "category",
                    })
                );

                series.slices.template.setAll({
                    templateField: "sliceSettings"
                });

                series.labels.template.setup = function (label, dataItem) {
                    label.events.on("dataitemchanged", function (ev) {
                        label.set("background", am5.RoundedRectangle.new(root, {
                            fill: ev.target.dataItem.get("slice").get("fill")
                        }));
                    });
                }

                series.data.setAll(data);
                series.appear(1000, 100);

                /***/
})

        /******/
});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
            /******/
}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
            /******/
};
/******/
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
        /******/
}
/******/
/************************************************************************/
/******/
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_require__("../src/js/widgets/cards/widget-1.js");
/******/ 	__webpack_require__("../src/js/widgets/cards/widget-10.js");
/******/ 	__webpack_require__("../src/js/widgets/cards/widget-12.js");
/******/ 	__webpack_require__("../src/js/widgets/cards/widget-13.js");
/******/ 	__webpack_require__("../src/js/widgets/cards/widget-17.js");
/******/ 	__webpack_require__("../src/js/widgets/cards/widget-19.js");
/******/ 	__webpack_require__("../src/js/widgets/cards/widget-4.js");
/******/ 	__webpack_require__("../src/js/widgets/cards/widget-6.js");
/******/ 	__webpack_require__("../src/js/widgets/cards/widget-8.js");
/******/ 	__webpack_require__("../src/js/widgets/cards/widget-9.js");
/******/ 	__webpack_require__("../src/js/widgets/charts/widget-1.js");
/******/ 	__webpack_require__("../src/js/widgets/charts/widget-10.js");
/******/ 	__webpack_require__("../src/js/widgets/charts/widget-11.js");
/******/ 	__webpack_require__("../src/js/widgets/charts/widget-12.js");
/******/ 	__webpack_require__("../src/js/widgets/charts/widget-13.js");
/******/ 	__webpack_require__("../src/js/widgets/charts/widget-14.js");
/******/ 	__webpack_require__("../src/js/widgets/charts/widget-15.js");
/******/ 	__webpack_require__("../src/js/widgets/charts/widget-16.js");
/******/ 	__webpack_require__("../src/js/widgets/charts/widget-17.js");
/******/ 	__webpack_require__("../src/js/widgets/charts/widget-18.js");
/******/ 	__webpack_require__("../src/js/widgets/charts/widget-19.js");
/******/ 	__webpack_require__("../src/js/widgets/charts/widget-2.js");
/******/ 	__webpack_require__("../src/js/widgets/charts/widget-20.js");
/******/ 	__webpack_require__("../src/js/widgets/charts/widget-21.js");
/******/ 	__webpack_require__("../src/js/widgets/charts/widget-22.js");
/******/ 	__webpack_require__("../src/js/widgets/charts/widget-23.js");
/******/ 	__webpack_require__("../src/js/widgets/charts/widget-24.js");
/******/ 	__webpack_require__("../src/js/widgets/charts/widget-25.js");
/******/ 	__webpack_require__("../src/js/widgets/charts/widget-26.js");
/******/ 	__webpack_require__("../src/js/widgets/charts/widget-27.js");
/******/ 	__webpack_require__("../src/js/widgets/charts/widget-28.js");
/******/ 	__webpack_require__("../src/js/widgets/charts/widget-29.js");
/******/ 	__webpack_require__("../src/js/widgets/charts/widget-3.js");
/******/ 	__webpack_require__("../src/js/widgets/charts/widget-30.js");
/******/ 	__webpack_require__("../src/js/widgets/charts/widget-31.js");
/******/ 	__webpack_require__("../src/js/widgets/charts/widget-32.js");
/******/ 	__webpack_require__("../src/js/widgets/charts/widget-33.js");
/******/ 	__webpack_require__("../src/js/widgets/charts/widget-34.js");
/******/ 	__webpack_require__("../src/js/widgets/charts/widget-35.js");
/******/ 	__webpack_require__("../src/js/widgets/charts/widget-36.js");
/******/ 	__webpack_require__("../src/js/widgets/charts/widget-37.js");
/******/ 	__webpack_require__("../src/js/widgets/charts/widget-38.js");
/******/ 	__webpack_require__("../src/js/widgets/charts/widget-39.js");
/******/ 	__webpack_require__("../src/js/widgets/charts/widget-4.js");
/******/ 	__webpack_require__("../src/js/widgets/charts/widget-40.js");
/******/ 	__webpack_require__("../src/js/widgets/charts/widget-41.js");
/******/ 	__webpack_require__("../src/js/widgets/charts/widget-42.js");
/******/ 	__webpack_require__("../src/js/widgets/charts/widget-43.js");
/******/ 	__webpack_require__("../src/js/widgets/charts/widget-44.js");
/******/ 	__webpack_require__("../src/js/widgets/charts/widget-45.js");
/******/ 	__webpack_require__("../src/js/widgets/charts/widget-46.js");
/******/ 	__webpack_require__("../src/js/widgets/charts/widget-5.js");
/******/ 	__webpack_require__("../src/js/widgets/charts/widget-6.js");
/******/ 	__webpack_require__("../src/js/widgets/charts/widget-7.js");
/******/ 	__webpack_require__("../src/js/widgets/charts/widget-8.js");
/******/ 	__webpack_require__("../src/js/widgets/charts/widget-9.js");
/******/ 	__webpack_require__("../src/js/widgets/forms/widget-1.js");
/******/ 	__webpack_require__("../src/js/widgets/lists/widget-24.js");
/******/ 	__webpack_require__("../src/js/widgets/maps/widget-1.js");
/******/ 	__webpack_require__("../src/js/widgets/maps/widget-2.js");
/******/ 	__webpack_require__("../src/js/widgets/players/widget-1.js");
/******/ 	__webpack_require__("../src/js/widgets/players/widget-2.js");
/******/ 	__webpack_require__("../src/js/widgets/sliders/widget-1.js");
/******/ 	__webpack_require__("../src/js/widgets/sliders/widget-3.js");
/******/ 	__webpack_require__("../src/js/widgets/sliders/widget-7.js");
/******/ 	__webpack_require__("../src/js/widgets/tables/widget-14.js");
/******/ 	__webpack_require__("../src/js/widgets/tables/widget-15.js");
/******/ 	__webpack_require__("../src/js/widgets/tables/widget-16.js");
/******/ 	__webpack_require__("../src/js/widgets/tables/widget-3.js");
/******/ 	__webpack_require__("../src/js/widgets/tables/widget-4.js");
/******/ 	__webpack_require__("../src/js/widgets/tables/widget-5.js");
/******/ 	__webpack_require__("../src/js/widgets/timeline/widget-1.js");
/******/ 	__webpack_require__("../src/js/widgets/timeline/widget-2.js");
/******/ 	var __webpack_exports__ = __webpack_require__("../src/js/widgets/timeline/widget-4.js");
    /******/
    /******/
})()
    ;
//# sourceMappingURL=widgets.bundle.js.map
