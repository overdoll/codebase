/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type AvatarMenuFragment$ref: FragmentReference;
declare export opaque type AvatarMenuFragment$fragmentType: AvatarMenuFragment$ref;
export type AvatarMenuFragment = {|
  +avatar: any,
  +$refType: AvatarMenuFragment$ref,
|};
export type AvatarMenuFragment$data = AvatarMenuFragment;
export type AvatarMenuFragment$key = {
  +$data?: AvatarMenuFragment$data,
  +$fragmentRefs: AvatarMenuFragment$ref,
  ...
};


const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AvatarMenuFragment",
  "selections": [
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
(node: any).hash = 'b275200ab5968ae8fcffbbc29d2db8d7';
module.exports = node;
