/**
 * @generated SignedSource<<decfa49c53aa57bf73d41ff7fc090612>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type TotpSubmissionFragment$data = {
  readonly id: string;
  readonly token: string;
  readonly " $fragmentType": "TotpSubmissionFragment";
};
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

(node as any).hash = "67d60319d46170f56b4b021ade48bbe2";

export default node;
