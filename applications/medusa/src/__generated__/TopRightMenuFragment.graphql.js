/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { ProfileButtonFragment$ref } from "./ProfileButtonFragment.graphql";
import type { FragmentReference } from "relay-runtime";
declare export opaque type TopRightMenuFragment$ref: FragmentReference;
declare export opaque type TopRightMenuFragment$fragmentType: TopRightMenuFragment$ref;
export type TopRightMenuFragment = {|
  +avatar: any,
  +$fragmentRefs: ProfileButtonFragment$ref,
  +$refType: TopRightMenuFragment$ref,
|};
export type TopRightMenuFragment$data = TopRightMenuFragment;
export type TopRightMenuFragment$key = {
  +$data?: TopRightMenuFragment$data,
  +$fragmentRefs: TopRightMenuFragment$ref,
  ...
};


const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TopRightMenuFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "avatar",
      "storageKey": null
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
(node: any).hash = 'b593831808ee6ca962d062eef7121a2e';
module.exports = node;
