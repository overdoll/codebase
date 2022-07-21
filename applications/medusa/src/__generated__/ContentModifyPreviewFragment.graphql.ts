/**
 * @generated SignedSource<<9fa8e8f7c483faa263bbead9429f8a1e>>
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
    readonly " $fragmentSpreads": FragmentRefs<"PostContentPreviewFragment">;
  }>;
  readonly " $fragmentSpreads": FragmentRefs<"PostContentPreviewPostFragment">;
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
          "name": "PostContentPreviewFragment"
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostContentPreviewPostFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "74ccc765f002f0c0203d399701c050bb";

export default node;
