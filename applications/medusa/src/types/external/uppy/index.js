/* eslint-disable flowtype/no-mixed,flowtype/no-weak-types,no-use-before-define,no-unused-vars */
/**
 * Flowtype definitions for index
 * Generated by Flowgen from a Typescript Definition
 * Flowgen v1.14.1
 * @flow
 */

import * as UppyUtils from '@uppy/utils';

declare var Uppy: typeof npm$namespace$Uppy

declare var npm$namespace$Uppy: {|
  PluginOptions: Class<Uppy$PluginOptions>,
  DefaultPluginOptions: Class<Uppy$DefaultPluginOptions>,
  Restrictions: Class<Uppy$Restrictions>,
  Plugin: typeof Uppy$Plugin,
  Uppy: typeof Uppy$Uppy,
|}
declare type Uppy$OmitKey<T, Key> = Pick<T, Exclude<$Keys<T>, Key>>;

export type Uppy$UppyFile<TMeta: Uppy$IndexedObject<any> = { ... },
  TBody: Uppy$IndexedObject<any> = { ... }> = UppyUtils.UppyFile<TMeta, TBody>;

export type Uppy$Store = UppyUtils.Store;

export type Uppy$InternalMetadata = UppyUtils.InternalMetadata;

declare interface Uppy$IndexedObject<T> {
  [key: string]: T;

  [key: number]: T;
}

declare type Uppy$UploadedUppyFile<TMeta, TBody> = {
  uploadURL: string,
  ...
} & Uppy$UppyFile<TMeta, TBody>;

declare type Uppy$FailedUppyFile<TMeta, TBody> = {
  error: string,
  ...
} & Uppy$UppyFile<TMeta, TBody>;

declare type Uppy$UppyFileWithoutMeta<TMeta, TBody> = Uppy$OmitKey<Uppy$UppyFile<TMeta, TBody>,
  'meta'>;

declare type Uppy$AddFileOptions<TMeta = Uppy$IndexedObject<any>,
  TBody = Uppy$IndexedObject<any>> = {
  data: Blob | File,
  meta?: { ...$Rest<Uppy$InternalMetadata, { ... }>, ...TMeta },
  ...
} & $Rest<Uppy$UppyFileWithoutMeta<TMeta, TBody>, { ... }>;

declare interface Uppy$PluginOptions {
  id?: string;
}

declare type Uppy$DefaultPluginOptions = {
  [prop: string]: any,
  ...
} & Uppy$PluginOptions;

declare type Uppy$PluginTarget = string | Element | typeof Uppy$Plugin;

declare class Uppy$Plugin<TOptions: Uppy$PluginOptions = Uppy$DefaultPluginOptions> {
  id: string;
  uppy: Uppy$Uppy<>;
  type: string;
  constructor (uppy: Uppy$Uppy<>, opts?: TOptions): this;
  setOptions (update: $Rest<TOptions, { ... }>): void;
  getPluginState (): { [key: string]: any };
  setPluginState (update: Uppy$IndexedObject<any>): { [key: string]: any };
  update (state?: { [key: string]: any }): void;
  mount (target: Uppy$PluginTarget, plugin: typeof Uppy$Plugin): void;
  render (state: { [key: string]: any }): void;
  addTarget<TPlugin: Uppy$Plugin<>> (plugin: TPlugin): void;
  unmount (): void;
  install (): void;
  uninstall (): void;
}

declare type Uppy$LocaleStrings<TNames: string> = $ObjMapi<{ [k: TNames]: any },
  <K>(K) =>
    | string
    | {
    [n: number]: string,
    ...
  }>;

declare interface Uppy$Locale<TNames: string = string> {
  strings: Uppy$LocaleStrings<TNames>;
  pluralize?: (n: number) => number;
}

declare interface Uppy$Restrictions {
  maxFileSize?: number | null;
  minFileSize?: number | null;
  maxTotalFileSize?: number | null;
  maxNumberOfFiles?: number | null;
  minNumberOfFiles?: number | null;
  allowedFileTypes?: string[] | null;
}

