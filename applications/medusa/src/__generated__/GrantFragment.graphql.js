/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type GrantFragment$ref: FragmentReference;
declare export opaque type GrantFragment$fragmentType: GrantFragment$ref;
export type GrantFragment = {|
  +id: string,
  +token: string,
  +$refType: GrantFragment$ref,
|};
export type GrantFragment$data = GrantFragment;
export type GrantFragment$key = {
  +$data?: GrantFragment$data,
  +$fragmentRefs: GrantFragment$ref,
  ...
};


const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "GrantFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "token",
      "storageKey": null
    }
  ],
  "type": "AuthenticationToken",
  "abstractKey": null
};
// prettier-ignore
(node: any).hash = 'd1a48d67102c1579634eb6658fa56d91';
module.exports = node;
