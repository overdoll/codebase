/**
 * @generated SignedSource<<7da809ea3f224539c78bdb55aa08b64d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ViewVerifyTokenFragment$data = {
  readonly secure: boolean;
  readonly verified: boolean;
  readonly " $fragmentSpreads": FragmentRefs<"CompleteVerifyTokenFragment" | "ConfirmVerifyTokenFragment" | "PendingVerifyTokenFragment">;
  readonly " $fragmentType": "ViewVerifyTokenFragment";
};
export type ViewVerifyTokenFragment$key = {
  readonly " $data"?: ViewVerifyTokenFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ViewVerifyTokenFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ViewVerifyTokenFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "verified",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "secure",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ConfirmVerifyTokenFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PendingVerifyTokenFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CompleteVerifyTokenFragment"
    }
  ],
  "type": "AuthenticationToken",
  "abstractKey": null
};

(node as any).hash = "6f942b134185b5a06ecee1910267b7ac";

export default node;
