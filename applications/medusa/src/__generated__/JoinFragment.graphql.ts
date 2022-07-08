/**
 * @generated SignedSource<<e640b50c46e4f504781bc119747522f5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type JoinFragment$data = {
  readonly email: string | null;
  readonly " $fragmentType": "JoinFragment";
};
export type JoinFragment$key = {
  readonly " $data"?: JoinFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"JoinFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "JoinFragment",
  "selections": [
    {
      "kind": "ClientExtension",
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "email",
          "storageKey": null
        }
      ]
    }
  ],
  "type": "AuthenticationToken",
  "abstractKey": null
};

(node as any).hash = "34fd654e87ce3db60aaa5ce15530aa6a";

export default node;
