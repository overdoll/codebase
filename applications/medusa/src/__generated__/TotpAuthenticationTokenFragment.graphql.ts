/**
 * @generated SignedSource<<979c2258cc4dc174639f47c21eba7fcb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type TotpAuthenticationTokenFragment$data = {
  readonly id: string;
  readonly token: string;
  readonly " $fragmentType": "TotpAuthenticationTokenFragment";
};
export type TotpAuthenticationTokenFragment$key = {
  readonly " $data"?: TotpAuthenticationTokenFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"TotpAuthenticationTokenFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TotpAuthenticationTokenFragment",
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

(node as any).hash = "e0e52f46d0185baeeffe6f98151c5402";

export default node;
