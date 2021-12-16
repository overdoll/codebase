/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { useCheckRequirementsFragment$ref } from "./useCheckRequirementsFragment.graphql";
export type ResourceType = "IMAGE" | "VIDEO" | "%future added value";
import type { FragmentReference } from "relay-runtime";
declare export opaque type PostStateDraftPreviewFragment$ref: FragmentReference;
declare export opaque type PostStateDraftPreviewFragment$fragmentType: PostStateDraftPreviewFragment$ref;
export type PostStateDraftPreviewFragment = {|
  +id: string,
  +reference: string,
  +content: $ReadOnlyArray<{|
    +type: ResourceType,
    +urls: $ReadOnlyArray<{|
      +url: any,
      +mimeType: string,
    |}>,
  |}>,
  +$fragmentRefs: useCheckRequirementsFragment$ref,
  +$refType: PostStateDraftPreviewFragment$ref,
|};
export type PostStateDraftPreviewFragment$data = PostStateDraftPreviewFragment;
export type PostStateDraftPreviewFragment$key = {
  +$data?: PostStateDraftPreviewFragment$data,
  +$fragmentRefs: PostStateDraftPreviewFragment$ref,
  ...
};


const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostStateDraftPreviewFragment",
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "useCheckRequirementsFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};
// prettier-ignore
(node: any).hash = '64afae935c7a6cb2f21645aaedbcde1f';
module.exports = node;
