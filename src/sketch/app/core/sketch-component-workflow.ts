import { Class } from "@/sketch/api/types";
import SketchComponent from "@/sketch/api/sketch-component";
import { getConfigurationOf, getSlotByEntryName } from "@/sketch/api/sketch-component-configuration-manager";
import { ComponentConfiguration } from "@/sketch/api/component-configuration";

/**
 * @author Dorian TERBAH
 * 
 * Class used to represent a succession of components in the app
 * 
 * @version 1.0
 */
export default class SketchComponentWorkflow {

    /**
     * Edges of the workflow. Each component will be mapped with their
     * entries names and the parent component associated.
     */
    private edges: Map<SketchComponent<unknown>, Map<string, SketchComponent<unknown>>>;

    /**
     * Map a component with his children
     */
    private children: Map<SketchComponent<unknown>, Map<string, SketchComponent<unknown>>>;

    /**
     * Components that doesn't have any link with other components
     */
    private orphanComponents: Array<SketchComponent<unknown>>;

    constructor() {
        this.edges = new Map<SketchComponent<unknown>, Map<string, SketchComponent<unknown>>>();
        this.children = new Map<SketchComponent<unknown>, Map<string, SketchComponent<unknown>>>();
        this.orphanComponents = new Array<SketchComponent<unknown>>();
    }

    /**
     * Insert a component in the workflow
     * @param component The component to insert
     */
    public insertComponent(component: SketchComponent<unknown>) : void {
        this.orphanComponents.push(component);
    }

    /**
     * @param component The component to check
     * @return true if the component has parents, otherwise false
     */
    private hasParents(component: SketchComponent<unknown>) : boolean {
        const parents : Map<string, SketchComponent<unknown>> | undefined = this.edges.get(component);
        return (parents != undefined) && (parents.size > 0);
    }

    /**
     * Try to create a link between with two components
     * @param parent The parent of the association
     * @param child The child of the association
     * @param entryName The entry name for the association
     * @returns true if the association was created, else false
     */
    public createLinkBetween(parent: SketchComponent<unknown>, child: SketchComponent<unknown>, entryName: string) : boolean {
        if (!this.isAssociationPossible(parent, child, entryName)
        || this.existsLinkBetween(parent, child, entryName)
        || this.isParent(child, parent)) {
            return false;
        }

        if (!this.edges.has(child)) {
            this.edges.set(child, new Map<string, SketchComponent<unknown>>());
        }

        const parents = this.edges.get(child) as Map<string, SketchComponent<unknown>>;
        parents.set(entryName, parent);

        if (!this.children.has(parent)) {
            this.children.set(parent, new Map<string, SketchComponent<unknown>>());
        }

        const children = this.children.get(parent);
        children?.set(entryName, child);

        return true;
    }

    public existsLinkBetween(parent: SketchComponent<unknown>, child: SketchComponent<unknown>, entryName: string) : boolean {
        if (!this.edges.has(child)) {
            return false;
        }

        const parents: Map<string, SketchComponent<unknown>> | undefined = this.edges.get(child);
        const potentialParent: SketchComponent<unknown> | undefined = parents?.get(entryName);
        return parent == potentialParent;
    }

    private isAssociationPossible(parent: SketchComponent<unknown>, child: SketchComponent<unknown>, entryName: string) : boolean {
        const parentConfiguration: ComponentConfiguration = getConfigurationOf(parent.constructor as Class<SketchComponent<unknown>>);
        const childConfiguration: ComponentConfiguration = getConfigurationOf(child.constructor as Class<SketchComponent<unknown>>);

        const parentTypeReturn: Class<unknown> | undefined = parentConfiguration.returnType;
        if (!childConfiguration.slotsConfigurations) {
            return false;
        }

        const slot = getSlotByEntryName(childConfiguration.slotsConfigurations, entryName);

        // maybe to review
        return slot !== undefined && slot.type === parentTypeReturn;
    }

    /**
     * Check if a component is the parent of another
     *
     * @param parent The potential parent.
     * @param child The potential child.
     * @return <code>true</code> if the first component is the parent of the second, else <code>false</code>.
     */
    private isParent(parent: SketchComponent<unknown>, child: SketchComponent<unknown>) : boolean {
        const links: Map<string, SketchComponent<unknown>> | undefined = this.edges.get(child);
        if (links === undefined) {
            return false;
        }

        const components: Array<SketchComponent<unknown>> = Array.from(links.values());
        return components.includes(parent);
    }

    public removeLink(child: SketchComponent<unknown>, entryName: string) : void {
        const parents: Map<string, SketchComponent<unknown>> | undefined = this.edges.get(child);
        if (parents !== undefined) {
            parents.delete(entryName);
        }
    }

    public clear() : void {
        this.edges.clear();
        this.orphanComponents = [];
    }
}