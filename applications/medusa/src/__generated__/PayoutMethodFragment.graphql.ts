/**
 * @generated SignedSource<<7c2fb2355e0fe7c380efa4925256806d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PayoutMethodFragment$data = {
  readonly __typename: "AccountPaxumPayoutMethod";
  readonly id: string;
  readonly email: string;
  readonly " $fragmentType": "PayoutMethodFragment";
} | {
  // This will never be '%other', but we need some
  // value in case none of the concrete values match.
  readonly __typename: "%other";
  readonly " $fragmentType": "PayoutMethodFragment";
};
export type PayoutMethodFragment = PayoutMethodFragment$data;
export type PayoutMethodFragment$key = {
  readonly " $data"?: PayoutMethodFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PayoutMethodFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PayoutMethodFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "__typename",
      "storageKey": null
    },
    {
      "kind": "InlineFragment",
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
          "name": "email",
          "storageKey": null
        }
      ],
      "type": "AccountPaxumPayoutMethod",
      "abstractKey": null
    }
  ],
  "type": "AccountPayoutMethod",
  "abstractKey": "__isAccountPayoutMethod"
};

(node as any).hash = "ca7a2ef8391d6388cb195cbecf3de690";

export default node;
