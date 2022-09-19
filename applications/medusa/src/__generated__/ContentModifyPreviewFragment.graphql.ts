/**
 * @generated SignedSource<<fcfd2289b300007af7612a87c78f1bda>>
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
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "id",
          "storageKey": null
        },
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

(node as any).hash = "afc746f9746429dccd274fc28d97d145";

export default node;
