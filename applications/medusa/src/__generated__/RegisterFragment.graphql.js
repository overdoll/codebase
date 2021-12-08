/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type RegisterFragment$ref: FragmentReference;
declare export opaque type RegisterFragment$fragmentType: RegisterFragment$ref;
export type RegisterFragment = {|
  +id: string,
  +token: string,
  +$refType: RegisterFragment$ref,
|};
export type RegisterFragment$data = RegisterFragment;
export type RegisterFragment$key = {
  +$data?: RegisterFragment$data,
  +$fragmentRefs: RegisterFragment$ref,
  ...
};


const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RegisterFragment",
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
(node: any).hash = '45e11cad02f16cfde09a47bf7933ae89';
module.exports = node;
