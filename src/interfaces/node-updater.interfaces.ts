export interface AccountMetadata {
  nodes: string[];
  failing_nodes?: Record<string, string>;
}

/**
 * //TODO Note for thecrazygm: Initially I was thinking about using this one below. But maybe
 * you want a more strict approach about types which include using NectarflowerJsonMetadata
 * which I have named like that to avoid possible conflicts when using other libraries(those who may be using JsonMetadata)
 */
export interface NodeData {
  nodes: string[];
  failing_nodes?: Record<string, string>;
}
