/**
 * @generated SignedSource<<99f26bd3c7eea85714c2a9fc98b09d8d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type JoinClubFromPostFragment$data = {
  readonly canSupport: boolean;
  readonly slug: string;
  readonly viewerMember: {
    readonly isSupporter: boolean;
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"BecomeMemberButtonClubFragment" | "WithdrawMembershipButtonClubFragment">;
  readonly " $fragmentType": "JoinClubFromPostFragment";
};
export type JoinClubFromPostFragment$key = {
  readonly " $data"?: JoinClubFromPostFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"JoinClubFromPostFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "JoinClubFromPostFragment",
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
      "name": "canSupport",
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

(node as any).hash = "4f9010d5394a5d1f1a8ce3bd961fe7c1";

export default node;
