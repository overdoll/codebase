/**
 * @generated SignedSource<<122a90f70a5ce767c734164babb2821a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ContentModifyPreviewFragment$data = {
  readonly content: ReadonlyArray<{
    readonly id: string;
    readonly " $fragmentSpreads": FragmentRefs<"PostContentPreviewMemoFragment">;
  }>;
  readonly " $fragmentSpreads": FragmentRefs<"PostContentPreviewMemoPostFragment">;
  readonly " $fragmentType": "ContentModifyPreviewFragment";
};
export type ContentModifyPreviewFragment$key = {
  readonly " $data"?: ContentModifyPreviewFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ContentModifyPreviewFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ContentModifyPreviewFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "PostContent",
      "kind": "LinkedField",
      "name": "content",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "id",
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "PostContentPreviewMemoFragment"
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostContentPreviewMemoPostFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "6e51306b64e249985d3dc9ddc5ec775b";

export default node;
