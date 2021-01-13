/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
type RootUser$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type RootData$ref: FragmentReference;
declare export opaque type RootData$fragmentType: RootData$ref;
export type RootData = {|
  +$fragmentRefs: RootUser$ref,
  +$refType: RootData$ref,
|};
export type RootData$data = RootData;
export type RootData$key = {
  +$data?: RootData$data,
  +$fragmentRefs: RootData$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RootData",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "RootUser"
    }
  ],
  "type": "Authentication",
  "abstractKey": null
};
// prettier-ignore
(node/*: any*/).hash = '4456c14f0a159afff2b93d1cb55a8fff';

module.exports = node;
