/**
 * @generated SignedSource<<4af0c7a1a2e18d54d4a6b25daf681517>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DiscoverClubPreviewFragment$data = {
  readonly name: string;
  readonly slug: string;
  readonly viewerMember: {
    readonly __typename: "ClubMember";
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"ClubBannerFragment" | "ClubIconFragment" | "ClubJoinButtonFragment" | "ClubJoinLoggedOutButtonFragment">;
  readonly " $fragmentType": "DiscoverClubPreviewFragment";
};
export type DiscoverClubPreviewFragment$key = {
  readonly " $data"?: DiscoverClubPreviewFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"DiscoverClubPreviewFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "DiscoverClubPreviewFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
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
      "name": "ClubBannerFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubJoinLoggedOutButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubIconFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "c36325a990da04e37017d232ccf78c28";

export default node;
