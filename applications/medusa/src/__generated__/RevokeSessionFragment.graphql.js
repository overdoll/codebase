/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type RevokeSessionFragment$ref: FragmentReference;
declare export opaque type RevokeSessionFragment$fragmentType: RevokeSessionFragment$ref;
export type RevokeSessionFragment = {|
  +id: string,
  +$refType: RevokeSessionFragment$ref,
|};
export type RevokeSessionFragment$data = RevokeSessionFragment;
export type RevokeSessionFragment$key = {
  +$data?: RevokeSessionFragment$data,
  +$fragmentRefs: RevokeSessionFragment$ref,
  ...
};


const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RevokeSessionFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "AccountSession",
  "abstractKey": null
};
// prettier-ignore
(node: any).hash = 'a9c954e8aff1aab33a851f19553e0eca';
module.exports = node;
