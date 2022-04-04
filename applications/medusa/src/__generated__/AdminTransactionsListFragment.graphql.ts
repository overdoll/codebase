/**
 * @generated SignedSource<<8069e2bb67b73e915c4efb2e17aeb72c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaffTransactionsListFragment$data = {
  readonly edges: ReadonlyArray<{
    readonly node: {
      readonly reference: string;
      readonly " $fragmentSpreads": FragmentRefs<"StaffTransactionCardFragment">;
    };
  }>;
  readonly " $fragmentType": "StaffTransactionsListFragment";
};
export type StaffTransactionsListFragment = StaffTransactionsListFragment$data;
export type StaffTransactionsListFragment$key = {
  readonly " $data"?: StaffTransactionsListFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StaffTransactionsListFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StaffTransactionsListFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "AccountTransactionEdge",
      "kind": "LinkedField",
      "name": "edges",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "AccountTransaction",
          "kind": "LinkedField",
          "name": "node",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "reference",
              "storageKey": null
            },
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "StaffTransactionCardFragment"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "AccountTransactionConnection",
  "abstractKey": null
};

(node as any).hash = "462ab9c64f83d0ad68536bf8ed02d8b7";

export default node;
