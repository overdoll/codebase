/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type ProfileButtonFragment$ref: FragmentReference;
declare export opaque type ProfileButtonFragment$fragmentType: ProfileButtonFragment$ref;
export type ProfileButtonFragment = {|
  +username: string,
  +avatar: any,
  +$refType: ProfileButtonFragment$ref,
|};
export type ProfileButtonFragment$data = ProfileButtonFragment;
export type ProfileButtonFragment$key = {
  +$data?: ProfileButtonFragment$data,
  +$fragmentRefs: ProfileButtonFragment$ref,
  ...
};


const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ProfileButtonFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "username",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "avatar",
      "storageKey": null
    }
  ],
  "type": "Account",
  "abstractKey": null
};
// prettier-ignore
(node: any).hash = '7de2cbb24b75b9bd132687424dcd951d';
module.exports = node;
