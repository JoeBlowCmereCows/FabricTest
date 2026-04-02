import { callPageOpen } from '../components/pageController.ts';
import { createWorkloadClient, InitParams, ItemLikeV2, WorkloadAction, WorkloadClientAPI } from '@ms-fabric/workload-client';

interface ItemCreationSuccessData {
    item: ItemLikeV2;
}

interface ItemCreationFailureData {
    errorCode?: string;
    resultCode?: string;
}

export async function initialize(params: InitParams): Promise<void> {

    let workloadClient: WorkloadClientAPI = createWorkloadClient();

    workloadClient.action.onAction(async (message: WorkloadAction<unknown>) => {

        const { action, data } = message;

        switch (action) {

            case 'item.onCreationSuccess':

                const { item: createdItem } = data as ItemCreationSuccessData;

                console.log(createdItem);

                const itemTypeName: string = createdItem.itemType;
                let path: string = null;

                switch (itemTypeName) {

                    case 'Org.MyWorkload.Report':
                        path = '/report';
                        break;

                    case 'Org.MyWorkload.Workspace':
                        path = '/workspace';
                        break;

                    case 'Org.MyWorkload.Integration':
                        path = '/integration';
                        break;

                }

                console.log(`redirecting to ${path} with item id ${createdItem.objectId}`);

                await callPageOpen(workloadClient, 'Org.MyWorkload', `${path}/${createdItem.objectId}`);

                return Promise.resolve({ succeeded: true });

            case 'item.onCreationFailure':
                break;

        }

    });

}