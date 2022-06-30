/**
 * @generated SignedSource<<c02151f51675e84a37cc58758f931460>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SearchResultsUnionFragment$data = {
  readonly __typename: "Category";
  readonly " $fragmentSpreads": FragmentRefs<"SearchResultsCategoryFragment">;
  readonly " $fragmentType": "SearchResultsUnionFragment";
} | {
  readonly __typename: "Character";
  readonly " $fragmentSpreads": FragmentRefs<"SearchResultsCharacterFragment">;
  readonly " $fragmentType": "SearchResultsUnionFragment";
} | {
  readonly __typename: "Club";
  readonly " $fragmentSpreads": FragmentRefs<"SearchResultsClubFragment">;
  readonly " $fragmentType": "SearchResultsUnionFragment";
} | {
  readonly __typename: "Series";
  readonly " $fragmentSpreads": FragmentRefs<"SearchResultsSeriesFragment">;
  readonly " $fragmentType": "SearchResultsUnionFragment";
} | {
  // This will never be '%other', but we need some
  // value in case none of the concrete values match.
  readonly __typename: "%other";
  readonly " $fragmentType": "SearchResultsUnionFragment";
};
export type SearchResultsUnionFragment$key = {
  readonly " $data"?: SearchResultsUnionFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SearchResultsUnionFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SearchResultsUnionFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "__typename",
      "storageKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "SearchResultsCharacterFragment"
        }
      ],
      "type": "Character",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "SearchResultsSeriesFragment"
        }
      ],
      "type": "Series",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "SearchResultsClubFragment"
        }
      ],
      "type": "Club",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "SearchResultsCategoryFragment"
        }
      ],
      "type": "Category",
      "abstractKey": null
    }
  ],
  "type": "Search",
  "abstractKey": "__isSearch"
};

(node as any).hash = "4da79c05511ea3618e4466e69a188e30";

export default node;
