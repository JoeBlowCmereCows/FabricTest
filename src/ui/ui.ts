import { createWorkloadClient, InitParams, WorkloadClientAPI } from '@ms-fabric/workload-client';
import { AnyPage } from './page';
import { ReportPage } from './report';

export async function initialize(params: InitParams) {

    const appElement: HTMLElement = document.getElementById('app');
    const workloadClient: WorkloadClientAPI = createWorkloadClient();

    let parts: string[] = params.bootstrapPath.split('/');
    let type: string = parts[1];
    let itemId: string = parts[2];

    let page: AnyPage = null;

    switch (type) {

        case 'report':
            page = new ReportPage(appElement, itemId, workloadClient);
            break;

        case 'integration':
            break;

        case 'workspace':
            break;

    }

    page.Render();

}