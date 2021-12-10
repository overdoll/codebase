/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type JoinFragment$ref: FragmentReference;
declare export opaque type JoinFragment$fragmentType: JoinFragment$ref;
export type JoinFragment = {|
  +email: string,
  +$refType: JoinFragment$ref,
|};
export type JoinFragment$data = JoinFragment;
export type JoinFragment$key = {
  +$data?: JoinFragment$data,
  +$fragmentRefs: JoinFragment$ref,
  ...
};


const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "JoinFragment",
  "selections": [
    {
      "kind": "ClientExtension",
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "email",
          "storageKey": null
        }
      ]
    }
  ],
  "type": "AuthenticationToken",
  "abstractKey": null
};
// prettier-ignore
(node: any).hash = '34fd654e87ce3db60aaa5ce15530aa6a';
module.exports = node;
