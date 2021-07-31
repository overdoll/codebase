/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { PostArtistFragment$ref } from "./PostArtistFragment.graphql";
import type { PostCategoriesFragment$ref } from "./PostCategoriesFragment.graphql";
import type { PostCharactersFragment$ref } from "./PostCharactersFragment.graphql";
import type { PostContentFragment$ref } from "./PostContentFragment.graphql";
import type { FragmentReference } from "relay-runtime";
declare export opaque type AuditPostFragment$ref: FragmentReference;
declare export opaque type AuditPostFragment$fragmentType: AuditPostFragment$ref;
export type AuditPostFragment = {|
  +post: {|
    +$fragmentRefs: PostArtistFragment$ref & PostContentFragment$ref & PostCharactersFragment$ref & PostCategoriesFragment$ref
  |},
  +$refType: AuditPostFragment$ref,
|};
export type AuditPostFragment$data = AuditPostFragment;
export type AuditPostFragment$key = {
  +$data?: AuditPostFragment$data,
  +$fragmentRefs: AuditPostFragment$ref,
  ...
};


const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AuditPostFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Post",
      "kind": "LinkedField",
      "name": "post",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "PostArtistFragment"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "PostContentFragment"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "PostCharactersFragment"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "PostCategoriesFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "PostAuditLog",
  "abstractKey": null
};
// prettier-ignore
(node: any).hash = 'f40e5d3c86e32dc8d612c19d98199f59';
module.exports = node;
