/**
 * @generated SignedSource<<d1eb799c3f86cf0cbd690c1fd047a645>>
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
      readonly id: string;
      readonly reference: string;
      readonly " $fragmentSpreads": FragmentRefs<"StaffTransactionCardFragment">;
    };
  }>;
  readonly " $fragmentType": "StaffTransactionsListFragment";
};
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
              "name": "id",
              "storageKey": null
            },
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

(node as any).hash = "7157e97dc7e2e506fc4137367f440fb1";

export default node;
