/**
 * @generated SignedSource<<0ad2ebea9848ca8c17ab957a87ef6433>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubJoinTileFragment$data = {
  readonly slug: string;
  readonly viewerMember: {
    readonly __typename: "ClubMember";
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"ClubJoinButtonFragment" | "ClubTileOverlayFragment">;
  readonly " $fragmentType": "ClubJoinTileFragment";
};
export type ClubJoinTileFragment$key = {
  readonly " $data"?: ClubJoinTileFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubJoinTileFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubJoinTileFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ClubMember",
      "kind": "LinkedField",
      "name": "viewerMember",
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
      "name": "ClubJoinButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubTileOverlayFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "74774f6b9e921498a408b72e2236f465";

export default node;
