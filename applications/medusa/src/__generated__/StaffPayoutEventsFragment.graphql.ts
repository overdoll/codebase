/**
 * @generated SignedSource<<8658436b985ec7d6c61cf52b787e70b5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaffPayoutEventsFragment$data = {
  readonly events: ReadonlyArray<{
    readonly createdAt: any;
    readonly error: string;
    readonly id: string;
  }>;
  readonly " $fragmentType": "StaffPayoutEventsFragment";
};
export type StaffPayoutEventsFragment$key = {
  readonly " $data"?: StaffPayoutEventsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StaffPayoutEventsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StaffPayoutEventsFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ClubPayoutEvent",
      "kind": "LinkedField",
      "name": "events",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "id",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "error",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "createdAt",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ClubPayout",
  "abstractKey": null
};

(node as any).hash = "0f7855752f19cf931549044e3d40ea5d";

export default node;
