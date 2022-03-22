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
export type AdminAccountTransactionEventsFragment$data = {
  readonly events: ReadonlyArray<{
    readonly __typename: string;
    readonly " $fragmentSpreads": FragmentRefs<"AdminAccountTransactionEventFragment">;
  }>;
  readonly " $fragmentType": "AdminAccountTransactionEventsFragment";
};
export type AdminAccountTransactionEventsFragment = AdminAccountTransactionEventsFragment$data;
export type AdminAccountTransactionEventsFragment$key = {
  readonly " $data"?: AdminAccountTransactionEventsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"AdminAccountTransactionEventsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AdminAccountTransactionEventsFragment",
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
          "name": "AdminAccountTransactionEventFragment"
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
