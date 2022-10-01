/**
 * @generated SignedSource<<63d61f519751de6cdaca894844262653>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ConfirmVerifyTokenFragment$data = {
  readonly location: {
    readonly city: string;
    readonly country: string;
    readonly subdivision: string;
  };
  readonly userAgent: string;
  readonly " $fragmentType": "ConfirmVerifyTokenFragment";
};
export type ConfirmVerifyTokenFragment$key = {
  readonly " $data"?: ConfirmVerifyTokenFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ConfirmVerifyTokenFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ConfirmVerifyTokenFragment",
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
      "concreteType": "Location",
      "kind": "LinkedField",
      "name": "location",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "city",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "subdivision",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "country",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "AuthenticationToken",
  "abstractKey": null
};

(node as any).hash = "9b91cc546a8bea8b81d031676255549e";

export default node;
