/**
 * @generated SignedSource<<46b22794c83a508836a92c4f34f60afb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type ClubSuspensionReason = "MANUAL" | "POST_MODERATION_QUEUE" | "POST_REMOVAL" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type StaffClubSuspensionLogFragment$data = {
  readonly __typename: "ClubIssuedSuspensionLog";
  readonly issuedAccount: {
    readonly username: string;
  } | null;
  readonly reason: ClubSuspensionReason;
  readonly suspendedUntil: any;
  readonly " $fragmentType": "StaffClubSuspensionLogFragment";
} | {
  readonly __typename: "ClubRemovedSuspensionLog";
  readonly removedAccount: {
    readonly username: string;
  };
  readonly " $fragmentType": "StaffClubSuspensionLogFragment";
} | {
  // This will never be '%other', but we need some
  // value in case none of the concrete values match.
  readonly __typename: "%other";
  readonly " $fragmentType": "StaffClubSuspensionLogFragment";
};
export type StaffClubSuspensionLogFragment$key = {
  readonly " $data"?: StaffClubSuspensionLogFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StaffClubSuspensionLogFragment">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "username",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StaffClubSuspensionLogFragment",
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
          "alias": "issuedAccount",
          "args": null,
          "concreteType": "Account",
          "kind": "LinkedField",
          "name": "account",
          "plural": false,
          "selections": (v0/*: any*/),
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "reason",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "suspendedUntil",
          "storageKey": null
        }
      ],
      "type": "ClubIssuedSuspensionLog",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        {
          "alias": "removedAccount",
          "args": null,
          "concreteType": "Account",
          "kind": "LinkedField",
          "name": "account",
          "plural": false,
          "selections": (v0/*: any*/),
          "storageKey": null
        }
      ],
      "type": "ClubRemovedSuspensionLog",
      "abstractKey": null
    }
  ],
  "type": "ClubSuspensionLog",
  "abstractKey": "__isClubSuspensionLog"
};
})();

(node as any).hash = "52ce5fa3df39979b824e58dd0bee4870";

export default node;
