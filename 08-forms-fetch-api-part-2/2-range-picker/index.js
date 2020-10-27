export default class RangePicker {
    element = '';

    constructor ({
        from = {},
        to = {}
    } = {}) {
        this.from = from;
        this.to = to;
        
        // this.initEventListeners();
        this.render();
    }

    template() {
        return `
        <div class="rangepicker rangepicker_open">
        <div class="rangepicker__input" data-element="input">
            <span data-element="from">11/26/19</span> -
            <span data-element="to">12/26/19</span>
        </div>
        <div class="rangepicker__selector" data-element="selector">
            <div class="rangepicker__selector-arrow"></div>
            <div class="rangepicker__selector-control-left"></div>
            <div class="rangepicker__selector-control-right"></div>
            ${this.createCalendar(2020, 10)}
            ${this.createCalendar(2020, 11)}
        `;
    }
    
    getThisDay(date) {
        let day = date.getDay();
        if (day === 0) day = 7;
        console.log(day);
        return day;
    };
    
    createCalendar(year, month) {
        const mon = month - 1;
        const d = new Date(year, mon);
        let getMonthName = `${d.toLocaleString('ru', { month: 'long' })}`;
        getMonthName = getMonthName[0].toUpperCase() + getMonthName.slice(1);
        
        let table = `
        <div class="rangepicker__calendar">
            <div class="rangepicker__month-indicator">
                <time datetime="${getMonthName}">${getMonthName}</time>
            </div>
            <div class="rangepicker__day-of-week">
                <div>Пн</div>
                <div>Вт</div>
                <div>Ср</div>
                <div>Чт</div>
                <div>Пт</div>
                <div>Сб</div>
                <div>Вс</div>
            </div>
            <div class="rangepicker__date-grid">
        `;
        
        while (d.getMonth() === mon) {

            if (d.getDate() === 1) {
                table += `<button class="rangepicker__cell data-value="${d}" style="--start-from: ${this.getThisDay(d)}">` + d.getDate() + `</button>
                `;
            }
            
            if (d.getDate() !== 1) {
                table += `<button class="rangepicker__cell data-value="${d}">` + d.getDate() + `</button>
                `;
            }
            d.setDate(d.getDate() + 1);
        }
        
        table += `</div></div>`

        return table;
    }

    render () {
        const element = document.createElement('div');
        
        element.innerHTML = this.template();
        
        this.element = element.firstElementChild;
    }

    initEventListeners() {
        const event = new CustomEvent("date-select", {
            bubbles: false,
            cancelable: true
        });
        
        const rangepicker__cell = document.body.querySelectorAll('rangepicker__cell')
        
        rangepicker__cell.dispatchEvent(event);
    }

    remove () {
        this.element.remove();
    }
    
    destroy () {
        this.remove();
    }
}
