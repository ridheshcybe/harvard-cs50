export interface inner<T> {
  [x: string]: T;
}

export type embeds = inner<string>;
export type imports = inner<Buffer>;

export interface data {
  [x: string]: { imports: imports; notes: string; embeds: embeds };
}
