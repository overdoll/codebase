/**
 * @generated SignedSource<<c72b022841ca5384feeb9541072e95bd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type CardType = "AMEX" | "DISCOVER" | "JCB" | "MASTERCARD" | "OTHER" | "VISA" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type DisplayCardFragment$data = {
  readonly type: CardType;
  readonly " $fragmentType": "DisplayCardFragment";
};
export type DisplayCardFragment$key = {
  readonly " $data"?: DisplayCardFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"DisplayCardFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "DisplayCardFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "type",
      "storageKey": null
    }
  ],
  "type": "Card",
  "abstractKey": null
};

(node as any).hash = "8bc3b7bc296388ced7775a82c4811288";

export default node;
