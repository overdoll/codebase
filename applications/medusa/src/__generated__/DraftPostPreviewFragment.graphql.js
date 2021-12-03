/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { useCheckRequirementsFragment$ref } from "./useCheckRequirementsFragment.graphql";
export type ResourceType = "IMAGE" | "VIDEO" | "%future added value";
import type { FragmentReference } from "relay-runtime";
declare export opaque type DraftPostPreviewFragment$ref: FragmentReference;
declare export opaque type DraftPostPreviewFragment$fragmentType: DraftPostPreviewFragment$ref;
export type DraftPostPreviewFragment = {|
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
  +$refType: DraftPostPreviewFragment$ref,
|};
export type DraftPostPreviewFragment$data = DraftPostPreviewFragment;
export type DraftPostPreviewFragment$key = {
  +$data?: DraftPostPreviewFragment$data,
  +$fragmentRefs: DraftPostPreviewFragment$ref,
  ...
};


const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "DraftPostPreviewFragment",
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
(node: any).hash = '7009311d720c8dbdeffa997c7885735a';
module.exports = node;
