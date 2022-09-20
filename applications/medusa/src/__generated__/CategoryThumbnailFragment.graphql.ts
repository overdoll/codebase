/**
 * @generated SignedSource<<c9200784cea2b532dcc2a1bd6f0e8c93>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CategoryThumbnailFragment$data = {
  readonly bannerMedia: {
    readonly __typename: string;
    readonly " $fragmentSpreads": FragmentRefs<"ThumbnailMediaFragment">;
  } | null;
  readonly id: string;
  readonly " $fragmentType": "CategoryThumbnailFragment";
};
export type CategoryThumbnailFragment$key = {
  readonly " $data"?: CategoryThumbnailFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"CategoryThumbnailFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CategoryThumbnailFragment",
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
      "concreteType": null,
      "kind": "LinkedField",
      "name": "bannerMedia",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "__typename",
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ThumbnailMediaFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Category",
  "abstractKey": null
};

(node as any).hash = "cd1118f51ac01ded148fb8427d696058";

export default node;
