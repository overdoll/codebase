/**
 * @generated SignedSource<<7bc4d4449b8c0bdee8bf7f0a2aabfcef>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type JoinClubButtonClubFragment$data = {
  readonly viewerMember: {
    readonly __typename: string;
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"BecomeMemberButtonClubFragment" | "WithdrawMembershipButtonClubFragment">;
  readonly " $fragmentType": "JoinClubButtonClubFragment";
};
export type JoinClubButtonClubFragment = JoinClubButtonClubFragment$data;
export type JoinClubButtonClubFragment$key = {
  readonly " $data"?: JoinClubButtonClubFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"JoinClubButtonClubFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "JoinClubButtonClubFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "BecomeMemberButtonClubFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "WithdrawMembershipButtonClubFragment"
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
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "51cbdf4fcc68a992d0d0466ba36b5002";

export default node;
