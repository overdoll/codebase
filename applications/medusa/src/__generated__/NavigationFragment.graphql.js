/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { AvatarMenuFragment$ref } from "./AvatarMenuFragment.graphql";
import type { ProfileButtonFragment$ref } from "./ProfileButtonFragment.graphql";
import type { FragmentReference } from "relay-runtime";
declare export opaque type NavigationFragment$ref: FragmentReference;
declare export opaque type NavigationFragment$fragmentType: NavigationFragment$ref;
export type NavigationFragment = {|
  +$fragmentRefs: AvatarMenuFragment$ref & ProfileButtonFragment$ref,
  +$refType: NavigationFragment$ref,
|};
export type NavigationFragment$data = NavigationFragment;
export type NavigationFragment$key = {
  +$data?: NavigationFragment$data,
  +$fragmentRefs: NavigationFragment$ref,
  ...
};


const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NavigationFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "AvatarMenuFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ProfileButtonFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};
// prettier-ignore
(node: any).hash = 'e55c6c228f07a0cb7fbbc70858f42081';
module.exports = node;
