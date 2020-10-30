export default class SortableTable {
    element;
    subElements = {};

    onSortClick = event => {
        const column = event.target.closest('[data-sortable="true"]');

        const toggleOrder = order => {
            const orders = {
                asc: 'desc',
                desc: 'asc'
            };

            return orders[order];
        };

        if (column) {
            const { id, order } = column.dataset;
            const sortedData = this.sortData(id, toggleOrder(order));
            const arrow = column.querySelector('.sortable-table__sort-arrow');
            
            column.dataset.order = toggleOrder(order);
            
            if (!arrow) {
                column.append(this.subElements.arrow);
            }
            
            this.subElements.body.innerHTML = this.tableRows(sortedData);
        }
    };

    constructor(header, {
        data = [],
        sorted = {
            id: header.find(item => item.sortable).id,
            order: 'asc'
        }
    } = {}) {
        this.header = header;
        this.data = data;
        this.sorted = sorted;
        
        this.render();
    }

    initEventListeners() {
        this.subElements.header.addEventListener('pointerdown', this.onSortClick);
    }

    headerCell({id, title, sortable}) {
        const order = this.sorted.id === id ? this.sorted.order : 'asc';
        
        return `
        <div class="sortable-table__cell" data-id="${id}" data-sortable="${sortable}" data-order="${order}">
            <span>${title}</span>
            ${this.getHeaderSortingArrow(id)}
        </div>`
    }

    getHeaderSortingArrow (id) {
        const isOrderExist = this.sorted.id === id ? this.sorted.order : '';
    
        return isOrderExist
            ? `<span data-element="arrow" class="sortable-table__sort-arrow">
                <span class="sort-arrow"></span>
            </span>`
            : '';
    }

    tableHeader() {
        return `
        <div data-element="header" class="sortable-table__header sortable-table__row">
            ${this.header.map(item => this.headerCell(item)).join('')}
        </div>`;
    }

    tableBody() {
        return `
        <div data-element="body" class="sortable-table__body">
            ${this.tableRows(this.data)};
        </div>`
    }

    tableRows(data) {
        return data.map(item => {
            return `
            <a href="/products/${item.id}" class="sortable-table__row">
                ${this.tableRow(item)}
            </a>`
        }).join('');
    }

    tableRow(item) {
        const cells = this.header.map(({id, template}) => {
            return {
                id,
                template
            };
        });

        return cells.map(({id, template}) => {
            return template
            ? template(item[id])
            : `<div class="sortable-table__cell">${item[id]}</div>`;
            }).join(' ');
    }

    render() {
        const element =  document.createElement('div');
        element.className = 'products-list__container';
        element.setAttribute('data-element', 'productsContainer');
        element.innerHTML = 
        `<div class="sortable-table">
        ${this.tableHeader()}
        ${this.tableBody()}
        </div>`;

        this.element = element;
        this.subElements = this.getSubElements(element);
        
        this.initEventListeners();
    }

    sortData(id, order) {
        const arr = [...this.data];
        const column = this.header.find(item => item.id === id);
        const {sortType, customSorting} = column;
        const direction = order === 'asc' ? 1 : -1;

        return arr.sort((a, b) => {
            switch (sortType) {
                case 'number':
                    return direction * (a[id] - b[id]);
                case 'string':
                    return direction * a[id].localeCompare(b[id], 'ru');
                case 'custom':
                    return direction * customSorting(a, b);
                default:
                    return direction * (a[id] - b[id]);
            };
        });
    }

    // sort(id, order) {
    //     const sortedData = this.sortData(id, order);
    //     const allColumns = this.element.querySelectorAll('.sortable-table__cell[data-id]');
    //     const currentColumn = this.element.querySelector(`.sortable-table__cell[data-id="${id}"]`);

    //     allColumns.forEach(column => {
    //         column.dataset.order = '';
    //     });

    //     currentColumn.dataset.order = order;

    //     this.subElements.body.innerHTML = this.tableRows(sortedData);
    // }

    getSubElements(element) {
        const elements = element.querySelectorAll('[data-element]');
        
        return [...elements].reduce((accum, subElement) => {
            accum[subElement.dataset.element] = subElement;
            
            return accum;
        }, {});
    }

    remove() {
        this.element.remove();
    }

    destroy() {
        this.remove();
    }
}