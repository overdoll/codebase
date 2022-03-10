/**
 * @generated SignedSource<<2c8a18a965c3147f4eb8df1b3d1911fa>>
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
    readonly last4: string;
    readonly expiration: string;
    readonly " $fragmentSpreads": FragmentRefs<"DisplayCardFragment">;
  };
  readonly " $fragmentType": "PaymentMethodFragment";
};
export type PaymentMethodFragment = PaymentMethodFragment$data;
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
