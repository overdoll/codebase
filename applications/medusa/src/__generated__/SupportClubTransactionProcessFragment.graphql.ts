/**
 * @generated SignedSource<<5b1f0b3e60adcd03a247310a4a615819>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SupportClubTransactionProcessFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"SupportSelectMethodFragment">;
  readonly " $fragmentType": "SupportClubTransactionProcessFragment";
};
export type SupportClubTransactionProcessFragment$key = {
  readonly " $data"?: SupportClubTransactionProcessFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SupportClubTransactionProcessFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SupportClubTransactionProcessFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SupportSelectMethodFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "5fd06bc9df1a7073d662599be6917219";

export default node;
