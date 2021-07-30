/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type TokenFragment$ref: FragmentReference;
declare export opaque type TokenFragment$fragmentType: TokenFragment$ref;
export type TokenFragment = {|
  +verified: boolean,
  +device: string,
  +location: string,
  +secure: boolean,
  +$refType: TokenFragment$ref,
|};
export type TokenFragment$data = TokenFragment;
export type TokenFragment$key = {
  +$data?: TokenFragment$data,
  +$fragmentRefs: TokenFragment$ref,
  ...
};


const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TokenFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "verified",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "device",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "location",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "secure",
      "storageKey": null
    }
  ],
  "type": "AuthenticationToken",
  "abstractKey": null
};
// prettier-ignore
(node: any).hash = '001657e3e5c0b6843e2ff0ded49d51d2';
module.exports = node;
