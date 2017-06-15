import Chart from './Chart';
import { XScale, YScale } from '../lib/scales';
import { XAxis, YAxis } from '../lib/axis';
import Container from '../lib/Container';
import ClipPath from '../lib/ClipPath';
import Grid from '../lib/Grid';
import Tooltip from '../lib/Tooltip';
import SeriesColumn from '../lib/series/SeriesColumn';

class ColumnChart extends Chart {
  constructor({ elem, data, options, dispatchers }) {
    super({ elem, data, options, dispatchers });

    this.type = 'column';
    this.yScales = {};
  }

  getOptions() {
    const { options, data } = this;
    const isMultiSeries = data.getSeries().length > 1;
    let layout = 'normal';

    if (isMultiSeries && !options.layout) {
      layout = 'grouped';
    } else if (isMultiSeries && options.layout) {
      layout = options.layout;
    }

    options.layout = layout;

    return options;
  }

  render() {
    const categories = this.data.getCategories();
    const groups = this.data.getGroups();
    const seriesData = this.data.getSeries();
    const dispatchers = this.dispatchers;
    const options = this.getOptions();

    this.container = new Container(this.data, options, this.type, dispatchers);
    this.container.render(this.elem);

    const wrapper = this.container.getWrapper();
    const svg = this.container.getSVG();
    const dimensions = this.container.getDimensions();

    const clipPathOptions = options.animations;
    clipPathOptions.direction = 'vertical';
    this.clipPath = new ClipPath(dimensions, clipPathOptions);
    this.clipPath.render(svg);

    this.xScale = new XScale(categories, options, dimensions, this.type);
    const x = this.xScale.generate();

    this.xAxis = new XAxis(categories, x, dimensions, options.axis.x);
    this.xAxis.render(svg);

    const x1Dimensions = Object.assign({}, dimensions, { width: x.bandwidth() });
    this.xScale1 = new XScale(groups, options, x1Dimensions, this.type);
    const x1 = this.xScale1.generate();

    this.tooltip = new Tooltip(seriesData, dimensions, options.tooltips, dispatchers);
    this.tooltip.render(wrapper);

    options.axis.y.forEach((yOptions, yAxisIndex) => {
      const data = this.data.getDataByYAxis(yAxisIndex);

      if (data.length > 0) {
        const yScale = new YScale(data, yOptions, options.layout, dimensions);
        const y = yScale.generate();
        const yAxis = new YAxis(y, dimensions, yOptions);
        yAxis.render(svg);

        if (yAxisIndex === 0) {
          this.grid = new Grid(x, y, dimensions, options);
          this.grid.render(svg);
        }

        const seriesColumn = new SeriesColumn(
          data,
          dimensions,
          x,
          y,
          this.clipPath.id,
          options,
          dispatchers,
          yAxisIndex,
          x1,
        );

        seriesColumn.render(svg);

        this.yScales[yAxisIndex] = {
          yScale,
          yAxis,
          seriesColumn,
        };
      }
    });

    this.clipPath.animate(dimensions);
  }

  update() {
    const categories = this.data.getCategories();
    const groups = this.data.getGroups();
    const seriesData = this.data.getSeries();
    const dispatchers = this.dispatchers;
    const options = this.getOptions();

    this.container.update(this.data, options, this.type, dispatchers);
    const dimensions = this.container.getDimensions();

    this.clipPath.update(dimensions);
    this.tooltip.update(seriesData, dimensions, options.tooltips, dispatchers);

    const x = this.xScale.update(categories, options, dimensions, this.type);
    this.xAxis.update(categories, x, dimensions, options.axis.x);

    const x1Dimensions = Object.assign({}, dimensions, { width: x.bandwidth() });
    this.xScale1 = new XScale(groups, options, x1Dimensions, this.type);
    const x1 = this.xScale1.generate();

    options.axis.y.forEach((yOptions, yAxisIndex) => {
      const data = this.data.getDataByYAxis(yAxisIndex);
      const scale = this.yScales[yAxisIndex];

      if (scale) {
        const y = scale.yScale.update(data, yOptions, options.layout, dimensions);

        if (yAxisIndex === 0) {
          this.grid.update(x, y, dimensions, options);
        }

        scale.yAxis.update(y, dimensions, yOptions, yAxisIndex);

        scale.seriesColumn.update(
          data,
          dimensions,
          x,
          y,
          this.clipPath.id,
          options,
          dispatchers,
          yAxisIndex,
          x1,
        );
      }
    });
  }
}

export default ColumnChart;