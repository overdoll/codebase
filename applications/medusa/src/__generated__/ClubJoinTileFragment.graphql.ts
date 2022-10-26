/**
 * @generated SignedSource<<3d8b8f6ef05fd438d20bd28cdf898f58>>
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
  readonly " $fragmentSpreads": FragmentRefs<"ClubJoinButtonFragment" | "ClubJoinLoggedOutButtonFragment" | "ClubTileOverlayFragment">;
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubJoinLoggedOutButtonFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "450e4032fb97bed8e1c20d498885ee46";

export default node;
