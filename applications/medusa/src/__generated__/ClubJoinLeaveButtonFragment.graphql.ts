/**
 * @generated SignedSource<<00e8d47ae32fea29c35ebf2cded84cab>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubJoinLeaveButtonFragment$data = {
  readonly viewerIsOwner: boolean;
  readonly viewerMember: {
    readonly __typename: "ClubMember";
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"ClubJoinButtonFragment" | "ClubJoinLoggedOutButtonFragment" | "ClubLeaveButtonFragment">;
  readonly " $fragmentType": "ClubJoinLeaveButtonFragment";
};
export type ClubJoinLeaveButtonFragment$key = {
  readonly " $data"?: ClubJoinLeaveButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubJoinLeaveButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubJoinLeaveButtonFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "viewerIsOwner",
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
      "name": "ClubJoinLoggedOutButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubJoinButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubLeaveButtonFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "1d2854af9b559911763c2fec410f00c9";

export default node;
