/**
 * @generated SignedSource<<bddaeaf0bac5e69f7f2dc88f2f39c1e1>>
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

(node as any).hash = "428ae1907c6cdce100ec70b1f21188cf";

export default node;
