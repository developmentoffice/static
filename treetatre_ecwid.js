const Controller = {
    addToCart: null,
    async init() {
        await this.initCounter();
        this.initEvents();
    },
    initCounter() {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.async = true;
            script.src = 'https://vk.com/js/api/openapi.js?169';
            script.onload = function () {
                VK.Retargeting.Init('VK-RTRG-1406368-1bFSm');
                VK.Retargeting.Hit();
                resolve();
            };
            document.head.appendChild(script);
            console.log('Init VK counter');
        })
    },
    initEvents() {
        const addToCart = document.querySelector('.product-details .form-control__button');
        if (addToCart) this.sendEvent('add to cart', addToCart, 'click');
        const checkout = document.querySelector('.ec-cart__body .form-control__button');
        if (checkout) this.sendEvent('initiate checkout', checkout, 'click');
        const purchase = document.querySelector('.ec-confirmation');
        if (purchase) this.sendEvent('purchase');
    },
    sendEvent(eventName, element = null, action = null) {
        try {
            if (element && action) {
                element.addEventListener(action, event => {
                    VK.Retargeting.Event(eventName);
                    console.log(`Send event: ${element}, ${action}, ${eventName}`);
                });
            } else {
                VK.Retargeting.Event(eventName);
                console.log(`Send event: ${eventName}`);
            }
        } catch(e) {
            console.log(`Send event error: ${element}, ${action}, ${eventName}`);
        }
    }
};

window.addEventListener('load', () => {
    try {
        Ecwid.OnPageLoaded.add(page => {
            console.log(page);
            Controller.init();
        });
    } catch (e) {}
});
