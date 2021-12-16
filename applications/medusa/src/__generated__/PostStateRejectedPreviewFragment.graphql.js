/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
export type ResourceType = "IMAGE" | "VIDEO" | "%future added value";
import type { FragmentReference } from "relay-runtime";
declare export opaque type PostStateRejectedPreviewFragment$ref: FragmentReference;
declare export opaque type PostStateRejectedPreviewFragment$fragmentType: PostStateRejectedPreviewFragment$ref;
export type PostStateRejectedPreviewFragment = {|
  +id: string,
  +reference: string,
  +postedAt: ?any,
  +content: $ReadOnlyArray<{|
    +type: ResourceType,
    +urls: $ReadOnlyArray<{|
      +url: any,
      +mimeType: string,
    |}>,
  |}>,
  +$refType: PostStateRejectedPreviewFragment$ref,
|};
export type PostStateRejectedPreviewFragment$data = PostStateRejectedPreviewFragment;
export type PostStateRejectedPreviewFragment$key = {
  +$data?: PostStateRejectedPreviewFragment$data,
  +$fragmentRefs: PostStateRejectedPreviewFragment$ref,
  ...
};


const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostStateRejectedPreviewFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "reference",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "postedAt",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Resource",
      "kind": "LinkedField",
      "name": "content",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "type",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "ResourceUrl",
          "kind": "LinkedField",
          "name": "urls",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "url",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "mimeType",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};
// prettier-ignore
(node: any).hash = '763cc67ba34715aeb23ba8b1e926b99a';
module.exports = node;
