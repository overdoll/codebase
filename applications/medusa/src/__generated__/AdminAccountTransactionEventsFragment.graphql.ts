/**
 * @generated SignedSource<<953caf350b2298a09ee44e3a30433b11>>
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
    readonly __typename: string;
    readonly " $fragmentSpreads": FragmentRefs<"StaffAccountTransactionEventFragment">;
  }>;
  readonly " $fragmentType": "StaffAccountTransactionEventsFragment";
};
export type StaffAccountTransactionEventsFragment = StaffAccountTransactionEventsFragment$data;
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

(node as any).hash = "02213eaf5bdee1c88b8c4cfde40a9d97";

export default node;
