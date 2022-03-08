/**
 * @generated SignedSource<<61a6380bd160c50026574f8fc20a06ed>>
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
    readonly isSupporter: boolean;
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
          "name": "isSupporter",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "43861fd07fd68d1514a1faf9a8026ae3";

export default node;
