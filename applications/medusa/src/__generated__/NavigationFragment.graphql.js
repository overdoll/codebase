/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { ProfileButtonFragment$ref } from "./ProfileButtonFragment.graphql";
import type { SimpleProfileButtonFragment$ref } from "./SimpleProfileButtonFragment.graphql";
import type { FragmentReference } from "relay-runtime";
declare export opaque type NavigationFragment$ref: FragmentReference;
declare export opaque type NavigationFragment$fragmentType: NavigationFragment$ref;
export type NavigationFragment = {|
  +$fragmentRefs: SimpleProfileButtonFragment$ref & ProfileButtonFragment$ref,
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
      "name": "SimpleProfileButtonFragment"
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
(node: any).hash = 'caa555e42cda0b63f24f9388dddd21d9';
module.exports = node;
