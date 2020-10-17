export default class ColumnChart {
    subElements = {}; //для обновления столбиков графика
    chartHeight = 50;
    
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
    
    getColumnBody(data) {
        const maxValue = Math.max(...data);
        let size = this.chartHeight / maxValue;

        return data
        .map((item) => {
            return `<div style="--value: ${Math.floor(item * size)}" data-tooltip="${(item / maxValue * 100).toFixed(0)}%"></div>`;
        })
        .join('');
    }
    
    render() {
        let columnsClassName = '';
        
        if (this.data.length) {
            columnsClassName = 'column-chart';
        } else {
            columnsClassName = 'column-chart_loading' + ' ' + 'column-chart';
        };

        let columnChart = document.createElement('div');
        columnChart.className = columnsClassName;
        columnChart.innerHTML = `
        <div class="column-chart__title">
            Total ${this.label}
            <a href="/sales" class="column-chart__link">View all</a>
        </div>
        <div class="column-chart__container">
            <div data-element="header" class="column-chart__header">${this.value}</div>
            <div data-element="body" class="column-chart__chart">
                ${this.getColumnBody(this.data)}
            </div>
        `;

        this.element = columnChart;
        
        console.log(this.element);
        this.subElements = this.getSubElements(this.element);
    }
    
    getSubElements(element) {
        const elements = element.querySelectorAll('[data-element]');

        // console.log(elements);
        return [...elements].reduce((accum, subElement) => {
            accum[subElement.dataset.element] = subElement;

            return accum;
        },  {});
    }

    update(data) {
        this.subElements.body.innerHTML = this.getColumnBody(data);
    }

    remove() {
        this.element.remove();
    }

    destroy() {
        this.remove();
        this.element = null;
    }

}