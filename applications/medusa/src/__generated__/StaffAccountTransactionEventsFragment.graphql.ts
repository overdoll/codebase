/**
 * @generated SignedSource<<33c980f585e073e9fcef1e3066ccee99>>
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

(node as any).hash = "142058da15009bba459e21a8d25e7bd2";

export default node;
