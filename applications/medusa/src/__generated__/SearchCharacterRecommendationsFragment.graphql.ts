/**
 * @generated SignedSource<<4ff586b5ee643394c4a7852e2ded1529>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SearchCharacterRecommendationsFragment$data = {
  readonly series: {
    readonly slug: string;
    readonly title: string;
  };
  readonly " $fragmentType": "SearchCharacterRecommendationsFragment";
};
export type SearchCharacterRecommendationsFragment$key = {
  readonly " $data"?: SearchCharacterRecommendationsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SearchCharacterRecommendationsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SearchCharacterRecommendationsFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Series",
      "kind": "LinkedField",
      "name": "series",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "title",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "slug",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Character",
  "abstractKey": null
};

(node as any).hash = "4494f6a73e53f0f76088bafaef623f96";

export default node;
