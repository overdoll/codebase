/**
 * @generated SignedSource<<c66abb4df79a0a4cc0eb992706095b06>>
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
export type SupportClubTransactionProcessFragment = SupportClubTransactionProcessFragment$data;
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
