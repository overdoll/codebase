/**
 * @generated SignedSource<<953424ec7b974b91e4ab52f48382b9d3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaffPaymentTransactionFragment$data = {
  readonly accountTransaction: {
    readonly reference: string;
    readonly " $fragmentSpreads": FragmentRefs<"StaffTransactionCardFragment">;
  };
  readonly " $fragmentType": "StaffPaymentTransactionFragment";
};
export type StaffPaymentTransactionFragment$key = {
  readonly " $data"?: StaffPaymentTransactionFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StaffPaymentTransactionFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StaffPaymentTransactionFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "AccountTransaction",
      "kind": "LinkedField",
      "name": "accountTransaction",
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
  "type": "ClubPayment",
  "abstractKey": null
};

(node as any).hash = "b64b1fdbdf1207f3595bdba06df57967";

export default node;
