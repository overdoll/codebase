/**
 * @generated SignedSource<<7f5188ad8021298d4e86cb22651bfaf8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostAnalyticsButtonFragment$data = {
  readonly content: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"GridPaginationPostContentFragment">;
  }>;
  readonly likes: number;
  readonly views: number;
  readonly " $fragmentType": "PostAnalyticsButtonFragment";
};
export type PostAnalyticsButtonFragment$key = {
  readonly " $data"?: PostAnalyticsButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostAnalyticsButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostAnalyticsButtonFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "likes",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "views",
      "storageKey": null
    },
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
          "name": "GridPaginationPostContentFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "3eaf33faee3c731d98c7d1c4e72ae832";

export default node;
