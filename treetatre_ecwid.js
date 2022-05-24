const Controller = {
    init() {
        this.initCounter();
    },
    initCounter() {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src = 'https://vk.com/js/api/openapi.js?169';
        script.onload = function () {
            VK.Retargeting.Init('VK-RTRG-1406368-1bFSm');
            VK.Retargeting.Hit();
        };
        document.head.appendChild(script);
    }
};

window.addEventListener('load', () => Controller.init());
