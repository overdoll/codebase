/**
 * @generated SignedSource<<8aff4fe9f1557bcf39b1e307cf0ea9e9>>
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

(node as any).hash = "fdf193d1f3524dd6f9d4f847f34da152";

export default node;
