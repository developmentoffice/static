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
                const addToCart = document.querySelector('.details-product-purchase__add-buttons');
                if (addToCart) this.sendEvent('add_to_cart', addToCart, 'click');
            break;
            case 'CART':
                const checkout = document.querySelector('.ec-cart__button--checkout');
                if (checkout) this.sendEvent('initiate_checkout', checkout, 'click');
            break;
        }

        const purchase = document.querySelector('.ec-confirmation');
        if (purchase) this.sendEvent('purchase');
    },
    sendEvent(eventName, element = null, action = null) {
        try {
            if (element && action) {
                element.addEventListener(action, event => {
                    VK.Retargeting.Event(eventName);
                    console.log(`Send event: ${eventName}`);
                });
            } else {
                VK.Retargeting.Event(eventName);
                console.log(`Send event: ${eventName}`);
            }
        } catch(e) {
            console.log(`Send event error: ${eventName}`);
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
