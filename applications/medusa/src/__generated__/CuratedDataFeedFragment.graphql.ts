/**
 * @generated SignedSource<<1a22702ab3137b54a379e000c999786c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CuratedDataFeedFragment$data = {
  readonly curatedPostsFeedData: {
    readonly generatedAt: any | null;
    readonly nextRegenerationTime: any | null;
    readonly nextRegenerationTimeDuration: number;
    readonly viewedAt: any | null;
  };
  readonly " $fragmentType": "CuratedDataFeedFragment";
};
export type CuratedDataFeedFragment$key = {
  readonly " $data"?: CuratedDataFeedFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"CuratedDataFeedFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CuratedDataFeedFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "CuratedPostsFeedData",
      "kind": "LinkedField",
      "name": "curatedPostsFeedData",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "generatedAt",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "nextRegenerationTime",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "nextRegenerationTimeDuration",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "viewedAt",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "e9eb9cbd75fd44b6e9960fcd1ef505f0";

export default node;
