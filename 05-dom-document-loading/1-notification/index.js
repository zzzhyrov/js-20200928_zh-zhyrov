export default class NotificationMessage {
    static flag;
    
    constructor(text, {
        duration = 0,
        type = ''
    } = {}) {
        // console.log(NotificationMessage.flag);
        if (NotificationMessage.flag == true) {
            this.remove();
        }

        this.text = text || '';
        this.duration = duration;
        this.type = type;
    }
    
    get template() {
        return `
        <div class="timer"></div>
        <div class="inner-wrapper">
            <div class="notification-header">${this.type}</div>
            <div class="notification-body">
                Hello world
            </div>
        </div>
        `;
    }

    show() {  
        const notificationBox = document.createElement('div');
        
        NotificationMessage.flag = true;
        notificationBox.className = `notification ${this.type}`;
        document.body.style.cssText = `--value:${this.duration/1000}s`; // скрыть
        notificationBox.innerHTML = this.template;
        let button = document.getElementById("btn1");
        button.after(notificationBox);
        NotificationMessage.flag = true;
        
        setTimeout(() => {
            this.remove();
            NotificationMessage.flag = false;
        }, this.duration);
    }

    remove() {
        if (document.querySelector('.notification')) {
        document.querySelector('.notification').remove();
    }
    }

    destroy() {
        this.remove();
    }

}
