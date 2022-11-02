/**
 * @generated SignedSource<<ec0759d9179c5ef51aa3bd45a648f9c4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SuggestedHomeFragment$data = {
  readonly viewer: {
    readonly __typename: "Account";
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"DiscoverClubsTilesFragment" | "PopularTagsCardsFragment" | "RecommendedPostsGridFragment">;
  readonly " $fragmentType": "SuggestedHomeFragment";
};
export type SuggestedHomeFragment$key = {
  readonly " $data"?: SuggestedHomeFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SuggestedHomeFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SuggestedHomeFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Account",
      "kind": "LinkedField",
      "name": "viewer",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "__typename",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "RecommendedPostsGridFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PopularTagsCardsFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "DiscoverClubsTilesFragment"
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "baa0eaf197f1785a1272bce83f6fd56e";

export default node;
