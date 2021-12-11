/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { PostBrandFragment$ref } from "./PostBrandFragment.graphql";
import type { FragmentReference } from "relay-runtime";
declare export opaque type PostHeaderFragment$ref: FragmentReference;
declare export opaque type PostHeaderFragment$fragmentType: PostHeaderFragment$ref;
export type PostHeaderFragment = {|
  +reassignmentAt: ?any,
  +$fragmentRefs: PostBrandFragment$ref,
  +$refType: PostHeaderFragment$ref,
|};
export type PostHeaderFragment$data = PostHeaderFragment;
export type PostHeaderFragment$key = {
  +$data?: PostHeaderFragment$data,
  +$fragmentRefs: PostHeaderFragment$ref,
  ...
};


const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostHeaderFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "reassignmentAt",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostBrandFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};
// prettier-ignore
(node: any).hash = 'b8e7fb28012b7383556c5d32b065ad32';
module.exports = node;
