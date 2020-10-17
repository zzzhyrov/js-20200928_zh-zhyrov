export default class NotificationMessage {
    static activeMessage;
    
    constructor(textMessage, {
        duration = 0,
        type = ''
    } = {}) {
        // console.log(NotificationMessage.flag);
        if (NotificationMessage.activeMessage) {
            NotificationMessage.activeMessage.remove();
        }

        this.textMessage = textMessage || '';
        this.duration = duration;
        this.type = type;
        this.render();
    }
    
    get template() {
        return `
        <div class="timer"></div>
        <div class="inner-wrapper">
            <div class="notification-header">${this.type}</div>
            <div class="notification-body">
                ${this.textMessage}
            </div>
        </div>
        `;
    }

    render() {
        const element = document.createElement('div');
        
        element.className = `notification ${this.type}`;
        document.body.style.cssText = `--value:${this.duration/1000}s`;
        element.innerHTML = this.template;

        this.element = element;
        
        NotificationMessage.activeMessage = this.element;
    }

    show(parent = document.body) {  
        parent.append(this.element);
        
        setTimeout(() => {
            this.remove();
        }, this.duration);
    }

    remove() {
        this.element.remove();
    }
    

    destroy() {
        this.remove();
    }

}
