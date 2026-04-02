import { UpdateItemDefinitionResult, WorkloadClientAPI } from '@ms-fabric/workload-client';
import { getWorkloadItem, ItemWithDefinition, saveWorkloadItem } from '../components/itemController';
import { IntegrationDefinition } from '../items/integration';
import { ReportDefinition } from '../items/report';
import { WorkspaceDefinition } from '../items/workspace';

export class Page<T> {

    protected id: string = null;
    protected appElement: HTMLElement = null;
    protected workloadClient: WorkloadClientAPI = null;

    protected definition: T = null;
    protected item: ItemWithDefinition<T> = null;

    protected itemId: HTMLDivElement = null;
    protected getItemButton: HTMLButtonElement = null;
    protected setItemButton: HTMLButtonElement = null;

    protected itemDetails: HTMLDivElement = null;

    protected message: HTMLDivElement = null;
    protected error: HTMLDivElement = null;

    public constructor(rootElement: HTMLElement, id: string, client: WorkloadClientAPI) {
        
        this.id = id;
        this.appElement = rootElement;
        this.workloadClient = client;

        this.itemId = <HTMLDivElement>document.getElementById('itemId');
        this.itemId.textContent = `Item Id: ${id}`;
    
        this.getItemButton = <HTMLButtonElement>document.getElementById('getItemButton');
        this.setItemButton = <HTMLButtonElement>document.getElementById('setItemButton');

        this.itemDetails = <HTMLDivElement>document.getElementById('itemDetails');

        this.message = <HTMLDivElement>document.getElementById('message');
        this.error = <HTMLDivElement>document.getElementById('error');

    }

    protected resetMessage() {
        this.message.textContent = '';
        this.error.textContent = '';
    }

    public async GetItem(): Promise<T> {

        let result: ItemWithDefinition<T> = await getWorkloadItem<T>(this.workloadClient, this.id);
        this.item = result;

        return result.definition;

    }

    public async SaveItem(): Promise<void> {
        await saveWorkloadItem(this.workloadClient, this.item);
    }

    public Render(): void {

    }

}

export type AnyPage = Page<IntegrationDefinition | ReportDefinition | WorkspaceDefinition>;