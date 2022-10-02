/**
 * @generated SignedSource<<5763ffda935cc5eb5f9a5581eeb830ec>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CompleteVerifyTokenFragment$data = {
  readonly accountStatus: {
    readonly multiFactor: {
      readonly __typename: "MultiFactor";
    } | null;
    readonly registered: boolean;
  } | null;
  readonly sameDevice: boolean;
  readonly userAgent: string;
  readonly " $fragmentType": "CompleteVerifyTokenFragment";
};
export type CompleteVerifyTokenFragment$key = {
  readonly " $data"?: CompleteVerifyTokenFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"CompleteVerifyTokenFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CompleteVerifyTokenFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "userAgent",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "sameDevice",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "AuthenticationTokenAccountStatus",
      "kind": "LinkedField",
      "name": "accountStatus",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "registered",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "MultiFactor",
          "kind": "LinkedField",
          "name": "multiFactor",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "__typename",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "AuthenticationToken",
  "abstractKey": null
};

(node as any).hash = "250cd275cdea38f3d224a6826ae30bf4";

export default node;