declare interface Uppy$UppyOptions<TMeta: Uppy$IndexedObject<any> = { ... }> {
  id?: string;
  autoProceed?: boolean;
  allowMultipleUploads?: boolean;
  debug?: boolean;
  restrictions?: Uppy$Restrictions;
  meta?: TMeta;
  onBeforeFileAdded?: (
    currentFile: Uppy$UppyFile<TMeta>,
    files: {
      [key: string]: Uppy$UppyFile<TMeta>,
      ...
    }
  ) => Uppy$UppyFile<TMeta> | boolean | void;
  onBeforeUpload?: (files: {
    [key: string]: Uppy$UppyFile<TMeta>,
    ...
  }) =>
    | {
    [key: string]: Uppy$UppyFile<TMeta>,
    ...
  }
    | boolean;
  locale?: Uppy$Locale<>;
  store?: Uppy$Store;
  infoTimeout?: number;
}

declare interface Uppy$UploadResult<TMeta: Uppy$IndexedObject<any> = { ... },
  TBody: Uppy$IndexedObject<any> = { ... }> {
  successful: Uppy$UploadedUppyFile<TMeta, TBody>[];
  failed: Uppy$FailedUppyFile<TMeta, TBody>[];
}

declare type Uppy$State<TMeta: Uppy$IndexedObject<any> = { ... },
  TBody: Uppy$IndexedObject<any> = { ... }> = {
  capabilities?: {
    resumableUploads?: boolean,
    ...
  },
  currentUploads: { ... },
  error?: string,
  files: {
    [key: string]: | Uppy$UploadedUppyFile<TMeta, TBody>
      | Uppy$FailedUppyFile<TMeta, TBody>,
    ...
  },
  info?: {
    isHidden: boolean,
    type: string,
    message: string,
    details: string,
    ...
  },
  plugins?: Uppy$IndexedObject<any>,
  totalProgress: number,
  ...
} & Uppy$IndexedObject<any>;

declare type Uppy$LogLevel = 'info' | 'warning' | 'error';

/**
 * Enable the old, untyped `uppy.use()` signature.
 */
declare type Uppy$LooseTypes = 'loose';

/**
 * Disable the old, untyped `uppy.use()` signature.
 */
declare type Uppy$StrictTypes = 'strict';

declare type Uppy$TypeChecking = Uppy$LooseTypes | Uppy$StrictTypes;

declare type Uppy$LiteralUnion<T: U, U = string> = T | { ...U, ...{ ... } };

declare type Uppy$Event = Uppy$LiteralUnion<| 'file-added'
  | 'file-removed'
  | 'upload'
  | 'upload-progress'
  | 'upload-success'
  | 'complete'
  | 'error'
  | 'upload-error'
  | 'upload-retry'
  | 'info-visible'
  | 'info-hidden'
  | 'cancel-all'
  | 'restriction-failed'
  | 'reset-progress'>;

declare type Uppy$UploadHandler = (fileIDs: string[]) => Promise<void>;

declare class Uppy$Uppy<TUseStrictTypes: Uppy$TypeChecking = Uppy$TypeChecking> {
  constructor (opts?: Uppy$UppyOptions<>): this;
  on<TMeta: Uppy$IndexedObject<any>> (
    event: 'upload-success',
    callback: (file: Uppy$UppyFile<TMeta>, body: any, uploadURL: string) => void
  ): this;
  on<TMeta: Uppy$IndexedObject<any>> (
    event: 'complete',
    callback: (result: Uppy$UploadResult<TMeta>) => void
  ): this;
  on (event: Uppy$Event, callback: (...args: any[]) => void): this;
  off (event: Uppy$Event, callback: (...args: any[]) => void): this;

