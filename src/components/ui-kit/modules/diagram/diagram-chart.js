class DiagramChart {
  constructor(rootElem, options) {
    this.rootElem = rootElem;
    this.options = this.getOptions(options);
    this.initCanvas();
  }
  initCanvas() {
    const canvas = document.createElement('canvas');
    this.rootElem.append(canvas);
    canvas.width = this.options.width;
    canvas.height = this.options.height;
    const ctx = canvas.getContext("2d");
    this.ctx = ctx;
  }
  drawArc(centerX, centerY, radius, startAngle, endAngle, color) {
    this.ctx.strokeStyle = color;
    this.ctx.beginPath();
    this.ctx.lineWidth = this.options.lineWidth;
    this.ctx.arc(centerX, centerY, radius, startAngle, endAngle, false);
    this.ctx.stroke();
  }
  drawText(ctx, text, position, style) {
    ctx.fillStyle = this.options.fontColor;
    ctx.font = this.options.fontWeight + ' ' + style.fontSize + ' ' + this.options.font;
    console.log(this.options.fontWeight + ' ' + style.fontSize + ' ' + this.options.font);
    ctx.fillText(text, position.x, position.y);
  }
  drawChart() {
    let centerX = this.options.width / 2;
    let centerY = this.options.width / 2;
    let radius = (this.options.width > this.options.height)
      ? (this.options.height / 2 - this.options.lineWidth)
      : (this.options.width / 2 - this.options.lineWidth);
    let perfectAngle = (this.options.segments.perfect / this.options.number) * 2 * Math.PI;
    let goodAngle = (this.options.segments.good / this.options.number) * 2 * Math.PI;
    let poorAngle = (this.options.segments.poor / this.options.number) * 2 * Math.PI;
    let satisfactoryAngle = (this.options.segments.satisfactory / this.options.number) * 2 * Math.PI;
    if (poorAngle != 0) {
      this.drawArc(centerX, centerY, radius, this.options.initialAngle + this.options.delimeterAngle, this.options.initialAngle + poorAngle, this.options.backgroundColor.poor);
    }
    if (satisfactoryAngle != 0) {
      this.drawArc(centerX, centerY, radius, this.options.initialAngle + this.options.delimeterAngle + poorAngle,
        this.options.initialAngle + poorAngle + satisfactoryAngle,
        this.options.backgroundColor.satisfactory);
    }
    if (goodAngle != 0) {
      this.drawArc(centerX, centerY, radius, this.options.initialAngle + poorAngle + satisfactoryAngle + this.options.delimeterAngle, this.options.initialAngle + poorAngle + satisfactoryAngle + goodAngle, this.options.backgroundColor.good);
    }
    if (perfectAngle != 0) {
      this.drawArc(centerX, centerY, radius, this.options.delimeterAngle + this.options.initialAngle + poorAngle + satisfactoryAngle + goodAngle, this.options.initialAngle + poorAngle + satisfactoryAngle + goodAngle + perfectAngle, this.options.backgroundColor.perfect);
    }
    //this.drawText(this.ctx, this.options.number, { x: 60, y: 37 }, {fontSize: '24px',});
    //this.drawText(this.ctx, this.options.label, { x: 80, y: 67 }, {fontSize: '12px',});
  }
  getOptions(options) {
    let width = options.width || 120;
    let height = options.height || 120;
    let font = options.font || 'Montserrat,sans-serif';
    let number = options.number || 260;
    let label = options.label || "голосов";
    let defaultSegments = {
      perfect: 130, good: 65, satisfactory: 65, poor: 0,
    }
    let segments = options.segments || defaultSegments;
    let lineWidth = 4;
    let fontWeight = 'bold';
    let delimeterAngle = lineWidth / (width / 2);
    let initialAngle = -Math.PI / 2;
    let backgroundColor = {
      perfect: '#FFE39C',
      good: '#6FCF97',
      satisfactory: '#BC9CFF',
      poor: '#919191',
      background: '#FFFFFF',
    };
    let defaultFontColor = '#BC9CFF';
    let fontColor = options.fontColor || defaultFontColor;
    return { width, height, number, label, segments, lineWidth, initialAngle, backgroundColor, delimeterAngle, font, fontColor, fontWeight }
  }
}
export default DiagramChart;