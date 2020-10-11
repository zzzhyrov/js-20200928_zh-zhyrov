export default class ColumnChart {
    // element;
    
    constructor({
        data = [],
        label = '',
        value = 0,
        link = ''
    } = {}) {
        this.data = data;
        this.label = label;
        this.value = value;
        this.link = link;
        this.render();
    }
    
    render() {
        let chartHeight = 50;
        let maxValue = Math.max(...this.data);
        
        let columns = '';
        let columnsClassName = '';

        if (this.data.length !== 0) {
            columns = (this.data)
            .map(function(item) {
            let size = chartHeight / maxValue;
            return `<div style="--value: ${(item * size).toFixed(0)}" data-tooltip="${(item / maxValue * 100).toFixed(0)}%"></div>`;
            })
            .join('');
            columnsClassName = 'column-chart';
        } else {
            columnsClassName = 'column-chart_loading' + ' ' + 'column-chart';
        };

        let column_chart = document.createElement('div');
        column_chart.className = columnsClassName;
        column_chart.innerHTML = `
        <div class="column-chart__title">
            Total ${this.label}
            <a href="/sales" class="column-chart__link">View all</a>
        </div>
        <div class="column-chart__container">
            <div data-element="header" class="column-chart__header">${this.value}</div>
            <div data-element="body" class="column-chart__chart">
                ${columns}
            </div>
        `;
        
        this.element = column_chart;
    }
    
    update() {
        this.render()
    }

}