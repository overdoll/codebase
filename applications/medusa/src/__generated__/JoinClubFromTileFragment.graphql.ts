/**
 * @generated SignedSource<<b14300ae9b316222ad34ecddbb73ddf6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type JoinClubFromTileFragment$data = {
  readonly viewerMember: {
    readonly isSupporter: boolean;
  } | null;
  readonly slug: string;
  readonly " $fragmentSpreads": FragmentRefs<"BecomeMemberButtonClubFragment" | "WithdrawMembershipButtonClubFragment">;
  readonly " $fragmentType": "JoinClubFromTileFragment";
};
export type JoinClubFromTileFragment = JoinClubFromTileFragment$data;
export type JoinClubFromTileFragment$key = {
  readonly " $data"?: JoinClubFromTileFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"JoinClubFromTileFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "JoinClubFromTileFragment",
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
          "name": "isSupporter",
          "storageKey": null
        }
      ],
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
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "7605063b0c85c6ab94ae3b67ac5d60e3";

export default node;
