export interface BlockDiff {
  ok: boolean;
  head_delay: number;
  diff_head_irreversible: number;
  time: number;
  rank: number;
}

export interface ApiCall {
  ok: boolean;
  time: number;
  access_time: number;
  rank: number;
}

export interface Config {
  ok: boolean;
  time: number;
  access_time: number;
  rank: number;
}

export interface History {
  ok: boolean;
  count: number;
  time: number;
  rank: number;
}

export interface Block {
  ok: boolean;
  count: number;
  time: number;
  rank: number;
}

export interface NodeReport {
  node: string;
  version: string;
  hive: boolean;
  block: Block;
  history: History;
  apicall: ApiCall;
  config: Config;
  block_diff: BlockDiff;
}

export interface Benchmarks {
  block: {
    data: string[];
  };
  history: {
    data: string[];
  };
  apicall: {
    data: string[];
  };
  config: {
    data: string[];
  };
  block_diff: {
    data: string[];
  };
}

export interface Parameter {
  num_retries: number;
  num_retries_call: number;
  timeout: number;
  threading: boolean;
  hive_nectar_version: string;
  start_time: string;
  end_time: string;
  script_version: string;
  benchmarks: Benchmarks;
}

export interface NectarflowerJsonMetadata {
  nodes: string[];
  failing_nodes: Record<string, string>;
  report: NodeReport[];
  parameter: Parameter;
}
