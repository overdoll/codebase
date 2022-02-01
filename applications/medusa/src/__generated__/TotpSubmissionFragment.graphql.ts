/**
 * @generated SignedSource<<a0b57d2d412131861e17489fbd4db03e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type TotpSubmissionFragment$data = {
  readonly token: string;
  readonly " $fragmentType": "TotpSubmissionFragment";
};
export type TotpSubmissionFragment = TotpSubmissionFragment$data;
export type TotpSubmissionFragment$key = {
  readonly " $data"?: TotpSubmissionFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"TotpSubmissionFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TotpSubmissionFragment",
  "selections": [
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

(node as any).hash = "4e067ae3310dbddaba61bc644fbf6fc8";

export default node;
