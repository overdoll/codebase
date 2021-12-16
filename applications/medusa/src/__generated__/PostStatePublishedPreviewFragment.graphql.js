/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { PostGalleryContentFragment$ref } from "./PostGalleryContentFragment.graphql";
import type { FragmentReference } from "relay-runtime";
declare export opaque type PostStatePublishedPreviewFragment$ref: FragmentReference;
declare export opaque type PostStatePublishedPreviewFragment$fragmentType: PostStatePublishedPreviewFragment$ref;
export type PostStatePublishedPreviewFragment = {|
  +$fragmentRefs: PostGalleryContentFragment$ref,
  +$refType: PostStatePublishedPreviewFragment$ref,
|};
export type PostStatePublishedPreviewFragment$data = PostStatePublishedPreviewFragment;
export type PostStatePublishedPreviewFragment$key = {
  +$data?: PostStatePublishedPreviewFragment$data,
  +$fragmentRefs: PostStatePublishedPreviewFragment$ref,
  ...
};


const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostStatePublishedPreviewFragment",
  "selections": [
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
(node: any).hash = '0f25bb6391bbe61715d0c39d5b9ce2a2';
module.exports = node;
