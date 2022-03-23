/**
 * @generated SignedSource<<15e5af6dab8b47fa6f847ded96ffbd1e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SupportClubButtonViewerFragment$data = {
  readonly __typename: "Account";
  readonly " $fragmentSpreads": FragmentRefs<"SupportClubTransactionProcessViewerFragment">;
  readonly " $fragmentType": "SupportClubButtonViewerFragment";
};
export type SupportClubButtonViewerFragment = SupportClubButtonViewerFragment$data;
export type SupportClubButtonViewerFragment$key = {
  readonly " $data"?: SupportClubButtonViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SupportClubButtonViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SupportClubButtonViewerFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "__typename",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SupportClubTransactionProcessViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "e31d0ab0f85675c34ab0490f397d5749";

export default node;