  /**
   * For use by plugins only.
   */
  emit (event: Uppy$Event, ...args: any[]): void;
  updateAll (state: { [key: string]: any }): void;
  setOptions (update: $Rest<Uppy$UppyOptions<>, { ... }>): void;
  setState (patch: { [key: string]: any }): void;
  getState<TMeta: Uppy$IndexedObject<any>> (): Uppy$State<TMeta>;
  +state: Uppy$State<>;
  setFileState (fileID: string, state: { [key: string]: any }): void;
  resetProgress (): void;
  addPreProcessor (fn: Uppy$UploadHandler): void;
  removePreProcessor (fn: Uppy$UploadHandler): void;
  addPostProcessor (fn: Uppy$UploadHandler): void;
  removePostProcessor (fn: Uppy$UploadHandler): void;
  addUploader (fn: Uppy$UploadHandler): void;
  removeUploader (fn: Uppy$UploadHandler): void;
  setMeta<TMeta: Uppy$IndexedObject<any>> (data: TMeta): void;
  setFileMeta<TMeta: Uppy$IndexedObject<any>> (
    fileID: string,
    data: TMeta
  ): void;
  getFile<TMeta: Uppy$IndexedObject<any>, TBody: Uppy$IndexedObject<any>> (
    fileID: string
  ): Uppy$UppyFile<TMeta, TBody>;
  getFiles<TMeta: Uppy$IndexedObject<any>,
    TBody: Uppy$IndexedObject<any>> (): Array<Uppy$UppyFile<TMeta, TBody>>;
  addFile<TMeta: Uppy$IndexedObject<any>> (
    file: Uppy$AddFileOptions<TMeta>
  ): string;
  removeFile (fileID: string): void;
  pauseResume (fileID: string): boolean;
  pauseAll (): void;
  resumeAll (): void;
  retryAll<TMeta: Uppy$IndexedObject<any>> (): Promise<Uppy$UploadResult<TMeta>>;
  cancelAll (): void;
  retryUpload<TMeta: Uppy$IndexedObject<any>> (
    fileID: string
  ): Promise<Uppy$UploadResult<TMeta>>;
  reset (): void;
  getID (): string;

  /**
   * Add a plugin to this Uppy instance.
   */
  use<TOptions, TInstance: Uppy$Plugin<TOptions>> (
    pluginClass: (uppy: this, opts: TOptions) => TInstance,
    opts?: TOptions
  ): this;

  /**
   * Fallback `.use()` overload with unchecked plugin options.
   *
   * This does not validate that the options you pass in are correct.
   * We recommend disabling this overload by using the `Uppy<Uppy.StrictTypes>` type, instead of the plain `Uppy` type, to enforce strict typechecking.
   * This overload will be removed in Uppy 2.0.
   */
  use (
    pluginClass: (uppy: this, opts: any) => Uppy$Plugin<any>,
    opts?: { [key: string]: any }
  ): this;
  getPlugin (name: string): Uppy$Plugin<>;
  iteratePlugins (callback: (plugin: Uppy$Plugin<>) => void): void;
  removePlugin (instance: Uppy$Plugin<>): void;
  close (): void;
  info (
    message: | string
      | {
      message: string,
      details: string,
      ...
    },
    type?: Uppy$LogLevel,
    duration?: number
  ): void;
  hideInfo (): void;
  log (msg: string, type?: Uppy$LogLevel): void;

  /**
   * Obsolete: do not use. This method does nothing and will be removed in a future release.
   */
  run (): this;
  restore<TMeta: Uppy$IndexedObject<any>> (
    uploadID: string
  ): Promise<Uppy$UploadResult<TMeta>>;
  addResultData (uploadID: string, data: { [key: string]: any }): void;
  upload<TMeta: Uppy$IndexedObject<any>> (): Promise<Uppy$UploadResult<TMeta>>;
}

/**
 * Create an uppy instance.
 *
 * By default, Uppy's `.use(Plugin, options)` method uses loose type checking.
 * In Uppy 2.0, the `.use()` method will get a stricter type signature. You can enable strict type checking of plugin classes and their options today by using:
 * ```ts
 * const uppy = Uppy<Uppy.StrictTypes>()
 * ```
 * Make sure to also declare any variables and class properties with the `StrictTypes` parameter:
 * ```ts
 * private uppy: Uppy<Uppy.StrictTypes>;
 * ```
 */
// eslint-disable-next-line no-redeclare
declare function Uppy<TUseStrictTypes: Uppy$TypeChecking> (
  opts?: Uppy$UppyOptions<>
): Uppy$Uppy<TUseStrictTypes>;

declare module .exports: typeof Uppy
