import { bootstrap } from '@ms-fabric/workload-client';

const url = new URL(window.location.href);
if (url.pathname?.startsWith('/close')) {
    window.close();
}

bootstrap({

    //@ts-ignore
    initializeWorker: (params) => import('./ui/worker').then(({ initialize }) => initialize(params)),
    
    //@ts-ignore
    initializeUI: (params) => import('./ui/ui').then(({ initialize }) => initialize(params)),

});
