
export interface TargetDataAttributes {
    /**
     * The human readable name that represents this target. These are generated based on the provided properties, and the source. In the future we may support updating this value. 
     * @type {string}
     * @memberof TargetDataAttributes
     */
    display_name?: string;
    /**
     * The URL for the resource. We do not use this as part of our representation of the identity of the target, as it can      be changed externally to Snyk We are reliant on individual integrations providing us with this value. Currently it is only provided by the CLI 
     * @type {string}
     * @memberof TargetDataAttributes
     */
    url?: string | null;
}

export interface TargetData {
    /**
     * 
     * @type {TargetDataAttributes}
     * @memberof TargetData
     */
    attributes: TargetDataAttributes;
    /**
     * The Resource ID.
     * @type {string}
     * @memberof TargetData
     */
    id: string;
    /**
     * The Resource type.
     * @type {string}
     * @memberof TargetData
     */
    type: string;
}
