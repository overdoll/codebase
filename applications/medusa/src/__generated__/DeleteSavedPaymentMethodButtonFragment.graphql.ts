/**
 * @generated SignedSource<<fdf5790a016842c70b8f82fd2fe77dc8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DeleteSavedPaymentMethodButtonFragment$data = {
  readonly id: string;
  readonly paymentMethod: {
    readonly " $fragmentSpreads": FragmentRefs<"PaymentMethodFragment">;
  };
  readonly " $fragmentType": "DeleteSavedPaymentMethodButtonFragment";
};
export type DeleteSavedPaymentMethodButtonFragment = DeleteSavedPaymentMethodButtonFragment$data;
export type DeleteSavedPaymentMethodButtonFragment$key = {
  readonly " $data"?: DeleteSavedPaymentMethodButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"DeleteSavedPaymentMethodButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "DeleteSavedPaymentMethodButtonFragment",
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
      "concreteType": "PaymentMethod",
      "kind": "LinkedField",
      "name": "paymentMethod",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "PaymentMethodFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "AccountSavedPaymentMethod",
  "abstractKey": null
};

(node as any).hash = "73e4508452a221bd2b922eff9d4bb032";

export default node;
