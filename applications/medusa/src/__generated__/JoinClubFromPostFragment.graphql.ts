/**
 * @generated SignedSource<<155e48798058e1cdfc63a0a08c980ab4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type JoinClubFromPostFragment$data = {
  readonly viewerMember: {
    readonly isSupporter: boolean;
  } | null;
  readonly slug: string;
  readonly " $fragmentSpreads": FragmentRefs<"BecomeMemberButtonClubFragment" | "WithdrawMembershipButtonClubFragment">;
  readonly " $fragmentType": "JoinClubFromPostFragment";
};
export type JoinClubFromPostFragment = JoinClubFromPostFragment$data;
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
      "name": "slug",
      "storageKey": null
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "ccd45a7a8435420bd42b7741df9f84fa";

export default node;
