/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { AvatarButtonFragment$ref } from "./AvatarButtonFragment.graphql";
import type { ProfileButtonFragment$ref } from "./ProfileButtonFragment.graphql";
import type { FragmentReference } from "relay-runtime";
declare export opaque type NavigationFragment$ref: FragmentReference;
declare export opaque type NavigationFragment$fragmentType: NavigationFragment$ref;
export type NavigationFragment = {|
  +$fragmentRefs: AvatarButtonFragment$ref & ProfileButtonFragment$ref,
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
      "name": "AvatarButtonFragment"
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
(node: any).hash = '690f078099d2ad7358ac6722ee0c2701';
module.exports = node;
