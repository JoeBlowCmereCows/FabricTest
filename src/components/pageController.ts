import { OpenMode, WorkloadClientAPI } from '@ms-fabric/workload-client';

export async function callPageOpen(workloadClient: WorkloadClientAPI, workloadName: string, path: string): Promise<void> {
    
    console.log(workloadClient);
    console.log('in call page open');

    await workloadClient.page.open({ 
        workloadName,
        route: {
            path
        },
        mode: OpenMode.ReplaceAll
    });
}