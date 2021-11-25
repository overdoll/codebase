/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { PostAudienceFragment$ref } from "./PostAudienceFragment.graphql";
import type { PostCategoriesFragment$ref } from "./PostCategoriesFragment.graphql";
import type { PostCharactersFragment$ref } from "./PostCharactersFragment.graphql";
import type { PostGalleryContentFragment$ref } from "./PostGalleryContentFragment.graphql";
import type { FragmentReference } from "relay-runtime";
declare export opaque type PostPreviewFragment$ref: FragmentReference;
declare export opaque type PostPreviewFragment$fragmentType: PostPreviewFragment$ref;
export type PostPreviewFragment = {|
  +$fragmentRefs: PostAudienceFragment$ref & PostCharactersFragment$ref & PostCategoriesFragment$ref & PostGalleryContentFragment$ref,
  +$refType: PostPreviewFragment$ref,
|};
export type PostPreviewFragment$data = PostPreviewFragment;
export type PostPreviewFragment$key = {
  +$data?: PostPreviewFragment$data,
  +$fragmentRefs: PostPreviewFragment$ref,
  ...
};


const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostPreviewFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostAudienceFragment"
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostGalleryContentFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};
// prettier-ignore
(node: any).hash = '19e7a347ec4b3908dc59bd8afb34bfe3';
module.exports = node;
