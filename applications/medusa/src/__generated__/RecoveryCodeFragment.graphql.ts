/**
 * @generated SignedSource<<2a32947ad7fd8d3226dbf932183c710d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RecoveryCodeFragment$data = {
  readonly id: string;
  readonly token: string;
  readonly " $fragmentType": "RecoveryCodeFragment";
};
export type RecoveryCodeFragment$key = {
  readonly " $data"?: RecoveryCodeFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"RecoveryCodeFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RecoveryCodeFragment",
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
      "name": "token",
      "storageKey": null
    }
  ],
  "type": "AuthenticationToken",
  "abstractKey": null
};

(node as any).hash = "8e4b2ad253caef38a7b3fb02ca08b77b";

export default node;
