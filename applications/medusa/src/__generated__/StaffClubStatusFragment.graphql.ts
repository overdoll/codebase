/**
 * @generated SignedSource<<40ff1fadc6aeb4b4ed6a7e8b925c32de>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaffClubStatusFragment$data = {
  readonly suspension: {
    readonly expires: any;
  } | null;
  readonly termination: {
    readonly account: {
      readonly username: string;
    };
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"SuspendClubFormFragment" | "StaffClubUnSuspendButtonFragment">;
  readonly " $fragmentType": "StaffClubStatusFragment";
};
export type StaffClubStatusFragment = StaffClubStatusFragment$data;
export type StaffClubStatusFragment$key = {
  readonly " $data"?: StaffClubStatusFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StaffClubStatusFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StaffClubStatusFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ClubSuspension",
      "kind": "LinkedField",
      "name": "suspension",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "expires",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ClubTermination",
      "kind": "LinkedField",
      "name": "termination",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Account",
          "kind": "LinkedField",
          "name": "account",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "username",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SuspendClubFormFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "StaffClubUnSuspendButtonFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "b52c816524c451a9547a1bcf5a301bf8";

export default node;
