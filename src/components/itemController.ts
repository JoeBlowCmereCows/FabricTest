import { GetItemDefinitionResult, GetItemResult, Item, ItemDefinitionPart, PayloadType, UpdateItemDefinitionPayload, UpdateItemDefinitionResult, WorkloadClientAPI } from '@ms-fabric/workload-client';

export interface ItemReference {
    workspaceId: string;
    id: string;
}

export interface ItemWithDefinition<T> extends ItemReference {
    type: string;
    displayName: string;
    description?: string;
    definition: T;
    additionalDefinitionParts?: ItemDefinitionPart[];
}

export enum ItemDefinitionPath {
    Default = "payload.json",
    Platform = ".platform"
}

export async function getItem(workloadClient: WorkloadClientAPI, itemObjectId: string): Promise<GetItemResult> {
    
    try {
        
        const item: GetItemResult = await workloadClient.itemCrud.getItem({ itemId: itemObjectId });
        return item;
    
    } catch (exception) {

        console.log(`unable to fetch item with id: ${itemObjectId}, error: ${exception}`);
    
    }

    return null;

}

export async function getItemDefintion<T>(workloadClient: WorkloadClientAPI, itemObjectId: string): Promise<GetItemDefinitionResult> {

    try {

        const itemDefinitionResult: GetItemDefinitionResult = await workloadClient.itemCrud.getItemDefinition({ itemId: itemObjectId });
        return itemDefinitionResult;

    } catch (exception) {

        console.log(`failed to get item definition for item ${itemObjectId}, error: ${exception}`);

    }

}

export function convertItemResultToWorkloadItem<T>(itemResult: GetItemResult, itemDefinitionResult: GetItemDefinitionResult, defaultDefinition?: T): ItemWithDefinition<T> {

    let payload: T = null;
    let itemPlatformMetadata: Item | undefined = undefined;

    let additionalParts: ItemDefinitionPart[] = [];

    if (itemDefinitionResult?.definition?.parts) {
        
        try {

            for (const part of itemDefinitionResult.definition.parts) {

                if (part.path == ItemDefinitionPath.Default) {

                    payload = JSON.parse(atob(part.payload));

                } else if (part.path == ItemDefinitionPath.Platform) {

                    const itemPlatformPayload = JSON.parse(atob(part.payload));
                    itemPlatformMetadata = itemPlatformPayload ? itemPlatformPayload.metadata : undefined;

                } else {

                    additionalParts.push(part);

                }

            }

        } catch (parseError) {

            console.log(`failed to parse payload for item ${itemResult?.item?.id}, message: ${parseError}`);

        }
    
    }

    return {
        id: itemResult?.item.id,
        workspaceId: itemResult?.item.workspaceId,
        type: itemPlatformMetadata?.type ?? itemResult?.item.type,
        displayName: itemPlatformMetadata?.displayName ?? itemResult?.item.displayName,
        description: itemPlatformMetadata?.description ?? itemResult?.item.description,
        definition: payload ?? defaultDefinition,
        additionalDefinitionParts: additionalParts,
    }

}

export async function getWorkloadItem<T>(workloadClient: WorkloadClientAPI, itemObjectId: string, defaultDefinition?: T): Promise<ItemWithDefinition<T>> {

    const getItemResult: GetItemResult = await getItem(workloadClient, itemObjectId);
    const getItemDefinitionResult: GetItemDefinitionResult = await getItemDefintion(workloadClient, itemObjectId);
    const item = await convertItemResultToWorkloadItem<T>(getItemResult, getItemDefinitionResult, defaultDefinition);

    return item;

}

function createDefaultDefinitionPart<T>(definition: T): ItemDefinitionPart {

    return {
        path: ItemDefinitionPath.Default,
        payload: btoa(JSON.stringify(definition, null, 2)),
        payloadType: PayloadType.InlineBase64
    };

}

export async function updateItemDefinition(workloadClient: WorkloadClientAPI, itemId: string, definitionParts: ItemDefinitionPart[], updateMetadata: boolean = false): Promise<UpdateItemDefinitionResult> {

    const itemDefinitions: UpdateItemDefinitionPayload = {
        definition: {
            format: undefined,
            parts: definitionParts
        }
    };

    try {

        return await workloadClient.itemCrud.updateItemDefinition({
            itemId: itemId,
            payload: itemDefinitions,
            updateMetadata: updateMetadata
        });

    } catch (exception) {

        console.log(`failed to update item definition for item: ${itemId}`);
        return undefined;

    }

}

export async function saveWorkloadItem<T>(workloadClient: WorkloadClientAPI, itemWithDefinition: ItemWithDefinition<T>): Promise<UpdateItemDefinitionResult> {

    if (!itemWithDefinition.id) {
        throw new Error("no item id provided");
    }

    if (!itemWithDefinition.definition) {
        throw new Error("no item definition provided");
    }

    const defaultDefinitionPart: ItemDefinitionPart = createDefaultDefinitionPart(itemWithDefinition.definition);
    const definitionParts: ItemDefinitionPart[] = [defaultDefinitionPart];

    if (itemWithDefinition.additionalDefinitionParts?.length > 0) {
        for (const additionalDefinitionPart of itemWithDefinition.additionalDefinitionParts) {
            definitionParts.push(additionalDefinitionPart);
        }
    }

    return updateItemDefinition(workloadClient, itemWithDefinition.id, definitionParts, false);

}