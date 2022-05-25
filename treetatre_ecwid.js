const Controller = {
    type: '',
    async init(type) {
        this.type = type;
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
        switch (this.type) {
            case 'PRODUCT':
                const addToCart = document.querySelector('.product-details .form-control__button');
                console.log(addToCart);
                if (addToCart) this.sendEvent('add to cart', addToCart, 'click');
            break;
            case 'CART':
            break;
        }

        const checkout = document.querySelector('.ec-cart__body .form-control__button');
        if (checkout) this.sendEvent('initiate checkout', checkout, 'click');
        const purchase = document.querySelector('.ec-confirmation');
        if (purchase) this.sendEvent('purchase');
    },
    sendEvent(eventName, element = null, action = null) {
        try {
            if (element && action) {
                console.log(element, action);
                element.addEventListener(action, event => {
                    console.log('clicked');
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
            Controller.init(page.type);
        });
    } catch (e) {}
});
