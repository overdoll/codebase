/**
 * @generated SignedSource<<2406eeb0d8c84fb29b6ebe0717fbeb9d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaffAccountTransactionEventsFragment$data = {
  readonly events: ReadonlyArray<{
    readonly __typename: "AccountTransactionEvent";
    readonly id: string;
    readonly " $fragmentSpreads": FragmentRefs<"StaffAccountTransactionEventFragment">;
  }>;
  readonly " $fragmentType": "StaffAccountTransactionEventsFragment";
};
export type StaffAccountTransactionEventsFragment$key = {
  readonly " $data"?: StaffAccountTransactionEventsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StaffAccountTransactionEventsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StaffAccountTransactionEventsFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "AccountTransactionEvent",
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
          "name": "__typename",
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "StaffAccountTransactionEventFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "AccountTransaction",
  "abstractKey": null
};

(node as any).hash = "6dcc55a2348479b7e6f4f141420204a8";

export default node;
