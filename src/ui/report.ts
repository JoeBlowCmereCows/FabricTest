import { WorkloadClientAPI } from "@ms-fabric/workload-client";
import { ReportDefinition } from "../items/report";
import { Page } from "./page";

export class ReportPage extends Page<ReportDefinition> {

    protected connection: HTMLInputElement = null;
    protected title: HTMLInputElement = null;

    public constructor(rootElement: HTMLElement, id: string, workloadClient: WorkloadClientAPI) {

        super(rootElement, id, workloadClient);

        this.connection = this.itemDetails.appendChild(document.createElement('input'));
        this.connection.style.display = 'block';
        this.connection.style.marginTop = '8px';

        this.title = this.itemDetails.appendChild(document.createElement('input'));
        this.title.style.display = 'block';
        this.title.style.marginTop = '8px';

        this.getItemButton.addEventListener('click', async () => {

            let result: ReportDefinition = await this.GetItem();

            this.resetMessage();

            if (result) {
                this.message.textContent = 'successfully retrieved item';
                this.connection.value = result.connection;
                this.title.value = result.title;
            } else {
                this.error.textContent = 'item has not been created yet';
                this.connection.textContent = '';
                this.title.textContent = '';
            }

        });

        this.setItemButton.addEventListener('click', async() => {

            this.resetMessage();

            let newItem: ReportDefinition = {
                connection: this.connection.value,
                title: this.title.value
            };

            this.item.definition = newItem;

            console.log(`updating item with id ${this.item.id}`);
            console.log(this.item);

            await this.SaveItem();

            this.connection.value = '';
            this.title.value = '';

            this.message.textContent = ('successfully saved item');

        });

    }

    public override Render(): void {

        console.log('welcome to the jungle baby, we got fun and games');

    }

}