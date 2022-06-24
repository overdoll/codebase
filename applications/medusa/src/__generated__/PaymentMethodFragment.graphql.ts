/**
 * @generated SignedSource<<9ccc75c839b29a843ae72f4ad522d814>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PaymentMethodFragment$data = {
  readonly card: {
    readonly expiration: string;
    readonly last4: string;
    readonly " $fragmentSpreads": FragmentRefs<"DisplayCardFragment">;
  };
  readonly " $fragmentType": "PaymentMethodFragment";
};
export type PaymentMethodFragment$key = {
  readonly " $data"?: PaymentMethodFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PaymentMethodFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PaymentMethodFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Card",
      "kind": "LinkedField",
      "name": "card",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "last4",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "expiration",
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "DisplayCardFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "PaymentMethod",
  "abstractKey": null
};

(node as any).hash = "b427a5ea72344b12b2cbe1e6a5afd87c";

export default node;
