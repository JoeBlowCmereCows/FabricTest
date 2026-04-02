import { ItemReference } from "../components/itemController";

export interface WorkspaceDefinition {

    title?: string;
    files: OneLakeFileReference[];
    
}

export interface OneLakeFileReference extends ItemReference {

    filename: string;
    content: string;

    isDirty: boolean;

}