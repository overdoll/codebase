/**
 * @generated SignedSource<<a1fdeb4200b06dc5dff3c7f00982e47e>>
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
    readonly error: string;
    readonly timestamp: any;
  }>;
  readonly " $fragmentType": "StaffPayoutEventsFragment";
};
export type StaffPayoutEventsFragment = StaffPayoutEventsFragment$data;
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
          "name": "error",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "timestamp",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ClubPayout",
  "abstractKey": null
};

(node as any).hash = "a0282b5c57e0c83959a07fe8b74651bb";

export default node;
